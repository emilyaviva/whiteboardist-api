import 'dotenv/config';
import models, { sequelize } from './models';

import app from './app/index.js';

const { PORT } = process.env;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Express server listening on port ${PORT}.`);
    });
  })
  .catch((error) => {
    console.error(`Could not start the server: ${error}`);
  });
