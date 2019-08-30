module.exports = {
  test: /\.(ttf|eot|otf|png)$/,
  use: {
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
    }
  }
}
