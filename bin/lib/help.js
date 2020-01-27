const help = `
usage:
======

fcrypt <options>

options:
========

"-h"
"--help"
    Print a help message describing all command-line options

"-v"
"--version"
    Print the version number

"-q"
"--quiet"
    Do not print error messages

"-e"
"--encrypt"
    Mode of operation: encrypt input directory to output .zip file

"-d"
"--decrypt"
    Mode of operation: decrypt input .zip file to output directory

"-a" <algorithm>
"--algorithm" <algorithm>
    Cryptographic algorithm
    Default: 'aes-256-cbc'
    Options: \`openssl list -cipher-algorithms\`

"-p" <password>
"--password" <password>
    Password used to derive the cryptographic cipher key

"-i" <filepath>
"--input" <filepath>
    Encrypt mode: /path/to/input/directory
    Decrypt mode: /path/to/input/file.zip
    Note: input path must exist

"-o" <filepath>
"--output" <filepath>
    Encrypt mode: /path/to/output/file.zip
    Decrypt mode: /path/to/output/directory
    Note: output directory must exist, unless "-c" option is active

"-c"
"--create"
    Create output directory if it does not exist
`

module.exports = help
