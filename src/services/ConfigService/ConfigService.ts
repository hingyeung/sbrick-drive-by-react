export const getConfigForEnv = () => {
  const defaultConfig = require('configs/default.json');
  return Object.assign({}, defaultConfig, require(`configs/${process.env.NODE_ENV}.json`));
};
