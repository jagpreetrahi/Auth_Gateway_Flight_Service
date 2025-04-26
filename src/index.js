const express = require('express');
const {ServerConfig} = require('./config');
const {rateLimit} = require('express-rate-limit')
const apiRoutes  = require('./routers'); 

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 3, // Limit each IP to 23 requests per `window` (here, per 2 minutes).

})
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use(limiter)

app.use('/api' , apiRoutes);


app.listen(ServerConfig.PORT , () => {
    console.log(`Successfully server run at PORt at : ${ServerConfig.PORT}`);
});

