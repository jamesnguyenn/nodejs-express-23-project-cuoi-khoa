const express = require('express');
const protectedRouteApi = require('../middlewares/protectRouteApi');
const { checkToken } = require('../ulti/auth');
const rootRouter = express.Router();

const bookingTicket = require('./v1/bookingTicketRouter');
const movieManagement = require('./v1/movieManagementRouter');
const userManagement = require('./v1/userManagementRouter');

rootRouter.use('/bookingTicket/v1',protectedRouteApi, bookingTicket);
rootRouter.use('/userManagement/v1', userManagement);
rootRouter.use('/movieManagement/v1',protectedRouteApi, movieManagement)

module.exports = rootRouter;
