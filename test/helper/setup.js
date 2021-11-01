const { disconnect } = require("../../config/database");

const setup = () => {
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
