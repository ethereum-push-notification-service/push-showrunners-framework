import { EPNSChannel } from '../../helpers/epnschannel';
import config from '../../config';
import { Logger } from 'winston';
import Container, { Inject, Service } from 'typedi';
import { request, gql } from 'graphql-request';
import superfluidSettings from './superfluidSettings.json';
import { superFluidStreamModel } from './superfluidModel';

@Service()
export default class Superfluid extends EPNSChannel {
  private superFluidModel: any;
  constructor(@Inject('logger') public logger: Logger, @Inject('cached') public cached) {
    super(logger, {
      networkToMonitor: config.web3MainnetNetwork,
      dirname: __dirname,
      name: 'Superfluid',
      url: 'https://www.superfluid.finance/',
      useOffChain: true,
    });
    this.superFluidModel = Container.get('superfluidModel');
  }

  async sendLiquidationRisk(simulate) {
    try {
      const subscribers = await this.getChannelSubscribers();
      // looping over all the subscribers
      subscribers?.forEach(async (subscriber) => {
        const data = await request(superfluidSettings.SUPERFLUID_SUBGRAPH_MATIC, this.fetchLRQuery(subscriber));
        // liquidationTime = NOW() + (balance / netFlowRate) * -1;
        if (data.account) {
          data.account.accountTokenSnapshots.forEach(
            async ({ totalNetFlowRate, balanceUntilUpdatedAt, updatedAtTimestamp, token }) => {
              const dataDB = await this.getLRDataFromDB(subscriber, token.id);
              if (!dataDB) {
                const liquidationTime = Date.now() + (balanceUntilUpdatedAt / totalNetFlowRate) * -1;
                // condition fo 7 days.
                const sevenDays = 7 * 24 * 60 * 60 * 1000;
                const twoDays = 2 * 24 * 60 * 60 * 1000;
                if (liquidationTime < sevenDays && liquidationTime > twoDays) {
                  //send notification here for seven days
                  const title = `Liquidation risk for ${token.name}`;
                  const msg = `Your token ${token.name} is about to get liquidated in less than 7 days`;
                  const payloadTitle = title;
                  const payloadMsg = msg;
                  const notificationType = 3; // tagreted notififcation
                  const cta = `https://app.superfluid.finance/`;
                  await this.sendNotification({
                    title,
                    payloadMsg,
                    payloadTitle,
                    notificationType,
                    recipient: subscriber,
                    image: null,
                    simulate,
                    message: msg,
                    cta,
                  });
                }
                if (liquidationTime < twoDays) {
                  // send notification here for 2 days
                  const title = `Urgent Liquidation risk for ${token.name}`;
                  const msg = `Your token ${token.name} is about to get liquidated in less than 2 days`;
                  const payloadTitle = title;
                  const payloadMsg = msg;
                  const notificationType = 3; // tagreted notififcation
                  const cta = `https://app.superfluid.finance/`;
                  await this.sendNotification({
                    title,
                    payloadMsg,
                    payloadTitle,
                    notificationType,
                    recipient: subscriber,
                    image: null,
                    simulate,
                    message: msg,
                    cta,
                  });
                }
                await this.setLRDataToDB(subscriber, token.id);
              }
            },
          );
        }
      });
    } catch (e) {
      this.logError(e);
    }
  }

  // tokenID for timestamp is LIQUIDATE

  async sendLiquidatedNotification(simulate) {
    try {
      const subscribers = await this.getChannelSubscribers();
      const dataDB = await this.superFluidModel.findOne({
        subscriber: 'LIQUIDATE',
      });
      const fetchQuery = await request(
        superfluidSettings.SUPERFLUID_SUBGRAPH_MATIC,
        this.fetchLiquidation(dataDB ? dataDB.lastTimestamp : Date.now()),
      );
      if (fetchQuery) {
        fetchQuery.agreementLiquidatedV2Events.forEach(async (event) => {
          // send notification here
          const { token } = await request(
            superfluidSettings.SUPERFLUID_SUBGRAPH_MATIC,
            this.fetchTokenDetails(event.token),
          );
          const { name, symbol } = token;
          const title = `${name} Liquidated!`;
          const message = `${symbol} ${name} is Liquidated!`;
          const payloadTitle = title;
          const payloadMsg = message;
          const notificationType = 3;
          const recipient = event.targetAccount;
          const cta = `https://app.superfluid.finance/`;
          await this.sendNotification({
            title,
            message,
            payloadMsg,
            payloadTitle,
            notificationType,
            recipient,
            simulate,
            image: null,
            cta,
          });
        });
      }

      await this.superFluidModel.findOneAndUpdate(
        {
          subscriber: 'LIQUIDATE',
        },
        {
          lastTimestamp: Date.now(),
        },
        {
          upsert: true,
        },
      );
    } catch (e) {
      this.logError(e);
    }
  }

  async sendStreamCancelledNotification(simulate: any) {
    try {
      // fetching the last timestamp from DB
      const dataDB = await this.getStreamDataFromDB();
      // passing current timestamp if there is no data in DB
      const data = await request(
        superfluidSettings.SUPERFLUID_SUBGRAPH_MATIC,
        this.fetchFlowUpdatedEvents(dataDB ? dataDB.lastTimestamp : Date.now()),
      );
      if (data) {
        data.flowUpdatedEvents.forEach(async ({ stream, receiver: recipient }) => {
          // send notification here
          const {
            token: { name, symbol },
          } = stream;
          const title = `Inbound Stream was cancelled`;
          const message = `Stream having ${symbol} ${name} was cancelled`;
          const payloadMsg = message;
          const payloadTitle = title;
          const notificationType = 3;
          const cta = `https://app.superfluid.finance/`;
          await this.sendNotification({
            title,
            payloadTitle,
            message,
            payloadMsg,
            notificationType,
            simulate,
            image: null,
            recipient,
            cta,
          });
        });
      }
      await this.setStreamData(Date.now());
    } catch (e) {
      this.logError(e);
    }
  }

  // New IDA Distribution notification

  async sendIDANotifications(simulate) {
    try {
      const subscribers = await this.getChannelSubscribers();
      const dataDB = await this.getLastBlockNumber();
      const data = await request(
        superfluidSettings.SUPERFLUID_SUBGRAPH_MATIC,
        this.fetchIDAQuery(dataDB ? dataDB.lastBlockNumber : 35386969),
      );
      subscribers.forEach(async (subs) => {
        if (data?.indexUpdatedEvents.length) {
          const latestBlock = data.indexUpdatedEvents[0].blockNumber;
          data.indexUpdatedEvents.forEach(async ({ index: { subscriptions, indexUpdatedEvents } }) => {
            for (let i = 0; i < subscriptions.length; i++) {
              const {
                subscriber: { id },
                units,
              } = subscriptions[i];
              const { newIndexValue, oldIndexValue } = indexUpdatedEvents[i];
              if (subs === id) {
                const price = (newIndexValue - oldIndexValue) * units;
                //send notification here with the price
                const title = `New Inbound distribution`;
                const message = `New Inbound distribution with ${price} price.`;
                const payloadTitle = title;
                const payloadMsg = message;
                const notificationType = 3;
                const recipient = id;
                const cta = `https://app.superfluid.finance/`;
                await this.sendNotification({
                  title,
                  payloadTitle,
                  message,
                  payloadMsg,
                  notificationType,
                  recipient,
                  simulate,
                  image: null,
                  cta,
                });
              }
            }
          });
          await this.setLastBlockNumber(latestBlock);
        }
      });
    } catch (e) {
      this.logError(e);
    }
  }

  // New inbound stream notification

  async sendNewInboundDistribution(simulate) {
    try {
      const subscribers = await this.getChannelSubscribers();
      const dataDB = await this.getLastBlockStream();
      let latestBlock: number = 0;
      subscribers.forEach(async (subscriber) => {
        const data = await request(
          superfluidSettings.SUPERFLUID_SUBGRAPH_MATIC,
          this.fetchNewInboundStreamsQuery(subscriber, dataDB ? dataDB.lastBlockNumber : null),
        );
        if (data?.streams.length) {
          latestBlock = data.streams[0].createdAtBlockNumber;
          data.streams.forEach(async ({ token: { name, symbol } }) => {
            // send notification here
            const title = `New Inbound stream`;
            const message = `New Inbound Stream added for ${symbol} ${name}`;
            const payloadMsg = message;
            const payloadTitle = title;
            const notificationType = 3;
            const recipient = subscriber;
            const cta = `https://app.superfluid.finance/`;
            await this.sendNotification({
              title,
              payloadTitle,
              message,
              payloadMsg,
              notificationType,
              recipient,
              simulate,
              image: null,
              cta,
            });
          });
        }
        if (latestBlock) {
          await this.setLastBlockStream(latestBlock);
        }
      });
    } catch (e) {
      this.logError(e);
    }
  }

  async getLRDataFromDB(accountId: string, tokenId: string) {
    try {
      const data = await this.superFluidModel.findOne({
        subscriber: accountId,
        tokenId,
      });
      return data;
    } catch (e) {
      this.logError(e);
    }
  }

  async setLRDataToDB(accountId: string, tokenId: string) {
    try {
      const newData = new this.superFluidModel({
        subscriber: accountId,
        tokenId,
      });
      await newData.save();
    } catch (e) {
      this.logError(e);
    }
  }

  // DB settings for stream cancel notification.

  async getLastBlockNumber() {
    try {
      const data = await superFluidStreamModel.findOne({
        id: 'IDA',
      });
      return data;
    } catch (e) {
      this.logError(e);
    }
  }

  async setLastBlockNumber(blockNumber: number) {
    try {
      await superFluidStreamModel.findOneAndUpdate(
        {
          id: 'IDA',
        },
        {
          lastBlockNumber: blockNumber,
        },
        {
          upsert: true,
        },
      );
    } catch (e) {
      this.logError(e);
    }
  }

  // DB settings for New inbound stream

  async getLastBlockStream() {
    try {
      const data = await superFluidStreamModel.findOne({
        id: 'I_STREAM',
      });
      return data;
    } catch (err) {
      this.logError(err);
    }
  }

  async setLastBlockStream(blockNumber: number) {
    try {
      await superFluidStreamModel.findOneAndUpdate(
        {
          id: 'I_STREAM',
        },
        {
          lastBlockNumber: blockNumber,
        },
        { upsert: true },
      );
    } catch (err) {
      this.logError(err);
    }
  }

  async getStreamDataFromDB() {
    try {
      const data = await superFluidStreamModel.findOne({
        id: 'STREAM_DATA',
      });
      return data;
    } catch (e) {
      this.logError(e);
    }
  }

  async setStreamData(timestamp: number) {
    try {
      await superFluidStreamModel.findOneAndUpdate(
        {
          id: 'STREAM_DATA',
        },
        {
          lastTimestamp: timestamp,
        },
        {
          upsert: true,
        },
      );
    } catch (e) {
      this.logError(e);
    }
  }

  private fetchLRQuery(subscriber: string) {
    return gql`
      query Query {
        account(id: "${subscriber}") {
          accountTokenSnapshots(orderBy: updatedAtTimestamp) {
            totalNetFlowRate
            balanceUntilUpdatedAt
            updatedAtTimestamp
            totalNumberOfActiveStreams
            token {
              id
              name
              symbol
            }
          }
        }
      }
    `;
  }

  private fetchLiquidation(timestamp: number) {
    return gql`
      query Query {
        agreementLiquidatedV2Events(orderBy: timestamp, orderDirection: desc, where: { timestamp_gt: ${timestamp} }) {
          id
          name
          targetAccount
          token
          timestamp
          liquidationType
          targetAccountBalanceDelta
        }
      }
    `;
  }

  private fetchTokenDetails(tokenId: string) {
    return gql`
    query Query {
      token(id:"${tokenId}"){
        name
        isSuperToken
        symbol
      }
    }
    `;
  }

  private fetchFlowUpdatedEvents(timestamp: number) {
    return gql`
      query Query {
        flowUpdatedEvents(where: { flowRate: "0", timestamp_gt: 1667895796 }) {
          sender
          oldFlowRate
          timestamp
          receiver
          stream {
            token {
              isListed
              symbol
              id
              name
            }
          }
        }
      }
    `;
  }

  private fetchIDAQuery(lastBlockNumber: number) {
    return gql`
      query Query {
        indexUpdatedEvents(where: { blockNumber_gt: ${lastBlockNumber} }, orderBy: blockNumber, orderDirection: desc) {
          blockNumber
          publisher
          index {
            subscriptions {
              subscriber {
                id
              }
              units
            }
            indexUpdatedEvents {
              newIndexValue
              oldIndexValue
            }
            token {
              symbol
              id
            }
          }
        }
      }
    `;
  }

  private fetchNewInboundStreamsQuery(subscriber: string, blockNumber: number) {
    return gql`
      {
        streams(
          where: { createdAtBlockNumber_gt: ${
            blockNumber ? blockNumber : 0
          }, token_: { isListed: true }, receiver_:{id:"${subscriber}"} }
          orderBy: createdAtBlockNumber
          orderDirection: desc
        ) {
          createdAtBlockNumber
          currentFlowRate
          sender {
            id
          }
          token {
            symbol
            id
            isListed
            name
          }
          receiver {
            id
          }
        }
      }
    `;
  }
}
