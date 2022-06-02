const http = require('http');
const app =  require('./app');
const server =  http.createServer(app);

app.set('port',process.env.port);
server.listen(process.env.port || 3000);