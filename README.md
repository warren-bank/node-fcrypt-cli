### [fcrypt](https://github.com/warren-bank/node-fcrypt-cli)

Command-line utility to:
* store an input directory to an encrypted .zip file
* decrypt and extract an input encrypted .zip file to a directory

#### Installation:

```bash
npm install --global @warren-bank/fcrypt-cli
```

#### Usage:

```bash
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
    Mode of operation: decrypt input .zip file to output .zip file

"-x"
"--extract"
    Mode of operation: decrypt input .zip file and extract to output directory

"-a" <algorithm>
"--algorithm" <algorithm>
    Cryptographic algorithm
    Default: 'aes-256-cbc'
    Options: `openssl list -cipher-algorithms`

"-p" <password>
"--password" <password>
    Password used to derive the cryptographic cipher key

"-i" <filepath>
"--input" <filepath>
    Encrypt mode: /path/to/input/directory
    Decrypt mode: /path/to/input/file.zip.encrypted
    Extract mode: /path/to/input/file.zip.encrypted
    Note: input path must exist

"-o" <filepath>
"--output" <filepath>
    Encrypt mode: /path/to/output/file.zip.encrypted
    Decrypt mode: /path/to/output/file.zip
    Extract mode: /path/to/output/directory
    Note: output directory must exist, unless "-c" option is active

"-c"
"--create"
    Create output directory if it does not exist
```

#### Tests:

1. [encrypt](https://github.com/warren-bank/node-fcrypt-cli/blob/master/tests/1-encrypt-bin.bat)
2. [decrypt](https://github.com/warren-bank/node-fcrypt-cli/blob/master/tests/2-decrypt-bin.bat)
3. [extract](https://github.com/warren-bank/node-fcrypt-cli/blob/master/tests/3-extract-bin.bat)

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
