import { EPNSChannel } from "../../helpers/epnschannel";
import config from "../../config";
import { Logger } from "winston";
import { Inject, Service } from "typedi";
import thenaSettings from "./thenaSettings.json";
import votingEscrowABI from "./VotingEscrowABI.json";
import voterABI from "./voterABI.json";
import minterABI from "./minterABI.json";
import axios from "axios";
import DataModel from "./thenaModel";
import PoolModel from "./thenaModel";

@Service()
export default class ThenaChannel extends EPNSChannel {
  constructor(
    @Inject("logger") public logger: Logger,
    @Inject("cached") public cached
  ) {
    super(logger, {
      networkToMonitor: config.web3BnbMainnetRPC,
      dirname: __dirname,
      name: "Thena",
      url: "https://thena.fi",
      useOffChain: true,
      chain: "BNB",
    });
  }
  async fetchMediumRSSFeed() {
    try {
      const response = await axios.get(thenaSettings.RSS_FEED_API);
      const data = response.data;
      const items = data.items;

      return items;
    } catch (error) {
      console.error("Error fetching Medium feed:", error);
      throw error;
    }
  }
  async retrivePreviouslySavedData() {
    try {
      const data = await PoolModel.find().select("-_id -__v").exec();
      console.log("Data retrieved from MongoDB:", data);
      return data;
    } catch (error) {
      console.error("Error retrieving data from MongoDB:", error);
    }
  }
  async saveDataToMongoDB(data) {
    try {
      await PoolModel.deleteMany({});
      await PoolModel.insertMany(data);
      console.log("Data saved to MongoDB successfully");
    } catch (error) {
      console.error("Error saving data to MongoDB:", error);
    }
  }
  checkIfTimeGreaterThan(timestamp, targetTimestamp) {
    return timestamp > targetTimestamp;
  }

  async sendMessageToContract(simulate: any) {
    try {
      const { contract: votingContract } =
        (await this.getContract(
          thenaSettings.VOTING_ESCROW_ADDRESS,
          votingEscrowABI
        )) || {};
      const { contract: voterContract } =
        (await this.getContract(thenaSettings.VOTER_ADDRESS, voterABI)) || {};
      const { contract: minterContract } = await this.getContract(
        thenaSettings.MINTER_ADDRESS,
        minterABI
      );
      const subscribers = simulate?.logicOverride?.subscribers
        ? simulate.logicOverride.subscribers
        : await this.getChannelSubscribers();
      const period = await minterContract.period();
      if (subscribers) {
        subscribers.forEach(async (subs) => {
          const veBalance = await votingContract.functions.balanceOf(subs);
          for (let i = 0; i < parseInt(veBalance); i++) {
            const tokenID = await votingContract.tokenOfOwnerByIndex(subs, i);
            const lastVotedTimestamp = await voterContract.lastVoted(tokenID);
            if (
              simulate ||
              (period - lastVotedTimestamp > 0 &&
                period - lastVotedTimestamp < 24 * 60 * 60)
            ) {
              // send notification here.
              const title = `Hurry! Vote on time`;
              const msg = `Your voting in veThena token with id ${tokenID.toString()} is going to end within 24 hrs!`;
              const payloadTitle = title;
              const payloadMsg = msg;
              const recipient = simulate?.txOverride?.recipientAddr
                ? simulate.txOverride.recipientAddr
                : subs;
              const notificationType = 3;
              await this.sendNotification({
                title,
                payloadMsg,
                payloadTitle,
                recipient,
                simulate,
                message: msg,
                image: null,
                notificationType,
              });
            }
          }
        });
      }
    } catch (e) {
      this.logError(e);
    }
  }

  async sendNotifsForNewPools(simulate: any) {
    try {
      const response = await axios.get(thenaSettings.API_URL);
      const LatestPools = simulate?.logicOverride?.mode
        ? simulate?.logicOverride?.latestPools
        : response.data;
      let notifSent = false;
      const oldPools = simulate?.logicOverride?.mode
        ? simulate?.logicOverride?.oldPools
        : await this.retrivePreviouslySavedData();
      const newPools = LatestPools.filter((Lpool) => {
        return !oldPools.some((Opool) => {
          return Opool.address === Lpool.address;
        });
      });
      for (const pool of newPools) {
        await this.sendNotification({
          title: "New pool added",
          payloadMsg: `A new [b:${
            pool.symbol
          }] pool with a [t:${pool.gauge.apr.toFixed(
            2
          )}% APR] has been added! Check it out now!`,
          payloadTitle: "New pool added",
          recipient: simulate?.txOverride?.mode
            ? simulate?.txOverride?.recipient
            : await this.getChannelSubscribers(),
          simulate: simulate,
          message: `A new [b:${
            pool.symbol
          }] pool with a [t:${pool.gauge.apr.toFixed(
            2
          )}%] has been added! Check it out now!`,
          image: null,
          cta: "https://thena.fi/liquidity",
          notificationType: simulate?.txOverride?.mode
            ? simulate?.txOverride?.notificationType
            : 1,
        });
        notifSent = true;
      }

      // save pool data to db
      this.saveDataToMongoDB(LatestPools);
      console.log("success");
      return { success: true, notifSent: notifSent };
    } catch (error) {
      console.error(
        "Error fetching data from API or sending Notifications:",
        error
      );
    }
  }
  async sendNotifsForBribedPools(simulate: any) {
    try {
      const response = await axios.get(thenaSettings.API_URL);
      const LatestPools = simulate?.logicOverride?.mode
        ? simulate?.logicOverride?.latestPools
        : response.data;
      let notifSent = false;
      const oldPools = simulate?.logicOverride?.mode
        ? simulate?.logicOverride?.oldPools
        : await this.retrivePreviouslySavedData();
      const newPools = LatestPools.filter((Lpool) => {
        return !oldPools.some((Opool) => {
          return Opool.address === Lpool.address;
        });
      });
      for (const pool of newPools) {
        if (pool.gauge.bribes.bribe != null) {
          await this.sendNotification({
            title: "Pool Bribed!",
            payloadMsg: `${pool.symbol} pool [b:bribed]! Check it out now!`,
            payloadTitle: "Pool Bribed!",
            recipient: simulate?.txOverride?.mode
              ? simulate?.txOverride?.recipient
              : await this.getChannelSubscribers(),
            simulate: simulate,
            message: `${pool.symbol} pool [b:bribed]! Check it out now!`,
            image: null,
            cta: "https://thena.fi/liquidity",
            notificationType: simulate?.txOverride?.mode
              ? simulate?.txOverride?.notificationType
              : 1,
          });
          notifSent = true;
        }
      }
      return { success: true, notifSent: notifSent };
    } catch (error) {
      console.error(
        "Error fetching data from API or sending Notifications:",
        error
      );
    }
  }

  async sendNotifsForNewMediumPosts(simulate: any) {
    try {
      const items = simulate?.logicOverride?.mode
        ? simulate?.logicOverride?.apiResponse
        : await this.fetchMediumRSSFeed();
      let notifSent = false;
      for (const item of items) {
        const postedAfterLastFetch =
          Math.floor(new Date(item.pubDate).getTime() / 1000) >
          this.timestamp - 12 * 60 * 60;
        if (postedAfterLastFetch) {
          await this.sendNotification({
            title: `New article from Thena Fi - ${item.title}`,
            payloadMsg: `A new medium post is published! Click here to read!`,
            payloadTitle: `New article from Thena Fi - ${item.title}`,
            recipient: simulate?.txOverride?.mode
              ? simulate?.txOverride?.recipient
              : await this.getChannelSubscribers(),
            simulate: simulate,
            message: `A new medium post is published! Click here to read!`,
            image: null,
            notificationType: simulate?.txOverride?.mode
              ? simulate?.txOverride?.notificationType
              : 1,
            cta: `${item.link}`,
          });
          notifSent = true;
        }
      }
      return { success: true, notifSent: notifSent };
    } catch (error) {
      console.log(error);
    }
  }
}
