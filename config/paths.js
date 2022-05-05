const path = require("path")

const ROOT = process.cwd()

const ROOTS = {
  ROOT: ROOT,
  SRC: path.resolve(ROOT, "src"),
  PUBLIC: path.resolve(ROOT, "public")
}

module.exports = {
  ROOTS
}
