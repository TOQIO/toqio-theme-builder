import StyleDictionary from 'style-dictionary'

import { getStyleDictionaryConfig } from '../utils/config.js'
import '../utils/transformer.js'
import '../utils/formatter.js'


/**
 * Build theme with styled-dictionary and replace it on the corresponding path
 * @param {string} filePath Path of the file you want to get
 * @param {string} destinationPath Path where the file should be replaced
 */
const buildStyleDictionaryTheme = (filePath, destinationPath) => {
  // Show start build message on console
  console.log(`------------------ 🕐 Build started! ------------------`);
  console.log(`\nCustomising theme on next path: ${destinationPath} ⬇️`);

  // Get config and build
  const StyleDictionaryExtended = StyleDictionary.extend(getStyleDictionaryConfig(filePath, destinationPath))
  StyleDictionaryExtended.buildPlatform('web');

  // Show finish message on console
  console.log(`------------------ 🚀 Build finished! ------------------`);
}


export { buildStyleDictionaryTheme }