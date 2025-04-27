const express = require('express');
const {ServerConfig} = require('./config');
const {rateLimit} = require('express-rate-limit')
const apiRoutes  = require('./routers');
const {createProxyMiddleware} = require('http-proxy-middleware') 

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 30, // Limit each IP to 23 requests per `window` (here, per 2 minutes).

})


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))


app.use(limiter)
console.log(ServerConfig.BOOKING_PROXY)
app.use('/flightService',  createProxyMiddleware({target : ServerConfig.FLIGHT_PROXY , changeOrigin : true ,pathRewrite : {'^/flightService' : '/'}}))
app.use('/bookingService', createProxyMiddleware({target : ServerConfig.BOOKING_PROXY , changeOrigin : true ,pathRewrite : {'^/bookingService' : '/'}}))
app.use('/api' , apiRoutes);


app.listen(ServerConfig.PORT , () => {
    console.log(`Successfully server run at PORt at : ${ServerConfig.PORT}`);
});

