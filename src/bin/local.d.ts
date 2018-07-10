import * as yargs from 'yargs';

declare module 'yargs' {
  interface Argv {
    scriptName($0: string): Argv;
  }
}
