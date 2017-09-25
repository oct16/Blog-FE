import path from 'path';
import { spawn, exec } from './lib/cp';

/**
 * Deploy the contents of the `/build` folder to a remote server via Git.
 */
async function deploy() {
  await exec(process.cwd() + '/autoDeploy.sh')
}

export default deploy;
