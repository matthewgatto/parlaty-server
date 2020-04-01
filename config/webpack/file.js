module.exports = {
  test: /\.(ttf|eot|otf|png|svg|woff|woff2)$/,
  use: {
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
    }
  }
}
