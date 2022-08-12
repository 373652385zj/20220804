/*
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-16 17:29:18
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-08-10 15:50:48
 * @FilePath: /person/20220611/vue.comfig.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require("path");

module.exports = {
  publicPath: "./",
  devServer: {
    port: 8099,
    proxy: {
      "/api": {
        target: "https://zsdl-zzj.com:8122/", // 代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/sit": {
        target: "https://zsdl-zzj.com:8033/", // 代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        ws: true,
        pathRewrite: {
          "^/sit": "",
        },
      },
    },
  },
  pluginOptions: {
    // 第三方插件配置
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/styles/common.less")], // less所在文件路径
    },
  },
};
