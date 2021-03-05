module.exports = {
    devServer: {
      proxy: {
        '/symbol': {
          target: 'https://www.findata.co.nz',
          pathRewrite: {
            '^/symbol' : '/'
            }
        },
        '^/api': {
          target: 'http://127.0.0.1:8000/api/empresas/',
          pathRewrite: {
            '^/api' : '/'
            }
        }
      }
    }
  }