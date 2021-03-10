// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
  },
  plugins: [
    ["snowpack-plugin-raw-file-loader", {
      exts: [".frag",".vert"], // Add file extensions saying what files should be loaded as strings in your snowpack application. Default: '.txt'
    }],
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    out:"docs"
    /* ... */
  },
};
