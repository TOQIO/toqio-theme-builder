import fs from 'file-system'
import StyleDictionary from 'style-dictionary'
import _ from 'lodash'

import { CATEGORIES } from './constants.js'


// TODO: remove when all this variables are removed
const getOldVariables = (colors) => {
  return `
  "font_family": "${colors.font_family || ''}",
  "font_base_weight": "${colors.font_base_weight || ''}",
  
  "primary_color": "${colors.primary_color || ''}",
  "white": "${colors.white || ''}",
  "black": "${colors.black || ''}",
  "black_70": "${colors.black_70 || ''}",
  "black_50": "${colors.black_50 || ''}",
  "black_10": "${colors.black_10 || ''}",
  "grey": "${colors.grey || ''}",
  "dark_viole": "${colors.dark_viole || ''}",
  "violet": "${colors.violet || ''}",
  "yellow": "${colors.yellow || ''}",
  "light_yellow": "${colors.light_yellow || ''}",
  "green": "${colors.green || ''}",
  "red": "${colors.red || ''}",
  "orange": "${colors.orange || ''}",
  "dark_orange": "${colors.dark_orange || ''}",
  "shadow_color": "${colors.shadow_color || ''}",
  "circle_icon_color": "${colors.circle_icon_color || ''}",
  "circle_icon_bg_color": "${colors.circle_icon_bg_color || ''}",
  "tab_active_color": "${colors.tab_active_color || ''}",
`
}


/**
 * @param {object} oldColors 
 * @param {object} figmaColors 
 * @returns New object formatted with oldColors same format but with new figma color variables
 */
export const getFormattedTheme = (oldColors, figmaColors) => {
  const newColors = JSON.parse(figmaColors);
  const colors = getOldVariables(JSON.parse(oldColors))

  console.log('newColors', newColors)
  let lastType = ''

  // TODO: THIS ONLY WORKS FOR STYLED DICTIONARY , CHECK OUR OWN TRANSFORM

  // const newMap = _.reduce(newColors, (prevToken, currentToken, index) => {
  //   const { attributes, name: tokenName, value: tokenValue } = currentToken || {};
  //   const name = JSON.stringify(tokenName);
  //   const value = JSON.stringify(tokenValue);

  //   // Give custom spaces and line breaks on the json
  //   const isLastRow = newColors.length - 1 === index;
  //   const isFirstRow = prevToken === '';
  //   const currentType = attributes.category === CATEGORIES.RADII ? CATEGORIES.RADII : attributes.type;
  //   const isDiffentType = lastType !== currentType;
  //   lastType = currentType;

  //   const rowEnd = isLastRow ? '' : ',\n';
  //   const rowStart = isDiffentType && !isFirstRow ? '\n' : '';

  //   return prevToken + `${rowStart}\t${name}: ${value}${rowEnd}`
  // }, '')

  return `{${colors}\n${newColors}\n}`
}


/** Register json custom format */
StyleDictionary.registerFormat({
  name: `customJson`,
  formatter: ({ dictionary, platform }) => {
    const rawOldColors = fs.readFileSync(`${platform.buildPath}colors.json`);
    const oldColors = getOldVariables(JSON.parse(rawOldColors))

    return getFormattedTheme(oldColors, dictionary.allTokens)
  }
});
