
import yargs, { CommandModule, Argv, ArgumentsCamelCase } from 'yargs';
import { RenameItOptions } from './renameitoptions';
import RenameIt from './renameit';

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
 * Command object for the CLI
 */
export default class RenameItCommand<U extends RenameItOptions> implements CommandModule<object, U> 
{
  public command = ['$0'];
  public describe = 'Batch renaming of files';

  public builder(args:Argv): Argv<U> 
  {
    args.options(RenameItYargs)
      .conflicts('lower', 'upper')
      .conflicts('quiet', 'verbose')
      .implies('dry-run', 'verbose');
    return args as unknown as Argv<U>;
  }

  public handler(args:ArgumentsCamelCase<U>)
  {
    // create the markugen instance
    let renameit = undefined;
    try 
    {
      renameit = new RenameIt({...args, cli: true});
      renameit.rename();
    }
    catch (e:any)
    { 
      console.error(e);
      process.exit(1); 
    }
  }
}