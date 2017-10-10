# Gitignore.io

- A command line tool for creating .gitignore files.
- Uses [gitignore.io](http://gitignore.io) API

## Usage

- Install using `npm install -g gitignore.cli`
- Generate using `gitignore node intellij`
- A file called `gitignore.cli` will be created by default. Rename it to `.gitignore` file if needed.

```bash
  Usage: gitignore [options]


  Options:

    -V, --version             output the version number
    -l, --list                List all available stacks
    -o, --outputfile [value]  Default is gitignore.cli
    -h, --help                output usage information
```

## Upcoming

- `search` feature to do fuzzy search on the list of available stacks to generate