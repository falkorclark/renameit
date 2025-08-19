#!/usr/bin/env node

import RenameMe, { RenameMeOptions, RenameMeYargs } from '../renameme';
import colors from 'colors';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';
import { version } from '../../package.json';

interface Options extends RenameMeOptions
{
  tests: string[],
}

type TestFunc = (batch:RenameMe, options:Options) => void;

async function main()
{
  const tests:Record<string, TestFunc> = {
    's2u': suffixToUpper,
    's2ur': (batch, args) => suffixToUpper(batch, {...args, recurse: true}),
    'n2u': nameToUpper,
    'n2ur': (batch, args) => nameToUpper(batch, {...args, recurse: true}),
    'f2u': fullToUpper,
    'f2ur': (batch, args) => fullToUpper(batch, {...args, recurse: true}),
  };

  const args = yargs(hideBin(process.argv))
    .parserConfiguration({
      'duplicate-arguments-array': false,
      'strip-aliased': true,
      'strip-dashed': true,
    })
    .help('help', 'show help and exit')
    .version('version', 'show version and exit', version)
    .alias({ help: ['h', '?'] })
    .options({
      ...RenameMeYargs,
      tests: {
        alias: ['t'],
        describe: 'list of tests to include',
        type: 'array',
        choices: Object.keys(tests),
        default: Object.keys(tests),
      },
    })
    .parse() as unknown as Options;

  try
  {
    args.dryRun = true;
    args.path = './src';

    const batch = new RenameMe();
    for (const test of args.tests)
    {
      console.group(colors.magenta('Testing:'), test);
      tests[test](batch, args);
      console.groupEnd();
    }
  }
  catch(e:any) 
  { 
    console.error(colors.red(e.stack));
    process.exit(1);
  }
}

/**
 * Tests upper suffix in src
 * @param batch the {@link RenameMe} instance
 * @param args the cli arguments
 */
function suffixToUpper(batch:RenameMe, args:Options)
{
  batch.rename({...args, upper: true, suffix: true});
}

/**
 * Tests upper name in src
 * @param batch the {@link RenameMe} instance
 * @param args the cli arguments
 */
function nameToUpper(batch:RenameMe, args:Options)
{
  batch.rename({...args, upper: true, name: true});
}

/**
 * Tests upper name in src
 * @param batch the {@link RenameMe} instance
 * @param args the cli arguments
 */
function fullToUpper(batch:RenameMe, args:Options)
{
  batch.rename({...args, upper: true});
}

main();
