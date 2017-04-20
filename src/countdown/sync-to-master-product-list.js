import {
  CountdownService,
} from './countdown-service';

const jobName = 'Sync Countdown Products to Master Product List';

Parse.Cloud.job(jobName, (request, status) => { // eslint-disable-line no-undef
  const log = request.log;

  log.info(`The job ${jobName} has started.`);
  status.message('The job has started.');

  const service = new CountdownService({
    logVerboseFunc: message => log.info(message),
    logInfoFunc: message => log.info(message),
    logErrorFunc: message => log.error(message),
  });

  service.syncToMasterProductList()
    .then(() => {
      log.info(`The job ${jobName} completed successfully.`);
      status.success('Job completed successfully.');
    })
    .catch((error) => {
      log.error(`The job ${jobName} ended in error. Error: ${error}`);
      status.error('Job completed in error.');
    });
});