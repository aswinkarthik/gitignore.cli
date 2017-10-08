#!/usr/bin/env node

const request = require('request'),
      axios = require('axios'),
      fs = require('fs')


const baseUrl = 'https://www.gitignore.io/api/'
const listUrl = `${baseUrl}list`

let cliArgs = process.argv

cliArgs.shift()
cliArgs.shift()

cliArgsToCheck = cliArgs.map(val => val.trim().toLowerCase())

if(cliArgsToCheck == null || cliArgsToCheck.length == 0) {
  console.log('Usage: \n')
  console.log('gitignore $STACK1 [$STACK2 $STACK3...]\n')
  console.log('Please pass atleast 1 argument')
  process.exit(1)
}

axios
  .get(listUrl)
  .then(({data}) => {
    const supportedStacks = data
      .replace(/\n/g,',')
      .split(',')
    let notSupportedStacks = []

    cliArgsToCheck.forEach(each => {
      if(!supportedStacks.includes(each)){
        notSupportedStacks.push(each)
      }
    });
    return notSupportedStacks
  })
  .then(notSupportedItems => {
    if( notSupportedItems != null && notSupportedItems.length > 0) {
      console.log('The following keywords are not supported: \n')
      notSupportedItems.forEach(each => console.log(each))
      console.log('\n\nExiting.\n')
      process.exit(1)
    }
  })
  .then(() => {
    const apiStacks = encodeURIComponent(cliArgsToCheck.join())
    return axios.get(baseUrl + apiStacks)
                .then(res => fs.writeFile('gitignore.io', res.data, err => console.log(err)))
                .catch(err => console.log(err))
  })
  .then(() => {
    console.log('Generated ./gitignore.io file')
  })
  .catch(err => console.log(err))

