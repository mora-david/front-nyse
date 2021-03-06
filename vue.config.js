module.exports = {
    devServer: {
      proxy: {
        '^/symbol': {
          //target: 'https://www.findata.co.nz',
          target:'https://www.findata.co.nz/markets/NYSE/symbols/M.htm',
          pathRewrite: {
            '^/symbol' : '/'
            }
        },
        //'^/api': {
         // target: 'https://nyse-app-add.herokuapp.com/api/empresas/',
          //pathRewrite: {
            //'^/api' : '/'
            //}
        //}
      }
    }
  }