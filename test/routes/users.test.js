const request = require("supertest");
const setup = require("../helper/setup");
const app = require("../../app");
const { expect } = require("chai");
const bcrypt = require("bcryptjs");
const User = require("../../model/user");

describe("/register => create user", () => {
  const endpoint = "/api/users/register";
  const email = "test@test.com";

  setup();

  beforeEach((done) => {
    User.deleteOne({ email })
      .then(() => done())
      .catch((err) => done(err));
  });

  it("should create a user with encrypted password", (done) => {
    const user = {
      firstName: "test",
      lastName: "test",
      email,
      password: "test",
    };

    request(app)
      .post(endpoint)
      .send(user)
      .then(async (res) => {
        const isPasswordCorrect = await bcrypt.compare(
          user.password,
          res.body.password
        );

        expect("Content-Type", "/json/");
        expect(isPasswordCorrect).to.be.true;
        expect(res.statusCode).to.equal(201);
        done();
      })
      .catch((err) => done(err));
  });

  it("shouldn't create a user without an email", (done) => {
    const user = {
      firstName: "test",
      lastName: "test",
      password: "test",
    };

    request(app)
      .post(endpoint)
      .send(user)
      .then((res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.error.text).to.equal("Email and password are required");
        done();
      })
      .catch((err) => done(err));
  });

  it("shouldn't create a user without a password", (done) => {
    const user = {
      firstName: "test",
      lastName: "test",
      email,
    };

    request(app)
      .post(endpoint)
      .send(user)
      .then((res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.error.text).to.equal("Email and password are required");
        done();
      })
      .catch((err) => done(err));
  });

  it("should create a user without firstname and lastname", (done) => {
    const user = {
      email,
      password: "test",
    };

    request(app)
      .post(endpoint)
      .send(user)
      .then((res) => {
        expect(res.statusCode).to.equal(201);
        done();
      })
      .catch((err) => done(err));
  });
});
