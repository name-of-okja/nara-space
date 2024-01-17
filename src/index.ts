import app from './app';
import { databaseInit } from './data-source';
import { env } from './libs/common';

app.listen(env.port, async () => {
  databaseInit();
  console.log('Server Run http://localhost:' + env.port);
});
