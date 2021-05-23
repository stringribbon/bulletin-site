const app = require('express')();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const port = process.env.PORT || 3000;
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/',
  })
);

app.listen(port, () => {
  `Serving app on port ${port}`
});