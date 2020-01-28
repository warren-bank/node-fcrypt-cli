const {isDir, isFile, hasExt} = require('./fs_stats')

const process_argv = require('@warren-bank/node-process-argv')
const Errors       = require('@warren-bank/fcrypt/source/errors')

const argv_flags = {
  "--help":         {bool:  true},
  "--version":      {bool:  true},
  "--quiet":        {bool:  true},
  "--encrypt":      {bool:  true},
  "--decrypt":      {bool:  true},
  "--extract":      {bool:  true},
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
  "--extract":      ["-x"],
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

const constrain_output_path = (constraint) => {
  if (!argv_vals["--create"]) {
    try {
      const old_argv = process.argv

      // reprocess a single argv pair w/ more strict constraint.
      //  - if output path is file: dirname must exist
      //  - if output path is dir:  dir must exist
      // don't need to capture and merge output.
      // only care that validation doesn't throw an exception.
      process.argv = [null, null, "--output", argv_vals["--output"]]
      process_argv({"--output": {file: constraint}})

      process.argv = old_argv
    }
    catch (error) {
      die(error)
    }
  }
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

if (!argv_vals["--encrypt"] && !argv_vals["--decrypt"] && !argv_vals["--extract"]) {
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

if (argv_vals["--encrypt"]) {
  if (!isDir(argv_vals["--input"]))
    die('Input path must be a directory when mode of operation is encrypt')
  if (!hasExt(argv_vals["--output"]))
    die('Output path must include a file extension when mode of operation is encrypt')
  if (isDir(argv_vals["--output"]))
    die('Output path must be a file when mode of operation is encrypt; directory already exists')
  constrain_output_path("path-dirname-exists")
}
else if (argv_vals["--decrypt"]) {
  if (!isFile(argv_vals["--input"]))
    die('Input path must be a file when mode of operation is decrypt')
  if (!hasExt(argv_vals["--output"]))
    die('Output path must include a file extension when mode of operation is decrypt')
  if (isDir(argv_vals["--output"]))
    die('Output path must be a file when mode of operation is decrypt; directory already exists')
  constrain_output_path("path-dirname-exists")
}
else if (argv_vals["--extract"]) {
  if (!isFile(argv_vals["--input"]))
    die('Input path must be a file when mode of operation is extract')
  if (isFile(argv_vals["--output"]))
    die('Output path must be a directory when mode of operation is extract; file already exists')
  constrain_output_path("path-exists")
}

module.exports = {argv_vals, die}
