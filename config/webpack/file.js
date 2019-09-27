module.exports = {
  test: /\.(ttf|eot|otf|png|svg)$/,
  use: {
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
    }
  }
}
