const fs = require('fs').promises;
const path = require('path');

async function generateConfig() {
  const sourcePath = path.join('apps', 'web', 'src', 'config', 'template.ts');
  const destPath = path.join('apps', 'web', 'src', 'config', 'index2.ts');

  try {
    await fs.copyFile(sourcePath, destPath);
    console.log(`Successfully copied ${sourcePath} to ${destPath}`);
  } catch (error) {
    console.error('Error generating config:', error);
    process.exit(1);
  }
}

generateConfig();
