const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    proxy: "http://localhost:7001"
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@utils": resolve("./src/utils"),
        "@template": resolve("./src/template")
      }
    }
  }
};
