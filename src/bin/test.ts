#!/usr/bin/env node

import RenameIt, { RenameItOptions } from '../renameit';
import { RenameItYargs } from '../renameitcommand';
import colors from 'colors';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';
import { version } from '../../package.json';

interface Options extends RenameItOptions
{
  tests: string[],
}

type TestFunc = (options:Options) => void;

async function main()
{
  const tests:Record<string, TestFunc> = {
    s2u: suffixToUpper,
    s2ur: (args) => suffixToUpper({...args, recurse: true}),
    n2u: nameToUpper,
    n2ur: (args) => nameToUpper({...args, recurse: true}),
    f2u: fullToUpper,
    f2ur: (args) => fullToUpper({...args, recurse: true}),
    regex: regexToUpper,
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
      ...RenameItYargs,
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

    for (const test of args.tests)
    {
      console.group(colors.magenta('Testing:'), test);
      tests[test](args);
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
 * @param args the cli arguments
 */
function suffixToUpper(args:Options)
{
  RenameIt.renameIt({...args, upper: true, suffix: true});
}

/**
 * Tests upper name in src
 * @param args the cli arguments
 */
function nameToUpper(args:Options)
{
  RenameIt.renameIt({...args, upper: true, name: true});
}

/**
 * Tests upper name in src
 * @param args the cli arguments
 */
function fullToUpper(args:Options)
{
  RenameIt.renameIt({...args, upper: true});
}

/**
 * Tests upper name in src with regex
 * @param args the cli arguments
 */
function regexToUpper(args:Options)
{
  RenameIt.renameIt({...args, upper: true, recurse: true, regex: /d\.ts/});
}

main();
