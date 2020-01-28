#! /usr/bin/env node

const {argv_vals, die} = require('./lib/process_argv')

const fcrypt = require('@warren-bank/fcrypt')

const operation = argv_vals["--encrypt"]
  ? fcrypt.encrypt
  : argv_vals["--decrypt"]
      ? fcrypt.decrypt
      : fcrypt.extract

let operation_name
{
  const name = operation.name
  operation_name = name.charAt(0).toUpperCase() + name.slice(1)
}

const param = {
  method:   argv_vals["--algorithm"],
  key:      argv_vals["--password"],
  input:    argv_vals["--input"],
  output:   argv_vals["--output"],
  callback: (errors) => {
    if (errors.exists)
      die(errors)

    if (!argv_vals["--quiet"])
      console.log(`${operation_name} complete\nEverything is Ok`)

    process.exit(0)
  }
}

operation(param)
