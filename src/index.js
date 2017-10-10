#!/usr/bin/env node

const chalk = require('chalk')
const log = console.log
const axios = require('axios')
const fs = require('fs')

const baseUrl = 'https://www.gitignore.io/api/'
const listUrl = `${baseUrl}list`

const defaultTargetFile = 'gitignore.cli'

const getSupportedListAndDo = () => {
  return axios
  .get(listUrl)
  .then(({data}) => {
    const supportedStacks = data.replace(/\n/g,',').split(',')
    return supportedStacks
  })
}

const listOptions = () => {
  getSupportedListAndDo()
  .then(supportedStacks => {
    log(chalk.green('Available options \n'))
    log(supportedStacks.join(','))
    log('\n')
  })
}

const setOutputFilename = (filename) => {
  selectedTargetFile = filename
  console.log(selectedTargetFile)
}

const checkIfValid = (options) => {
  return getSupportedListAndDo(supportedStacks => {
    let notSupportedStacks = []
    options.forEach(e => {
      if(!supportedStacks.includes(e)) {
        notSupportedStacks.push(e)
      }
    })
    if(notSupportedStacks.length > 0) {
      log(chalk.red('The following stacks are not supported: \n'))
      log(notSupportedStacks)
      process.exit(1)
    }
  })
}


const generate = (options, outputfile) => {
  if(program.args.length < 1) {
    return;
  }
  const targetFile = outputfile || defaultTargetFile
  checkIfValid(options)
    .then(() => {
      log(chalk.green(`Generating ${targetFile}`))
      const apiStacks = encodeURIComponent(options.join())
      return axios.get(baseUrl + apiStacks)
    })
    .then(res => {
      fs.writeFile(targetFile, res.data, err => {if(err) log(chalk.red(err))})
      return targetFile
    })
    .then((targetFile) => log(chalk.green(`Done`)))
}

const program = require('commander')
program
  .version(chalk.bold('1.2.0'))
  .option('-l, --list', 'List all available stacks', listOptions)
  .option('-o, --outputfile [value]', `Default is ${chalk.bold(defaultTargetFile)}`)
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp(chalk.white);
}

generate(program.args, program.outputfile)

