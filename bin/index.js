#!/usr/bin/env node
const program = require('commander');
const serve = require('../serve');
const build = require('../index');

program
  .command('serve')
  .action(() => {
    serve()
  })

program
  .command('build')
  .action(() => {
    build()
  })

program.parse(process.argv);