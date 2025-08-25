# Examples
This section gives a few examples of using RenameIt within code as well as using
the command line interface (CLI). Each example is also executed on the command
line with the output shown from the command. The commands use the `--dry-run`
option to prevent actual renaming of the files because it is executed on the
files within the `src` directory of RenameIt.

## Extensions
This example converts all extensions within the `./src` to lower-case:

:::tabs
::tab[Code]
```ts
// import the library
import RenameIt from 'renameit';

// create the object and pass options
const batch = new RenameIt({
  path: './src',
  suffix: true,
  lower: true
});
// execute the renaming
batch.rename();
```

::tab[CLI]
```sh
renameit --path ./src --suffix --lower
```

::tab[Output]
```sh
markugen.exec npx renameit --path ./src --suffix --lower --dry-run
```
:::

This is the same example, but converts the extensions to upper-case:

:::tabs
::tab[Code]
```ts
// import the library
import RenameIt from 'renameit';

// create the object and pass options
const batch = new RenameIt({
  path: './src',
  suffix: true,
  upper: true
});
// execute the renaming
batch.rename();
```

::tab[CLI]
```sh
renameit --path ./src --suffix --upper
```

::tab[Output]
```sh
markugen.exec npx renameit --path ./src --suffix --upper --dry-run
```
:::

## Recursion
RenameIt is not recursive by default; however, you can tell RenameIt to recurse
into sub-directories by passing the `recurse: true` flag as an option like in
the following example:

:::tabs
::tab[Code]

```ts
// import the library
import RenameIt from 'renameit';

// create the object and pass options
const batch = new RenameIt({
  path: './src',
  suffix: true,
  upper: true,
  recurse: true
});
// execute the renaming
batch.rename();
```

::tab[CLI]

```sh
renameit --path ./src --suffix --upper --recurse
```

::tab[Output]
```sh
markugen.exec npx renameit --path ./src --suffix --upper --recurse --dry-run
```
:::
