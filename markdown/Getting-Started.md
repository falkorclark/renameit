# Getting Started
To get started using RenameIt in your project, you will need to first
install RenameIt globally or as a dependency within your project.

## Install RenameIt
To install RenameIt within your NodeJS project, execute one of the following
commands:

:::tabs
::tab[npm]
`npm install renameit`
::tab[yarn]
`yarn add renameit`
::tab[pnpm]
`pnpm add renameit`
:::

Adding the `--global` option will install RenameIt globally and allow it to
be executed from anywhere on your machine.

# Options
The options provided to RenameIt are similar on the command line and within
code. The following sections show the available options in both instances.

## Command Line Interface (CLI)
All available options/arguments can be viewed by executing one of the following
commands:

```bash
renameit help
# or
renameit --help
# or
renameit -h
# or
renameit -?
```

The help option will output the following message:

```
markugen.exec npx renameit help
```

## Code
The entire set of options available to the RenameIt class are shown in the below
code snippet:

```ts
markugen.import ../src/renameitoptions.ts
```
