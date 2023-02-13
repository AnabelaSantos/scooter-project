const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  // ScooterApp code here
  constructor() {
    this.stations = {
      station1: [],
      station2: [],
      station3: [],
    };

    this.registeredUsers = {};
  }
  //Register User method
  registerUser(username, password, age) {
    if (username in this.registeredUsers) {
      throw new Error("already registered");
    }
    if (age < 18) {
      throw new Error("too young to register");
    }
    let user = new User({
      username: username,
      password: password,
      age: age,
    });
    this.registeredUsers[username] = user;
    console.log("user has been registered");
    return user;
  }

  //loginUser method

  loginUser(username, password) {
    if (
      !username in this.registeredUsers ||
      password !== this.registeredUsers[username].password
    ) {
      throw new Error("Username or password is incorrect");
    }
    this.registeredUsers[username].login(password);
    console.log("user has been logged in");
  }

  //logoutUser method

  logoutUser(username) {
    if (!(username in this.registeredUsers)) {
      throw new Error("no such user is logged in");
    }
    this.registeredUsers[username].logout();
    console.log("user is logged out");
  }

  //Create Scooter method
  createScooter(station) {
    if (!station in this.stations) {
      throw new Error("no such station");
    }

    let scooter = new Scooter({
      station: station,
    });
    this.stations[station].push(scooter);
    console.log("created new scooter");
    return scooter;
  }

  //Rent Scooter method
  rentScooter(scooter, user) {
    if (scooter.user !== null) {
      throw new Error("scooter already rented");
    }
    let station = scooter.station;
    for (let i = 0; i < this.stations[station].length; i++) {
      let currentScooter = this.stations[station][i];
      if (scooter.serial === currentScooter.serial) {
        this.stations[station].splice(i, 1);
      }
    }
    scooter.user = user;

    console.log("scooter is rented");
  }

  // Dock Scooter method

  dockScooter(scooter, station) {
    if (scooter.station === station) {
      throw new Error("scooter already at station");
    }
    if (!(station in this.stations)) {
      throw new Error("no such station");
    }
    this.stations[station].push(scooter);
    scooter.station = station;

    console.log(`scooter #${scooter.serial} is docked`);
  }

  //print method
  print() {
    console.log(`List of registered users: ${registeredUsers}`);
    console.log("This is a list of Stations:");
    for (const station in this.stations) {
      console.log(`${station}: ${this.stations[station].length}`);
    }
  }
}

module.exports = ScooterApp;
