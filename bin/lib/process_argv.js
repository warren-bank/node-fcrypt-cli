const path = require('path')

const process_argv = require('@warren-bank/node-process-argv')
const Errors       = require('@warren-bank/fcrypt/source/errors')

const argv_flags = {
  "--help":         {bool:  true},
  "--version":      {bool:  true},
  "--quiet":        {bool:  true},
  "--encrypt":      {bool:  true},
  "--decrypt":      {bool:  true},
  "--create":       {bool:  true},
  "--algorithm":    {},
  "--password":     {},
  "--input":        {file:  "path-exists"},
  "--output":       {file:  "path"}
}

const argv_flag_aliases = {
  "--help":         ["-h"],
  "--version":      ["-v"],
  "--quiet":        ["-q"],
  "--encrypt":      ["-e"],
  "--decrypt":      ["-d"],
  "--create":       ["-c"],
  "--algorithm":    ["-a"],
  "--password":     ["-p"],
  "--input":        ["-i"],
  "--output":       ["-o"]
}

let argv_vals = {}

const die = (error) => {
  if (!argv_vals["--quiet"]) {
    if (error instanceof Errors) {
      error.console()
    }
    else if (error instanceof Error) {
      console.log(error.message)
    }
    else {
      console.log(error)
    }
  }
  process.exit(1)
}

try {
  argv_vals = process_argv(argv_flags, argv_flag_aliases)
}
catch (error) {
  die(error)
}

if (argv_vals["--help"]) {
  const help = require('./help')
  console.log(help)
  process.exit(0)
}

if (argv_vals["--version"]) {
  const data = require('../../package.json')
  console.log(data.version)
  process.exit(0)
}

if (!argv_vals["--encrypt"] && !argv_vals["--decrypt"]) {
  die('Mode of operation is required')
}

if (!argv_vals["--password"]) {
  die('Password is required')
}

if (!argv_vals["--input"]) {
  die('Input path is required and must exist')
}

if (!argv_vals["--output"]) {
  die('Output path is required')
}

if (!argv_vals["--create"]) {
  try {
    const old_argv = process.argv

    // reprocess a single argv pair w/ more strict constraint.
    //  - if output path is file: dirname must exist
    //  - if output path is dir:  dir must exist
    // don't need to capture and merge output.
    // only care that validation doesn't throw an exception.
    const constraint = (path.extname(argv_vals["--output"]).length > 1)
      ? "path-dirname-exists"
      : "path-exists"
    process.argv = [null, null, "--output", argv_vals["--output"]]
    process_argv({"--output": {file: constraint}}, [])

    process.argv = old_argv
  }
  catch (error) {
    die(error)
  }
}

module.exports = {argv_vals, die}
