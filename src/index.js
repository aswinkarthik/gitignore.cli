#!/usr/bin/env node

const chalk = require('chalk'),
      log = console.log,
      axios = require('axios'),
      fs = require('fs'),
      Fuse = require('fuse.js');

const baseUrl = 'https://www.gitignore.io/api/';
const listUrl = `${baseUrl}list`;

const defaultTargetFile = 'gitignore.cli';

const logger = {
  info: msg => console.log(msg),
  success: msg => console.log(chalk.green(msg)),
  error: msg => console.log(chalk.red(msg))
};

const fuseOptions = {
  shouldSort: true,
  threshold: 0.3,
  location: 0,
  distance: 10,
  maxPatternLength: 32,
  minMatchCharLength: 1
};

const getList = () => {
  return axios
  .get(listUrl)
  .then(({data}) => {
    const supportedStacks = data.replace(/\n/g,',').split(',');
    return supportedStacks;
  });
};

const listOptions = () => {
  getList()
  .then(supportedStacks => {
    log(chalk.green('Available options \n'));
    log(supportedStacks.join(','));
    log('\n');
  });
};

const searchOptions = (item) => {
  logger.info(`Searching for ${chalk.green(item)}\n`);
  getList()
    .then((supportedStacks) => {
      const engine = new Fuse(supportedStacks, fuseOptions);
      const searchResults = engine.search(item);
      if(searchResults.length < 1) {
        logger.error('No results found');
      }
      searchResults.forEach(res => logger.info(supportedStacks[res]));
    });
};

const setOutputFilename = (filename) => {
  selectedTargetFile = filename;
  log(selectedTargetFile);
};

const checkIfValid = (options) => {
  return getList()
  .then(supportedStacks => {
    let notSupportedStacks = [];
    options.forEach(e => {
      if(!supportedStacks.includes(e)) {
        notSupportedStacks.push(e);
      }
    })
    if(notSupportedStacks.length > 0) {
      log(chalk.red('The following stacks are not supported:'));
      log(notSupportedStacks.join() + '\n');
    }
  })
};

const generate = (options, outputfile) => {
  if(program.args.length < 1) {
    return;
  }
  const targetFile = outputfile || defaultTargetFile;
  checkIfValid(options)
    .then(() => {
      log(chalk.green(`Generating ${targetFile}`));
      const apiStacks = encodeURIComponent(options.join());
      return axios.get(baseUrl + apiStacks);
    })
    .then(res => {
      fs.writeFile(targetFile, res.data, err => {if(err) log(chalk.red(err))});
      return targetFile;
    })
    .then((targetFile) => log(chalk.green(`Done`)))
};

const program = require('commander');
program
  .version(chalk.bold('1.3.0'))
  .option('-l, --list', 'List all available stacks', listOptions)
  .option('-o, --outputfile [value]', `Default is ${chalk.bold(defaultTargetFile)}`)
  .option('-s, --search <item>', 'Fuzzy search across various options', searchOptions)
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp(chalk.white);
}

generate(program.args, program.outputfile);