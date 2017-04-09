/**
 * Variables that will be sent to the app (in "process.env").
 * You can use both the environment variables and the dotenv variables.
 */
const paths = require('./paths');
require('dotenv').config({ path: paths.doteEnvPath, silent: true });

module.exports = {
  'process.env': {
    BASE_PATH: JSON.stringify(process.env.BASE_PATH),
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  },
};
