import path from 'path';
import { spawn } from './lib/cp';

const options = {
  cwd: path.resolve(__dirname, '../build'),
  stdio: ['ignore', 'inherit', 'inherit'],
};

/**
 * Deploy the contents of the `/build` folder to a remote server via Git.
 */
async function deploy() {
  await spawn(process.cwd() + '/autoDeploy.sh');
}

export default deploy;
