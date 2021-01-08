module.exports = {
  "publicPath": '/v2/',
  "assetsDir": "assets",
  "devServer": {
    "proxy": "http://api-factory.simbirsoft1.com"
  },
  "transpileDependencies": [
    "vuetify"
  ]
}
