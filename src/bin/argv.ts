import yargs from 'yargs';

export interface Arguments {
  watch?: boolean;
  configFile: string;
}

export const getArgv = () => {
  const argv = makeArgv();

  return validatedArgv(argv);
}

const makeArgv = () => yargs
  .usage('$0 [configFile]', 'start dev-api-server with [configFile]', (yargs_) => {
    return yargs_
      .positional('configFile', {
        default: './dev-api.json',
        describe: 'configuation json file for dev-api-server',
        type: 'string',
      });
  }, () => {})
  .env(false)
// help option
  .alias('help', 'h')
// watch option
  .option('watch', {
    alias: 'h',
    default: false,
    describe: 'watch config file and restart the server when config file is updated',
    type: 'boolean',
  })
  .argv
;

const validatedArgv = (argv: yargs.Arguments): Arguments => {
  if (argv._.length > 0) {
    throw Error('dev-api-server accepts only one argument');
  }

  return {
    watch: argv.watch,
    configFile: argv.configFile,
  };
}
