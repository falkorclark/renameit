
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