import cp from 'child_process';
import run from './run';
import clean from './clean';
import copy from './copy';
import beforeBuild from './beforeBuild';
import bundle from './bundle';
import render from './render';
import pkg from '../package.json';

/**
 * Compiles the project from source files into a distributable
 * format and copies it to the output (build) folder.
 */
async function build() {
  await run(clean);
  await run(copy);
  await run(beforeBuild);
  await run(bundle);

  if (process.argv.includes('--static')) {
    await run(render);
  }

  if (process.argv.includes('--docker')) {
    cp.spawnSync('docker', ['build', '-t', pkg.name, './bulid'], { stdio: 'inherit' });
  }
}

export default build;
