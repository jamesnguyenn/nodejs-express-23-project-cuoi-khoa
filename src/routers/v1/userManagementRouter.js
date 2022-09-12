const express = require('express');

const userManagementController = require('../../controllers/userManagementController');

const userManagement = express.Router();

userManagement.get('/getRoleLists', userManagementController.getRoleLists);
userManagement.get('/getUserLists', userManagementController.getUserLists);
userManagement.get(
    '/getUserListsPagination',
    userManagementController.getUserListsPagination
);
userManagement.post('/register', userManagementController.register);
userManagement.post('/login', userManagementController.login);

userManagement.post('/checkToken', userManagementController.checkTokenRoute);
userManagement.put('/editUser', userManagementController.editUser);
userManagement.delete('/removeUser', userManagementController.removeUser);

module.exports = userManagement;
