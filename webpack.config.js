const path = require("path");
const glob = require("glob");

const workerEntries = glob
    .sync("./src/workers/**.js")
    .reduce(function (obj, el) {
        obj[`workers/${path.parse(el).name}`] = `./${el}`;
        return obj;
    }, {});

module.exports = {
    entry: {
        index: "./src/index.js",
        ...workerEntries,
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    mode: "development",
    watch: true,
    cache: true,
};
