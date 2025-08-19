
import { CommandModule, Argv, ArgumentsCamelCase } from 'yargs';
import { RenameMeYargs, RenameMeOptions } from './renamemeoptions';
import RenameMe from './renameme';

/**
 * Command object for the CLI
 */
export default class RenameMeCommand<U extends RenameMeOptions> implements CommandModule<object, U> 
{
  public command = ['$0'];
  public describe = 'Batch renaming of files';

  public builder(args:Argv): Argv<U> 
  {
    args.options(RenameMeYargs)
      .conflicts('lower', 'upper')
      .conflicts('quiet', 'verbose')
      .implies('dry-run', 'verbose');
    return args as unknown as Argv<U>;
  }

  public handler(args:ArgumentsCamelCase<U>)
  {
    // create the markugen instance
    let renameme = undefined;
    try 
    {
      renameme = new RenameMe({...args, cli: true});
      renameme.rename();
    }
    catch (e:any)
    { 
      console.error(e);
      process.exit(1); 
    }
  }
}