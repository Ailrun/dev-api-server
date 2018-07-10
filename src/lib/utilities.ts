import chalk from 'chalk';

export const exhaustiveChecker = (x: never, msg?: string): never => {
  throw TypeError(msg || `${x} does not match with any cases`);
}

export const info = chalk.greenBright;
export const warn = chalk.yellowBright;
export const error = chalk.redBright;
