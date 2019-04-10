module.exports = function (api) {
  api.cache(true);

  const presets = [ "@babel/preset-env","@babel/preset-react" ];
  const plugins = [ 
    "@babel/plugin-transform-flow-strip-types",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ];

  return {
    presets,
    plugins
  };
}
