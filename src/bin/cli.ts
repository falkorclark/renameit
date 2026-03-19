#!/usr/bin/env node

import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';
import RenameItCommand from '../renameitcommand';
import RenameIt from '../renameit';

// Handle startup
function main() 
{
  yargs(hideBin(process.argv))
    .parserConfiguration({
      'duplicate-arguments-array': false,
      'strip-aliased': true,
      'strip-dashed': true,
    })
    .help('help', 'show help and exit')
    .version('version', 'show version and exit', RenameIt.version)
    .alias({ help: ['h', '?'] })
    .command(new RenameItCommand)
    .scriptName(RenameIt.name)
    .parse();
}

// startup the main application
main();