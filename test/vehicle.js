require("dotenv").config();
const app = require("../server.js");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");

const User = require("../models/user.js");
const Vehicle = require("../models/vehicle.js");

const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

after((done) => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe("Vehicle API tests", () => {
  beforeEach((done) => {
    const user1 = new User({
      username: "user1",
      password: "pass",
    });
    const vehicle1 = new Vehicle({
      make: "ford",
      model: "f150",
      year: "2017",
      vin: "1FTF123445566",
    });

    user1
      .save()
      .then(() => {
        vehicle1.creator = user1;
        return newVehicle.save();
      })
      .then(() => {
        return User.findOne({ username: "user1" });
      })
      .then((user) => {
        user.vehicles.push(newVehicle);
        user.save();
        done();
      });
  });

  afterEach((done) => {
    User.deleteMany({ username: ["user1", "user2"] })
      .then(() => {
        Vehicle.deleteMany({ title: ["vehicle1", "vehicle2"] });
        done();
      })
      .catch((err) => {
        throw err.message;
      });
  });

  it("Should display all vehicles", (done) => {
    chai
      .request(app)
      .get("/all-vehicles")
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body.allVehicles).to.be.an("array");
        done();
      });
  });

  

  it("Should get chevrolet", (done) => {
    Vehicle.findOne({ make: "chevrolet" }).then((vehicle) => {
      chai
        .request(app)
        .get(`/vehicles/${vehicle._id}`)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.body.foundVehicle.make).to.equal("chevrolet");
          done();
        });
    });
  });

  it("Should update chevrolet make to dodge", (done) => {
    Vehicle.findOne({ make: "chevrolet" }).then((vehicle) => {
      chai
        .request(app)
        .put(`/vehicles/${vehicle._id}`)
        .send({
          make: "dodge",
          model: "ram 2500",
          year: "1998",
          vin: "1D20583HF123",
        })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.body.message).to.equal("Your vehicle was updated.");
          expect(res.body.title).to.be.equal("chevrolet -> dodge");
          done();
        });
    });
  });

  it("Should delete dodge", (done) => {
    Vehicle.findOne({ title: "dodge" }).then((vehicle) => {
      chai
        .request(app)
        .delete(`/vehicles/${vehicle._id}`)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.body.message).to.equal("Vehicle was deleted.");
          done();
        });
    });
  });
});