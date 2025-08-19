
import { version, name } from '../package.json';
import { DefaultOptions, RenameMeOptions } from './renamemeoptions';
import colors from 'colors';
import fs from 'fs-extra';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

export * from './renamemeoptions';

export default class RenameMe
{
  /**
   * The version of Markugen
   */
  public static readonly version:string = version;
  /**
   * The name of Markugen
   */
  public static readonly name:string = name;
  /**
   * Options passed to {@link RenameMe}
   */
  private _options:Required<RenameMeOptions> = {...DefaultOptions};

  public constructor(options?:RenameMeOptions)
  {
    if (options) this.options = options;
  }

  /**
   * @returns the current configuration options
   */
  public get options() { return this._options; }
  /**
   * Sets the configuration options
   */
  public set options(options:RenameMeOptions)
  {
    // reset options
    this._options = {...DefaultOptions};
    // set the options that were given
    for (const [key, value] of Object.entries(options)) 
      (this._options as any)[key] = value;

    // update option for dry run
    if (this.options.dryRun)
    {
      this._options.quiet = false;
      this._options.verbose = true;
    }
    // update options for no parts given
    if (!this.options.suffix && !this.options.name)
    {
      this._options.suffix = true;
      this._options.name = true;
    }

    // enable/disable console colors
    if (this.options.color) colors.enable();
    else colors.disable();
  }

  /**
   * Performs the renaming with the current {@link RenameMeOptions} or the 
   * given options.
   */
  public rename(options?:RenameMeOptions)
  {
    if (options) this.options = options;
    if (!fs.existsSync(this.options.path))
    {
      console.error(
        '%s The given path does not exist [%s]',
        colors.red('Error:'),
        colors.yellow(path.resolve(this.options.path))
      );
      process.exit(1);
    }
    this.renamePath(this.options.path);
  }
  /**
   * Static version of {@link rename}
   */
  public static renameMe(options?:RenameMeOptions)
  {
    new RenameMe(options).rename();
  }

  /**
   * Checks for a file or directory and calls the correct method
   * @param path the path to rename
   */
  private renamePath(path:string)
  {
    const stat = fs.lstatSync(path);
    if (stat.isFile()) this.renameFile(path);
    else if (stat.isDirectory()) this.traverseDirectory(path);
  }
  /**
   * Walks through the given directory for files
   * @param dir the directory to traverse
   */
  private traverseDirectory(dir:string)
  {
    const files = fs.readdirSync(dir, {withFileTypes: true});
    for(const file of files)
    {
      const full = path.join(file.parentPath, file.name);
      if (file.isFile()) this.renameFile(full);
      else if (file.isDirectory() && this.options.recurse) this.traverseDirectory(full);
    }
  }
  /**
   * Renames the given file based on the given options
   * @param file the path to the file
   */
  private renameFile(file:string)
  {
    const parts = path.parse(file);

    // handle the file name
    let newName = parts.name;

    // handle the name
    if (this.options.name)
    {
      if (this.options.lower) newName = parts.name.toLowerCase();
      else if (this.options.upper) newName = parts.name.toUpperCase();
    }

    // handle the extension
    if (this.options.suffix)
    {
      if (this.options.lower) newName += parts.ext.toLowerCase();
      else if (this.options.upper) newName += parts.ext.toUpperCase();
    }
    else newName += parts.ext;

    // set to full path
    newName = path.join(parts.dir, newName);

    // check for a difference
    const diff = newName != file;
    // print the verbose message
    if (this.options.verbose)
    {
      console.log('%s %s[%s] %s',
        diff ? colors.green('Rename:') : colors.green('No Change:'),
        this.options.git ? 'git mv ' : '',
        colors.yellow(file),
        diff ? `-> [${colors.yellow(newName)}]` : '',
      );
    }

    // execute the rename
    if (diff && !this.options.dryRun)
    {
      if (this.options.git)
      {
        const result = spawnSync(
          'git', ['mv', file, newName],
          {shell:true, encoding:'utf8'}
        );
        if (result.stdout) console.log(result.stdout);
        if (result.stderr) console.error(result.stderr);
      }
      else fs.renameSync(file, newName);
    }
  }
}