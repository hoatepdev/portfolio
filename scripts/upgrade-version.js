const fs = require('fs').promises;
const path = require('path');

async function upgradeVersion() {
  const indexPath = path.join('apps', 'web', 'src', 'config', 'test', 'index.ts');
  const templatePath = path.join('apps', 'web', 'src', 'config', 'test', 'template.ts');

  try {
    // Read the contents of both files
    const indexContent = await fs.readFile(indexPath, 'utf-8');
    const templateContent = await fs.readFile(templatePath, 'utf-8');

    // Extract the config object from both files
    const indexConfig = extractConfigObject(indexContent);
    const templateConfig = extractConfigObject(templateContent);

    // Merge the configs, prioritizing existing values in index.ts
    const mergedConfig = { ...templateConfig, ...indexConfig };

    // Generate the new content for index.ts
    const newIndexContent = generateNewIndexContent(indexContent, mergedConfig);

    // Write the new content back to index.ts
    await fs.writeFile(indexPath, newIndexContent, 'utf-8');

    console.log('Successfully upgraded config/index.ts');
  } catch (error) {
    console.error('Error upgrading version:', error);
    process.exit(1);
  }
}

function extractConfigObject(content) {
  const configMatch = content.match(/const\s+config\s*:\s*Config\s*=\s*({[\s\S]*?});/);
  if (configMatch) {
    const configString = configMatch[1];
    // Use a simple regex to extract key-value pairs
    const keyValuePairs = configString.match(/(\w+)\s*:\s*([^,\n]+)/g);
    if (keyValuePairs) {
      return Object.fromEntries(
        keyValuePairs.map(pair => {
          const [key, value] = pair.split(':').map(s => s.trim());
          return [key, value];
        })
      );
    }
  }
  return {};
}

function generateNewIndexContent(originalContent, mergedConfig) {
  const configString = Object.entries(mergedConfig)
    .map(([key, value]) => `  ${key}: ${value},`)
    .join('\n');

  return originalContent.replace(
    /(const\s+config\s*:\s*Config\s*=\s*{)([\s\S]*?)(};)/,
    `$1\n${configString}\n$3`
  );
}

upgradeVersion();

