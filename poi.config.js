const path = require("path")

module.exports = {
  entry: "example/index.js",
  dist: "example/dist",
  homepage: "/",
  presets: [
    require("poi-preset-sass-resources")({
      resources: path.join(__dirname, "src", "_variables.scss")
    })
  ]
}
