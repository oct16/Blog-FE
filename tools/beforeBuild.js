import { readFile, writeFile } from './lib/fs';
import path from 'path';

/**
 * Cleans up the output (build) directory.
 */
async function beforeBuild() {
  await slashAntdStyle()
}

async function slashAntdStyle () {
  const targetPath = path.resolve(__dirname, '../node_modules/antd/lib/style/core/index.less')
  const targetContent =  await readFile(targetPath)
  const isSlash = targetContent.indexOf('// @import "base";') > 0
  if (!isSlash) {
    await writeFile(
      targetPath,
      targetContent.replace('@import "base";', '// @import "base";')
    )
  }

  return Promise.resolve()
}

export default beforeBuild;
