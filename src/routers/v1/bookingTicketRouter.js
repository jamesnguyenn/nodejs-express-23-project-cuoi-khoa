const express = require('express');
const bookingTicketController = require('../../controllers/bookingTicketController');

const bookingTicket = express.Router();

bookingTicket.get('/getCinemaLists', bookingTicketController.getCinemaLists);
bookingTicket.post('/createShowTime', bookingTicketController.createShowTime);
bookingTicket.put('/orderTicket', bookingTicketController.bookingTicket);

module.exports = bookingTicket;
