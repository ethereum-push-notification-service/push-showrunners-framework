// @name: ETH Tracker Channel
// @version: 1.1.0
// @recent_changes: Implemented Slider type Notification Settings in Eth Tracker Channel
import { Service, Inject } from 'typedi';
import config from '../../config';
import settings from "./ethTickerSettings.json";
import { EPNSChannel } from '../../helpers/epnschannel';
import { Logger } from 'winston';
import keys from "./ethTickerKeys.json";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
import { ethTickerModel } from './ethTickerModel';;

const bent = require('bent'); // Download library

const NETWORK_TO_MONITOR = config.web3MainnetNetwork;

@Service()
export default class EthTickerChannel extends EPNSChannel {
  constructor(@Inject('logger') public logger: Logger) {
    super(logger, {
      networkToMonitor: NETWORK_TO_MONITOR,
      dirname: __dirname,
      name: 'ETH Ticker',
      url: 'https://epns.io/',
      useOffChain: true,
    });
  }

  public async sendMessageToContract(simulate) {
    const logger = this.logger;

    this.getNewPrice()
      .then(async (payload: any) => {

        for (let i = 0; i < payload.recipients.length; i++) {
          this.sendNotification({
            recipient: payload.recipients[i], // new 
            title: payload.notifTitle,
            message: payload.notifMsg,
            payloadTitle: payload.title,
            payloadMsg: payload.msg,
            notificationType: payload.type,
            simulate: simulate,
            image: null,
          });
        }
      })
      .catch(err => {
        logger.error(`[${new Date(Date.now())}]-[ETH Ticker]- Errored on CMC API... skipped with error: %o`, err);
      });
  }

  public async getNewPrice() {
    const logger = this.logger;
    logger.debug(`[${new Date(Date.now())}]-[ETH Ticker]-Getting price of eth... `);

    return await new Promise((resolve, reject) => {
      const getJSON = bent('json');

      const cmcroute = settings.route;
      const cmcEndpoint = settings.cmcEndpoint;
      const pollURL = `${cmcEndpoint}${cmcroute}?symbol=ETH&CMC_PRO_API_KEY=${config.cmcAPIKey || settings.cmcKey}`;
      getJSON(pollURL)
        .then(async (response: any) => {
          if (response.status.error_code) {
            reject(`CMC Error: ${response.status}`);
          }

          // Get data
          const data = response.data['ETH'];

          // construct Title and Message from data
          const price = data.quote.USD.price;
          const formattedPrice = Number(Number(price).toFixed(2));
          this.logInfo(`Formatted Price ${formattedPrice}`);

          const hourChange = Number(data.quote.USD.percent_change_1h);
          const dayChange = Number(data.quote.USD.percent_change_24h);
          const weekChange = Number(data.quote.USD.percent_change_7d);

          const hourChangeFixed = hourChange.toFixed(2);
          const dayChangeFixed = dayChange.toFixed(2);
          const weekChangeFixed = weekChange.toFixed(2);

          // Initialize arr for all recepients
          let recipients: string[] = [];
          
          // Retrive Old Eth Price and Cycles count
          const ethTickerData = await ethTickerModel.findOne({ _id: 'eth_ticker_data' });
          
          // Update current price as prev price
          await ethTickerModel.findByIdAndUpdate(
            { _id: 'eth_ticker_data' },
            { prevEthPrice: Number(formattedPrice) },
            { upsert: true },
          ); 

          this.logInfo(`Prev Price: ${ethTickerData}`);

          // Set CYCLES variable in DB
          const CYCLES = ethTickerData.cycles;

          // 2. Calculate percentage change. |New Price - Old Price| / Old Price
          // Set the Formatted price to a higher price then current Eth price to testout notification
          const changePercentage = Math.round((Math.abs(formattedPrice - ethTickerData.prevEthPrice) / ethTickerData.prevEthPrice) * 100);
          this.logInfo("Change Price :" + changePercentage)
          const provider = new ethers.providers.JsonRpcProvider(settings.providerUrl);
          const signer = new ethers.Wallet(keys.PRIVATE_KEY_NEW_STANDARD.PK, provider);
          const userAlice = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });
          let i = 1;
      
          while (true) {
            const userData: any = await userAlice.channel.subscribers({
              page: i,
              limit: 10,
              setting: true,
            });
            console.log(userData);
            if (userData.itemcount != 0) {
              i++;
            } else {
              console.log("Breakkkk.")
              i=1;
              break;
            }

            // 4. Loop through the `settings` array for the required type (say 2 here) and get the `user` value
            userData.subscribers.map((subscriberObj) => {
              const userSettings = JSON.parse(subscriberObj.settings);
              if (userSettings !== null) {
                const temp = userSettings.find((obj) => obj.index == 1); // arr[0] = index: 1 ---> arrIndex + 1
                let userValue: number;
                //IF user has enabled notification then enter
                if (temp.enabled === true) {
                  userValue = temp.user;

                  // Construct payload if optted in or pass
                  // 5. If the value matches the percentage change, send the notification, else pass
              //PercentChange = 5, user value = 2 => Send Notification
                  if (changePercentage >= userValue) {
                  //  this.logInfo(`Sending notif to ${userValue}`)
                    recipients.push(subscriberObj.subscriber);
                  }
                }
              }else{
                //SEnding notification on the basis of the Default value of the channel 
                  recipients.push(subscriberObj.subscriber);
              }
            }
            );

            // 5. Loop through the `settings` array for the required type (say 2 here) --> Time interval
            userData.subscribers.map(async (subscriberObj) => {
              const userSettings = JSON.parse(subscriberObj.settings);

              const mappedValue = await ethTickerModel.findOne({ _id: subscriberObj.subscriber });

              if (userSettings !== null) {
                const temp = userSettings.find((obj) => obj.index == 2); // for time intervals

                let userValue: number;
                
                //IF user has enabled notification then enter
                if (temp.enabled === true) {
                  userValue = temp.user;

                  if (mappedValue.value + userValue == CYCLES) {
                    recipients.push(subscriberObj.subscriber);
                  }

                  // UPDATE the users mapped value in DB
                  mappedValue += userValue;
                }
              }
            }
            );
          }

          // UPDATE CYCLES VALUE
          // HERE

          const title = 'ETH at $' + formattedPrice;
          const message = `\nHourly Movement: ${hourChangeFixed}%\nDaily Movement: ${dayChangeFixed}%\nWeekly Movement: ${weekChangeFixed}%`;

          const payloadTitle = `ETH Price Movement`;
          const payloadMsg = `ETH at [d:$${formattedPrice}]\n\nHourly Movement: ${hourChange >= 0 ? '[s:' + hourChangeFixed + '%]' : '[t:' + hourChangeFixed + '%]'
            }\nDaily Movement: ${dayChange >= 0 ? '[s:' + dayChangeFixed + '%]' : '[t:' + dayChangeFixed + '%]'
            }\nWeekly Movement: ${weekChange >= 0 ? '[s:' + weekChangeFixed + '%]' : '[t:' + weekChangeFixed + '%]'
            }[timestamp: ${Math.floor(Date.now() / 1000)}]`;

          const payload = {
            type: 3, // Type of Notification
            notifTitle: title, // Title of Notification
            notifMsg: message, // Message of Notification
            title: payloadTitle, // Internal Title
            msg: payloadMsg, // Internal Message
            recipients: recipients // Recipients Array
          };
          resolve(payload);
        })
        .catch(err => reject(`Unable to reach CMC API, error: ${err}`));
    });
  }
}
