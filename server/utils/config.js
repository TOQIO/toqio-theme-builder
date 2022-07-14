const END_FILE_NAME = 'colors'

/** 
 * CONFIGURATION - Style Dictionary Config for transformation
 * - File got on Figma must be pasted under source path to transform it correctly
 * - Each client "colors.json" would be updated after transformation with new values
 * 
 * @param {string} filePath Path of the file you want to get
 * @param {string} destinationPath Path where the file should be replaced
 */
const getStyleDictionaryConfig = (filePath, destinationPath) => {
  return {
    source: [`${filePath}`],
    platforms: {
      web: {
        transformGroup: "customTheme/web",
        buildPath: `${destinationPath}/`,
        files: [{
          destination: `${END_FILE_NAME}.json`,
          format: 'customJson',
          options: { showFileHeader: false }
        }]
      }
    }
  };
}

export {
  getStyleDictionaryConfig
}