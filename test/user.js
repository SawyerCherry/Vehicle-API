require("dotenv").config();
const app = require("../server.js");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");

const User = require("../models/user.js");

const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

after((done) => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});
describe("User API Tests", () => {
  beforeEach((done) => {
    const newUser = new User({
      username: "newUser1",
      password: "password",
    });
    newUser.save().then(() => {
      done();
    });
  });

  it("Should get all users", (done) => {
    chai
      .request(app)
      .get("/users")
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res).to.have.status(200);
          expect(res.body.allUsers).to.be.an.an("array");
          done();
        }
      });
  });
});