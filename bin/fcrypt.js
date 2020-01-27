#! /usr/bin/env node

const {argv_vals, die} = require('./lib/process_argv')

const fcrypt = require('@warren-bank/fcrypt')

const operation = argv_vals["--encrypt"]
  ? fcrypt.encrypt
  : fcrypt.decrypt

const param = {
  method:   argv_vals["--algorithm"],
  key:      argv_vals["--password"],
  input:    argv_vals["--input"],
  output:   argv_vals["--output"],
  callback: (errors) => {
    if (errors.exists)
      die(errors)

    if (!argv_vals["--quiet"])
      console.log(`${argv_vals["--encrypt"] ? 'Encrypt' : 'Decrypt'} complete\nEverything is Ok`)

    process.exit(0)
  }
}

operation(param)
