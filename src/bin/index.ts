#!/usr/bin/env node
import process from 'process';

import { run } from '../lib';
import { getArgv } from './argv';

const argv = getArgv();

run(argv.configFile, argv.watch)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
