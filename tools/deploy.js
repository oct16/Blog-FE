import path from 'path';
import { spawn } from './lib/cp';

/**
 * Deploy the contents of the `/build` folder to a remote server via Git.
 */
async function deploy() {
  await spawn(process.cwd() + '/autoDeploy.sh');
}

export default deploy;
