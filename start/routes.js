//npm packages
const express = require('express');

//routes
const adminRoutes = require('../routes/admin.routes');
const studentRoutes = require('../routes/student.routes');

module.exports = function (app) {
  app.use(express.json());

  app.use('/api/admin', adminRoutes);
  app.use('/api/student', studentRoutes);

  app.use((req, res, next) => {
    const error = new Error('INVALID ROUTE');
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.status(error.status).json({
      message: error.message,
    });
  });
};
