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
import schedule from 'node-schedule';
import { Container } from 'typedi';

import ThenaChannel from './thenaChannel';

export default () => {
  const startTime = new Date(new Date().setHours(0, 0, 0, 0));

  const dailyRule = new schedule.RecurrenceRule();
  dailyRule.hour = 0;
  dailyRule.minute = 0;
  dailyRule.second = 0;
  dailyRule.dayOfWeek = new schedule.Range(0, 6);
  const sixHourRule = new schedule.RecurrenceRule();
  sixHourRule.hour = new schedule.Range(0, 23, 6);
  sixHourRule.minute = 0;
  sixHourRule.second = 0;
  const channel = Container.get(ThenaChannel);
  logger.info(`🛵 Scheduling Showrunner - Thena Channel [on 24 hours] [${new Date(Date.now())}]`);

  schedule.scheduleJob({ start: startTime, rule: dailyRule }, async function () {
    const taskName = `${channel.cSettings.name} sendMessageToContract(false)`;
    try {
      channel.sendMessageToContract(false);
      logger.info(`🐣 Cron Task Completed -- ${taskName}`);
    } catch (err) {
      logger.error(`❌ Cron Task Failed -- ${taskName}`);
      logger.error(`Error Object: %o`, err);
    }
  });

  schedule.scheduleJob({ start: startTime, rule: dailyRule }, async function () {
    const taskName = `${channel.cSettings.name} sendNotifsForNewMediumPosts(false)`;
    try {
      channel.sendNotifsForNewMediumPosts(false);
      logger.info(`🐣 Cron Task Completed -- ${taskName}`);
    } catch (err) {
      logger.error(`❌ Cron Task Failed -- ${taskName}`);
      logger.error(`Error Object: %o`, err);
    }
  });
  schedule.scheduleJob({ start: startTime, rule: sixHourRule }, async function () {
    const taskName = `${channel.cSettings.name} sendNotifsForBribedPools(false)`;
    try {
      channel.sendNotifsForBribedPools(false);
      logger.info(`🐣 Cron Task Completed -- ${taskName}`);
    } catch (err) {
      logger.error(`❌ Cron Task Failed -- ${taskName}`);
      logger.error(`Error Object: %o`, err);
    }
  });
  schedule.scheduleJob({ start: startTime, rule: sixHourRule }, async function () {
    const taskName = `${channel.cSettings.name} sendNotifsForNewPools(false)`;
    try {
      channel.sendNotifsForNewPools(false);
      logger.info(`🐣 Cron Task Completed -- ${taskName}`);
    } catch (err) {
      logger.error(`❌ Cron Task Failed -- ${taskName}`);
      logger.error(`Error Object: %o`, err);
    }
  });
};
