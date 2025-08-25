# RenameIt

> Cross-platform batch file renaming utility

This is a small subset of the documentation; the full set of documentation can 
be found here 
[https://falkorclark.com/renameit/index.html](https://falkorclark.com/renameit/index.html).

## Installation

```sh
npm install renameit
# or
yarn add renameit
# or
pnpm add renameit
```

RenameIt also provides a command line interface (CLI) that can be installed
globally by passing the `-g` flag when installing.

## Inspiration

I have written this script in many different languages from Bash, to Batch, to 
Python, and now JavaScript. I prefer JavaScript as a language, so this is the
version I chose to publish.

The main reason for writing this script is for renaming file extensions to 
lower-case. This mostly stems from cameras and the common behavior of saving
file names with all upper-case extensions. Although, Windows does not care,
Linux does, and so do many photo libraries like Google Photos. Therefore,
I wrote this script to make the batch renaming of files quick and easy.

## Usage

RenameIt provides a coding interface as well as a CLI. The most common use case
is the CLI. Once you have installed RenameIt, you can execute the script and get
help with the options available by typing `renameit help` in a command prompt.

The following is an example of renaming all extensions within the current
working directory to lower-case:

```sh
renameit --path . --suffix --lower
```

In code:

```ts
// import the library
import RenameIt from 'renameit';

// create the object and pass options
const batch = new RenameIt({
  path: '.',
  suffix: true,
  lower: true
});
// execute the renaming
batch.rename();
```

Adding the `--recurse` option will tell RenameIt to traverse subdirectories
as well:

```sh
renameit --path . --suffix --lower --recurse
```

In code:

```ts
// import the library
import RenameIt from 'renameit';

// create the object and pass options
const batch = new RenameIt({
  path: '.',
  suffix: true,
  lower: true,
  recurse: true,
});
// execute the renaming
batch.rename();
```
