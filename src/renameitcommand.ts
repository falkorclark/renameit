
import { CommandModule, Argv, ArgumentsCamelCase } from 'yargs';
import { RenameItYargs, RenameItOptions } from './renameitoptions';
import RenameIt from './renameit';

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