/**
 * An express server that can be used to serve the builded app.
 */
const express = require('express');
const paths = require('./paths');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(paths.buildPath));

app.get('/*', (request, response) => {
  response.sendFile(paths.buildIndexHtmlPath);
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
