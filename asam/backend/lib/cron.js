const { CronJob } = require('cron');

const job = new CronJob('*/5 * * * * *', function() {
  console.log('This task runs every 5 seconds:', new Date());
});

job.start();
