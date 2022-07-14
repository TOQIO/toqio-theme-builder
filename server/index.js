import express from 'express';
import cors from 'cors';
import path from 'path'

import { buildFormattedTheme, buildStyleDictionaryTheme } from './builders/index.js'

// TODO: remove this paths and add needed param for this
export const __dirname = '/Users/maiderhernandorena/Desktop/'
export const CUSTOMER_PATH = `${__dirname}development/repos/lum-web/src/styles/theme/lum`
export const FILE_PATH = `${CUSTOMER_PATH}/colors.json`


/** CONFIGURATION */

const PORT = process.env.PORT || 3001;
const app = express();

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json())


/** API */

app.post("/transform-file", ({ body }, res) => {
  const filePath = path.join(__dirname, body.file.path)
  const response = buildFormattedTheme(filePath, FILE_PATH)

  return res.json({ message: "Transformed and replaced file.", response });
});

app.post("/build-file", ({ body }, res) => {
  const filePath = path.join(__dirname, body.file.path)
  const response = buildStyleDictionaryTheme(filePath, CUSTOMER_PATH)

  return res.json({ message: "Builded and replaced file with styled-dictionary.", response });
});


/** LISTENER */

app.listen(PORT, () => {
  console.log(`Theme builder server listening on port: ${PORT}`);
});