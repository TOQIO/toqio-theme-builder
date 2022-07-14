import StyleDictionary from 'style-dictionary'

import { CATEGORIES } from './constants.js'


/**
 * @param {string} name 
 * @returns Transformed variable name, replacing "-" with "_"
 */
const transformVariableName = (name = '') => {
  return name.split('-').join('_');
}



/** Transform color name */
StyleDictionary.registerTransform({
  name: 'web/color_name',
  type: 'name',
  matcher: ({ attributes }) => attributes.category === CATEGORIES.COLOR,
  transformer: ({ name }) => {
    const colorName = name.replace(`${CATEGORIES.COLOR}-`, '') || '';
    const customName = colorName.replace(`${CATEGORIES.PLACEHOLDERS}-`, '');

    return transformVariableName(customName)
  }
})

/** Transform color value */
StyleDictionary.registerTransform({
  name: 'web/color_value',
  type: 'value',
  matcher: ({ attributes }) => attributes.category === CATEGORIES.COLOR,
  transformer: ({ value }) => value,
})

/** Transform radius name */
StyleDictionary.registerTransform({
  name: 'web/radius_name',
  type: 'name',
  matcher: ({ attributes }) => attributes.category === CATEGORIES.RADII,
  transformer: ({ name }) => transformVariableName(name)
})

/** Transform radius value */
StyleDictionary.registerTransform({
  name: 'web/radius_value',
  type: 'value',
  matcher: (token) => token.attributes.category === CATEGORIES.RADII,
  transformer: ({ value }) => {
    // Return one cause the 4 corners would apply same on our components-library elements
    return `${value.topLeft}`
  }
})

/** Register transformations */
StyleDictionary.registerTransformGroup({
  name: 'customTheme/web',
  transforms: StyleDictionary.transformGroup['web'].concat([
    'web/color_name',
    'web/color_value',
    'web/radius_name',
    'web/radius_value'
  ])
})