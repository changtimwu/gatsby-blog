let opts={}
exports.onPreInit = ( _ref, pluginOptions ) => {
  let { owner, repo, clientId, clientSecret} = pluginOptions
  opts ={ owner, repo, clientId, clientSecret}
}

exports.onCreateWebpackConfig = ({ stage, plugins, actions }) => {
  actions.setWebpackConfig({
    plugins: [plugins.define({
      GATSBY_VSSUE_OPTS: JSON.stringify( opts)
    })]
  })
}
