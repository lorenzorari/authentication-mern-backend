const { connect, disconnect } = require("../../config/database");

const setup = () => {
  before((done) => {
    try {
      connect();
      done();
    } catch (err) {
      done(err);
    }
  });

  after((done) => {
    try {
      disconnect();
      done();
    } catch (err) {
      done(err);
    }
  });
};

module.exports = setup;
