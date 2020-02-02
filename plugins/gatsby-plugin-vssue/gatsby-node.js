let opts={}
exports.onPreInit = ( _ref, pluginOptions ) => {
  let { ower, repo, clientId, clientSecret} = pluginOptions
  opts ={ ower, repo, clientId, clientSecret}
}

exports.onCreateWebpackConfig = ({ stage, plugins, actions }) => {
  actions.setWebpackConfig({
    plugins: [plugins.define({
      GATSBY_VSSUE_OPTS: JSON.stringify( opts)
    })]
  })
}
