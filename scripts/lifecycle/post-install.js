const shell = require('shelljs');

const isYarn = process.env.npm_execpath.indexOf('yarn');

if (isYarn !== -1 && process.env.NODE_ENV !== 'production') {
	// Workaround for yarn's lifecycle script handling (failing in these cases)
	shell.exec(`npm i airbitz-core-js-ui augur.js cssnano`);
}
