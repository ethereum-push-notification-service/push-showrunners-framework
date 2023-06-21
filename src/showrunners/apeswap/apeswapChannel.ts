import Container, { Inject, Service } from 'typedi';
import { Logger } from 'winston';

import { BILL_ABI_V1, PRICE_GETTER_ABI, BILL_ABI_V2 } from './abi/index';
import config from '../../config';
import { EPNSChannel } from '../../helpers/epnschannel';
import settings from './apeswapSettings.json';
import axios from 'axios';

const APESWAP_BONDS_DATA = 'APESWAP_BONDS_DATA';
const APESWAP_POOL_DATA = 'APESWAP_POOL_DATA';

@Service()
export default class ApeSwapChannel extends EPNSChannel {
  model: any;
  constructor(@Inject('logger') public logger: Logger) {
    super(logger, {
      networkToMonitor: config.web3BnbMainnetRPC,
      dirname: __dirname,
      name: 'apeswap',
      url: 'https://apeswap.finance/',
      chain: 'BNB',
      useOffChain: true,
    });
    this.model = Container.get('apeswapModel');
  }

  async _setData(key: string, data: any) {
    const response = this.model.findOneAndUpdate(
      {
        _id: key,
      },
      { data },
      {
        upsert: true,
      },
    );
    return response;
  }

  async _getData(key: string) {
    const { data } = (await this.model.findById(key)) || {};

    return data;
  }

  async fetchTokenPrice(tokenAddress: string) {
    const { contract } = await this.getContract(settings.PRICE_GETTER_ADDRESS, PRICE_GETTER_ABI);
    const price = await contract.getPrice(tokenAddress, 18);
    return +price.toString() * 1e-18;
  }

  async fetchLPTokenPrice(tokenAddress: string) {
    const { contract } = await this.getContract(settings.PRICE_GETTER_ADDRESS, PRICE_GETTER_ABI);
    const price = await contract.getLPPrice(tokenAddress, 18);
    return +price.toString() * 1e-18;
  }

  async fetchBillPrice(billAddress: string, version: 'V1' | 'V2') {
    const BILL_ABI = version === 'V2' ? BILL_ABI_V2 : BILL_ABI_V1;
    const { contract } = await this.getContract(billAddress, BILL_ABI);
    const billPrice = await contract.trueBillPrice();
    return billPrice.toString();
  }

  async sendDiscountNotifications(simulate: any) {
    try {
      // logic override
      const logicOverride =
        typeof simulate == 'object'
          ? simulate?.hasOwnProperty('logicOverride')
            ? simulate?.hasOwnProperty('logicOverride')
            : false
          : false;
      let overrideDiscountTreshold =
        logicOverride && simulate.logicOverride.mode ? simulate.logicOverride.overridetreshold : false;
      // logic override

      // txn override
      const txOverride =
        typeof simulate == 'object'
          ? simulate?.hasOwnProperty('txOverride')
            ? simulate?.hasOwnProperty('txOverride')
            : false
          : false;
      const overrideAddress = txOverride && simulate.txOverride.mode ? simulate.txOverride.recipientAddr : false;
      // txn override

      // get all bills
      const { data: allBills } = await axios.get(
        'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-lists/main/config/bills.json',
      );
      const discountTreshold = overrideDiscountTreshold || settings.discountTreshold;
      // calculate their discounts
      const allBillsAndDiscounts = await Promise.all(
        allBills.map(async (oneBill: any) => {
          try {
            const principalToken = oneBill.lpToken.address['56'];
            const payoutToken = oneBill.earnToken.address['56'];
            const billAddress = oneBill.contractAddress['56'];
            if (!principalToken || !payoutToken || !billAddress) return -10000; //return a very small discount
            const payoutTokenPrice = await this.fetchTokenPrice(payoutToken);
            const principalTokenPrice = await this.fetchLPTokenPrice(principalToken);
            const billPrice = +(await this.fetchBillPrice(billAddress, oneBill.billVersion)) * 1e-18;
            const trueBillPrice = +billPrice * principalTokenPrice;
            if (billPrice == 0) return -10000; //if bill price is zero then no discount
            const rawDiscount = ((payoutTokenPrice - trueBillPrice) / payoutTokenPrice) * 100;
            if(rawDiscount > 25) return -10000; //if the discount is strangely high then ignore
            return { ...oneBill, discount: +rawDiscount.toFixed(3), debug: { payoutTokenPrice, billPrice } };
          } catch (err) {
            return -1000;
          }
        }),
      );
      console.log({discountTreshold})
      const billsToNotify = allBillsAndDiscounts.filter(({ discount }) => discount >= discountTreshold);
      // map through all tokens with a discount and send a notif for them.
      const responses = await Promise.all(
        billsToNotify.map(async (oneBill) => {
          // send the notification that there is a new bond to all users
          const title = `Great Discount Available`;
          const message = `The ${oneBill.billType} ${oneBill.lpToken.symbol} -> ${oneBill.earnToken.symbol} has a great discount of ${oneBill.discount}%.`;
          const CTA = `https://apeswap.finance/treasury-bills?utm_source=push&utm_medium=notification&utm_campaign=bills&utm_content={${oneBill.lpToken.symbol}-${oneBill.earnToken.symbol}}`;
          const notification = await this.sendNotification({
            title,
            payloadTitle: title,
            message: message,
            payloadMsg: message,
            notificationType: overrideAddress ? 3 : 1,
            simulate,
            image: null,
            cta: CTA,
            recipient: overrideAddress || this.channelAddress,
          });
          return notification;
        }),
      );
      return { notification: responses, bills: billsToNotify };
    } catch (err) {
      this.logError(err);
    }
  }

  async sendBondNotificationToUsers(simulate: any) {
    try {
      // logic override
      const logicOverride =
        typeof simulate == 'object'
          ? simulate?.hasOwnProperty('logicOverride')
            ? simulate?.hasOwnProperty('logicOverride')
            : false
          : false;
      let overrideCount = logicOverride && simulate.logicOverride.mode ? simulate.logicOverride.overrideCount : false;
      // logic override

      // txn override
      const txOverride =
        typeof simulate == 'object'
          ? simulate?.hasOwnProperty('txOverride')
            ? simulate?.hasOwnProperty('txOverride')
            : false
          : false;
      const overrideAddress = txOverride && simulate.txOverride.mode ? simulate.txOverride.recipientAddr : false;
      // txn override

      // fetch pools and see if there is any new one, if there are any new ones
      const { data: allBonds } = await axios.get(
        'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-lists/main/config/bills.json',
      );
      const savedBonds = await this._getData(APESWAP_BONDS_DATA);

      if (!savedBonds) {
        const response = await this._setData(APESWAP_BONDS_DATA, allBonds);
        return { bills: response, message: 'All existing bills cached' };
      }

      // get if there is a difference in the saved pools and fetched pools
      const newPoolsLength = overrideCount || allBonds.length - savedBonds.length;
      // const allPoolsLength = allPools.length;
      // const newPools = allPools.slice(allPoolsLength - newPoolsLength, allPoolsLength);
      if(!newPoolsLength.length)  return;
      // send the notification that there is a new bond to all users
      const title = `New ApeSwap bill(s) available`;
      const message = `There ${newPoolsLength > 1 ? 'are' : 'is'} ${newPoolsLength} new bill${
        newPoolsLength > 1 ? 's' : ''
      } available, visit your dashboard to check them out`;
      const allNotifications = this.sendNotification({
        title,
        payloadTitle: title,
        message: message,
        payloadMsg: message,
        notificationType: overrideAddress ? 3 : 1,
        simulate,
        image: null,
        cta: 'https://apeswap.finance/treasury-bills',
        recipient: overrideAddress || this.channelAddress,
      });
      await this._setData(APESWAP_BONDS_DATA, allBonds)
      return { newBills: allNotifications };
    } catch (error) {
      this.logError(error);
    }
  }

  async sendPoolNotificationToUsers(simulate: any) {
    try {
      // logic override
      const logicOverride =
        typeof simulate == 'object'
          ? simulate?.hasOwnProperty('logicOverride')
            ? simulate?.hasOwnProperty('logicOverride')
            : false
          : false;
      let overrideCount = logicOverride && simulate.logicOverride.mode ? simulate.logicOverride.overrideCount : false;
      // logic override

      // txn override
      const txOverride =
        typeof simulate == 'object'
          ? simulate?.hasOwnProperty('txOverride')
            ? simulate?.hasOwnProperty('txOverride')
            : false
          : false;
      const overrideAddress = txOverride && simulate.txOverride.mode ? simulate.txOverride.recipientAddr : false;
      // txn override

      // fetch pools and see if there is any new one, if there are any new ones
      const { data: allPools } = await axios.get(
        'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-lists/main/config/pools.json',
      );
      const savedPools = await this._getData(APESWAP_POOL_DATA);

      if (!savedPools) {
        const response = await this._setData(APESWAP_POOL_DATA, allPools);
        return { pools: response, message: 'All existing pools cached' };
      }

      // get if there is a difference in the saved pools and fetched pools
      const newPoolsLength = overrideCount || allPools.length - savedPools.length;
      // const allPoolsLength = allPools.length;
      // const newPools = allPools.slice(allPoolsLength - newPoolsLength, allPoolsLength);
      if(!newPoolsLength.length)  return;

      // send the notification that there is a new bond to all users
      const title = `New ApeSwap pool(s) available`;
      const message = `There ${newPoolsLength > 1 ? 'are' : 'is'} ${newPoolsLength} new pool${
        newPoolsLength > 1 ? 's' : ''
      } available, visit your dashboard to check them out`;
      const allNotifications = this.sendNotification({
        title,
        payloadTitle: title,
        message: message,
        payloadMsg: message,
        notificationType: overrideAddress ? 3 : 1,
        simulate,
        image: null,
        cta: 'https://apeswap.finance/pools',
        recipient: overrideAddress || this.channelAddress,
      });
      await this._setData(APESWAP_POOL_DATA, allPools);
      return { newPools: allNotifications };
    } catch (error) {
      this.logError(error);
    }
  }
}
