module.exports = {
    devServer: {
      proxy: {
        'symbol': {
          target: 'https://www.findata.co.nz',
          pathRewrite: {
            '^/symbol' : '/'
            }
        },
        '^/api': {
          target: 'https://nyse-app-add.herokuapp.com/api/empresas/',
          pathRewrite: {
            '^/api' : '/'
            }
        }
      }
    }
  }