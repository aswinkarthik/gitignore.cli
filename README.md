![npm](https://img.shields.io/npm/dm/gitignore.cli.svg?style=for-the-badge)

# Gitignore.cli

- A command line tool for creating .gitignore files.
- Uses [gitignore.io](http://gitignore.io) API


## Installation

`npm install -g gitignore.cli`

## Usage

To gitignore intellij and node js files

```bash
  gitignore node intellij >> .gitignore
```

### Other options

```bash
  $ gitignore --help
  Usage: gitignore [options]


  Options:

    -V, --version             output the version number
    -l, --list                List all available stacks
    -s, --search <item>       Fuzzy search across various options
    -h, --help                output usage information
```

## Examples

```bash
$ gitignore --search android
Searching for android

android
androidstudio
```