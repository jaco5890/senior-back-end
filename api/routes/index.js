module.exports = (app) => {
    app.use('/employees', require('./employees'));
  };
  