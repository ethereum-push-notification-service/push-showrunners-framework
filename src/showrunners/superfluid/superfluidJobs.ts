// Do Scheduling
// https://github.com/node-schedule/node-schedule
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// Execute a cron job every 5 Minutes = */5 * * * *
// Starts from seconds = * * * * * *

import logger from '../../loaders/logger';

import { Container } from 'typedi';
import schedule from 'node-schedule';
import Superfluid from './superfluidChannel';

export default () => {
  const startTime = new Date(new Date().setHours(0, 0, 0, 0));
  const channel = Container.get(Superfluid);
  const threeHourRule = new schedule.RecurrenceRule();
  threeHourRule.hour = new schedule.Range(0, 23, 3);
  threeHourRule.minute = 0;

  const dailyRule = new schedule.RecurrenceRule();
  dailyRule.hour = 0;
  dailyRule.minute = 0;
  dailyRule.second = 0;
  dailyRule.dayOfWeek = new schedule.Range(0, 6);

  channel.logInfo(`-- 🛵 Scheduling Showrunner ${channel.cSettings.name} -  Channel [on 3hr ]`);
  schedule.scheduleJob({ start: startTime, rule: threeHourRule }, async function () {
    const taskName = `${channel.cSettings.name} sendLiquidationRisk(false)`;
    try {
      channel.sendLiquidationRisk(false);
      logger.info(`🐣 Cron Task Completed -- ${taskName}`);
    } catch (err) {
      logger.error(`❌ Cron Task Failed -- ${taskName}`);
      logger.error(`Error Object: %o`, err);
    }
  });

  schedule.scheduleJob({ start: startTime, rule: threeHourRule }, async function () {
    const taskName = `${channel.cSettings.name} sendLiquidatedNotification(false)`;
    try {
      channel.sendLiquidatedNotification(false);
      logger.info(`🐣 Cron Task Completed -- ${taskName}`);
    } catch (err) {
      logger.error(`❌ Cron Task Failed -- ${taskName}`);
      logger.error(`Error Object: %o`, err);
    }
  });

  schedule.scheduleJob({ start: startTime, rule: threeHourRule }, async function () {
    const taskName = `${channel.cSettings.name} sendStreamCancelledNotification(false)`;
    try {
      channel.sendStreamCancelledNotification(false);
      logger.info(`🐣 Cron Task Completed -- ${taskName}`);
    } catch (err) {
      logger.error(`❌ Cron Task Failed -- ${taskName}`);
      logger.error(`Error Object: %o`, err);
    }
  });

  schedule.scheduleJob({ start: startTime, rule: threeHourRule }, async function () {
    const taskName = `${channel.cSettings.name} sendIDANotifications(false)`;
    try {
      channel.sendIDANotifications(false);
      logger.info(`🐣 Cron Task Completed -- ${taskName}`);
    } catch (err) {
      logger.error(`❌ Cron Task Failed -- ${taskName}`);
      logger.error(`Error Object: %o`, err);
    }
  });

  schedule.scheduleJob({ start: startTime, rule: threeHourRule }, async function () {
    const taskName = `${channel.cSettings.name} sendNewInboundDistribution(false)`;
    try {
      channel.sendNewInboundDistribution(false);
      logger.info(`🐣 Cron Task Completed -- ${taskName}`);
    } catch (err) {
      logger.error(`❌ Cron Task Failed -- ${taskName}`);
      logger.error(`Error Object: %o`, err);
    }
  });
};
