
import yargs from 'yargs';

/**
 * RenameIt configuration options
 */
export interface RenameItOptions
{
  /**
   * the file path to rename or a directory path to rename all files within
   */
  path:string,
  /**
   * if true, only the name will be modified
   */
  name?:boolean,
  /**
   * if true, only the suffix will be modified
   */
  suffix?:boolean,
  /**
   * if true, all characters will be converted to lower-case
   */
  lower?:boolean,
  /**
   * if true, all characters will be converted to upper-case
   */
  upper?:boolean,
  /**
   * Regular expression pattern to use for matching files and folders.
   */
  regex?:string,
  /**
   * When combined with --regex causes it to be an exclusion rule
   */
  exclude?:boolean,
  /**
   * if true, directories will be recursed
   */
  recurse?:boolean,
  /**
   * if true, performs rename using git command
   */
  git?:boolean,
  /**
   * If true, console output will be colored, else it will not
   */
  color?:boolean,
  /**
   * If true, RenameIt will print all renames
   */
  verbose?:boolean,
  /**
   * If true, RenameIt will silence its output
   */
  quiet?:boolean,
  /**
   * Does not rename, only prints what will be renamed, implies --verbose
   */
  dryRun?:boolean,
  /**
   * Used internally to tell RenameIt if it was executed from the cli or not
   */
  cli?:boolean,
}

/**
 * Defined yargs arguments for the CLI
 */
export const RenameItYargs:Record<string, yargs.Options> = {
  path: {
    alias: ['p'],
    type: 'string',
    describe: 'file to rename or folder to rename files within',
    default: '.',
  },
  name: {
    alias: ['n'],
    type: 'boolean',
    describe: 'renames the name of the file',
  },
  suffix: {
    alias: ['s', 'exts'],
    type: 'boolean',
    describe: 'renames the suffix/extension of the file',
  },
  lower: {
    alias: ['lc', 'l'],
    type: 'boolean',
    describe: 'convert to lower-case',
  },
  upper: {
    alias: ['uc', 'u'],
    type: 'boolean',
    describe: 'convert to upper-case',
  },
  regex: {
    alias: ['m', 'match', 're'],
    type: 'string',
    describe: 'regular expression used to match files and folders',
  },
  exclude: {
    alias: ['x'],
    type: 'boolean',
    describe: 'when combined with --regex causes it to be an exclusion rule',
  },
  recurse: {
    alias: ['r'],
    type: 'boolean',
    describe: 'recurse subdirectories',
  },
  git: {
    alias: ['g'],
    type: 'boolean',
    describe: 'performs rename with `git mv` command',
  },
  color: {
    alias: ['c'],
    describe: 'console output will be colored',
    type: 'boolean',
    default: true
  },
  verbose: {
    alias: ['v'],
    describe: 'prints all renaming to the console',
    type: 'boolean',
  },
  quiet: {
    alias: ['q'],
    describe: 'no output will be displayed',
    type: 'boolean',
  },
  'dry-run': {
    alias: ['d', 'dr', 'dry'],
    describe: 'does not execute renaming, only prints what will happen, implies --verbose',
    type: 'boolean',
  },
};

/**
 * Default options and their values
 */
export const DefaultOptions:Required<RenameItOptions> = {
  path: '.',
  name: false,
  suffix: false,
  lower: false,
  upper: false,
  regex: '',
  exclude: false,
  recurse: false,
  git: false,
  color: true,
  verbose: false,
  quiet: false,
  dryRun: false,
  cli: false,
};