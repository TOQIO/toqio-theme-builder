import fs from 'file-system';

import { getFormattedTheme } from '../utils/formatter.js'


/**
 * Get file from path
 * @param {string} filePath Path of the file you want to get
 */
const getFile = (filePath) => {
  return fs.readFileSync(filePath);
}


/**
 * Replace path on path
 * @param {string} destinationPath Path where the file should be replaced
 * @param {string} file The file content to be replaced
 */
const replaceFile = (destinationPath, file) => {
  return fs.writeFileSync(destinationPath, file)
}


/**
 * Build formatted theme and replace it on the corresponding path
 * @param {string} filePath Path of the file you want to get
 * @param {string} destinationPath Path where the file should be replaced
 */
const buildFormattedTheme = (filePath, destinationPath) => {
  const oldFile = getFile(destinationPath);

  const uploadedFile = getFile(filePath);
  // const uploadedFile = getFile(buffer);
  console.log('uploadedFile', uploadedFile)

  // const newFile = getFormattedTheme(oldFile, uploadedFile)

  // return replaceFile(destinationPath, newFile)
}


export {
  buildFormattedTheme
}