import path from 'path';
import { spawn, exec } from './lib/cp';

/**
 * Deploy the contents of the `/build` folder to a remote server via Git.
 */
async function deploy() {
  let { stdout } = await exec(process.cwd() + '/autoDeploy.sh')
  console.log(stdout)
}

export default deploy;
