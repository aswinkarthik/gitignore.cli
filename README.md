# Gitignore.cli

- A command line tool for creating .gitignore files.
- Uses [gitignore.io](http://gitignore.io) API

## Usage

- Install using `npm install -g gitignore.cli`
- Generate using:

```bash
$ gitignore node intellij -o .gitignore
Generating .gitignore
Done
```

- By default a file called `gitignore.cli` will be created by default. Rename it to `.gitignore` file or use `--outputfile`.

```bash
  Usage: gitignore [options]


  Options:

    -V, --version             output the version number
    -l, --list                List all available stacks
    -o, --outputfile [value]  Default is gitignore.cli
    -s, --search <item>       Fuzzy search across various options
    -h, --help                output usage information
```

## Features

- `--list` to list all available options.
- `--search` to do fuzzy search on the list of available options to generate.

Example:

```bash
$ gitignore --search android
Searching for android

android
androidstudio
```