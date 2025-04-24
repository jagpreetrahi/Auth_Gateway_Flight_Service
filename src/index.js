const express = require('express');
const {ServerConfig} = require('./config');

const apiRoutes  = require('./routers'); 

const app = express();

app.use('/api' , apiRoutes);


app.listen(ServerConfig.PORT , () => {
    console.log(`Successfully server run at PORt at : ${ServerConfig.PORT}`);
});

