const fs   = require('fs')
const path = require('path')

const isDir = (dirpath) => {
  try {
    const stats = fs.statSync(dirpath)
    return stats.isDirectory()
  }
  catch (error) {
    return false
  }
}

const isFile = (filepath) => {
  try {
    const stats = fs.statSync(filepath)
    return stats.isFile()
  }
  catch (error) {
    return false
  }
}

const hasExt = (filepath) => (path.extname(filepath).length > 1)

module.exports = {isDir, isFile, hasExt}
