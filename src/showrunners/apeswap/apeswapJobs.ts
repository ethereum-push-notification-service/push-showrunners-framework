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

import config from '../../config';
import logger from '../../loaders/logger';

import { Container } from 'typedi';
import schedule from 'node-schedule';
import ApeswapChannel from './apeswapChannel';

export default () => {
  // wallet tracker jobs
  const startTime = new Date(new Date().setHours(0, 0, 0, 0));

  const threeHourRule = new schedule.RecurrenceRule();
  threeHourRule.hour = new schedule.Range(0, 23, 3);
  threeHourRule.minute = 0;
  threeHourRule.second = 0;

  schedule.scheduleJob({ start: startTime, rule: threeHourRule }, async function () {
    const channel = Container.get(ApeswapChannel);
    channel.logInfo(` 🛵 Scheduling Showrunner - ${channel.cSettings.name} Channel`);
    const taskName = `${channel.cSettings.name} fetch pool notifications`;

    try {
      await channel.sendPoolNotificationToUsers(false);

      channel.logInfo(`🐣 Cron Task Completed -- ${taskName}`);
    } catch (err) {
      channel.logInfo(`❌ Cron Task Failed -- ${taskName}`);
      channel.logError(`Error Object: %o`);
      channel.logError(err);
    }
  });

  schedule.scheduleJob({ start: startTime, rule: threeHourRule }, async function () {
    const channel = Container.get(ApeswapChannel);
    channel.logInfo(` 🛵 Scheduling Showrunner - ${channel.cSettings.name} Channel`);
    const taskName = `${channel.cSettings.name} bond notifications`;

    try {
      await channel.sendBondNotificationToUsers(false);

      channel.logInfo(`🐣 Cron Task Completed -- ${taskName}`);
    } catch (err) {
      channel.logInfo(`❌ Cron Task Failed -- ${taskName}`);
      channel.logError(`Error Object: %o`);
      channel.logError(err);
    }
  });

  schedule.scheduleJob({ start: startTime, rule: threeHourRule }, async function () {
    const channel = Container.get(ApeswapChannel);
    channel.logInfo(` 🛵 Scheduling Showrunner - ${channel.cSettings.name} Channel`);
    const taskName = `${channel.cSettings.name} fetch pool notifications`;

    try {
      await channel.sendDiscountNotifications(false);

      channel.logInfo(`🐣 Cron Task Completed -- ${taskName}`);
    } catch (err) {
      channel.logInfo(`❌ Cron Task Failed -- ${taskName}`);
      channel.logError(`Error Object: %o`);
      channel.logError(err);
    }
  });
};
