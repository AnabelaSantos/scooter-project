const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

// ScooterApp tests here
describe("scooterApp object", () => {
  test("can create new scooterApp instance", () => {
    let scooterApp1 = new ScooterApp();

    expect(typeof scooterApp1).toBe("object");
    expect(scooterApp1).toHaveProperty("stations", {
      station1: [],
      station2: [],
      station3: [],
    });
    expect(scooterApp1).toHaveProperty("registeredUsers", {});
  });
});
// register user
describe("registerUser method", () => {
  test("if the user is not already registered", () => {
    let scooterApp = new ScooterApp();
    let user1 = scooterApp.registerUser("Anabela", "thisIsIt", 75);
    expect(typeof user1).toBe("object");
    expect(user1).toHaveProperty("username", "Anabela"); // test username
    expect(user1).toHaveProperty("password", "thisIsIt");
    expect(user1).toHaveProperty("age", 75); // test age
    expect(scooterApp.registeredUsers).toHaveProperty("Anabela");
  });
  test("User has been registered Error", () => {
    let scooterApp = new ScooterApp();
    scooterApp.registerUser("Anabela", "thisIsIt", 75);

    function hasBeenRegistered() {
      scooterApp.registerUser("Anabela", "thisIsIt", 75);
    }
    expect(hasBeenRegistered).toThrow("already registered");
  });
  test("Too young to register Error", () => {
    let scooterApp = new ScooterApp();
    scooterApp.registerUser("Anabela", "thisIsIt", 75);

    function isTooYoung() {
      scooterApp.registerUser("Joao", "thisPass", 15);
    }
    expect(isTooYoung).toThrow("too young to register");
  });
});
// log in
describe("loginUser method", () => {
  test("if the user is located by name and test correct login", () => {
    let scooterApp = new ScooterApp();
    let user = scooterApp.registerUser("Anabela", "thisIsIt", 75);
    scooterApp.loginUser("Anabela", "thisIsIt");
    expect(user).toHaveProperty("loggedIn", true);
  });
  test("Username or password incorrect Error", () => {
    let scooterApp = new ScooterApp();
    scooterApp.registerUser("Anabela", "thisIsIt", 75);

    function userOrPassWrong() {
      scooterApp.loginUser("Anabela", "wrongPass");
    }
    expect(userOrPassWrong).toThrow("Username or password is incorrect");
  });

  // log out
  describe("logoutUser method", () => {
    test("if the user is located by name and test correct logout", () => {
      let scooterApp = new ScooterApp();
      let user = scooterApp.registerUser("Anabela", "thisIsIt", 75);
      scooterApp.logoutUser("Anabela");
      expect(user).toHaveProperty("loggedIn", false);
    });
    test("No such User is Logged In Error", () => {
      let scooterApp = new ScooterApp();
      scooterApp.registerUser("Anabela", "thisIsIt", 75);

      function notLoggedIn() {
        scooterApp.logoutUser("joao");
      }
      expect(notLoggedIn).toThrow("no such user is logged in");
    });
  });

  //create  Scooter method
  describe("createScooter method", () => {
    test("new scooter is created and added to station", () => {
      let scooterApp = new ScooterApp();
      let scooter = scooterApp.createScooter("station1");
      expect(typeof scooter).toBe("object");

      expect(scooter).toHaveProperty("station", "station1");
      expect(scooterApp.stations).toHaveProperty("station1", [scooter]);
    });
    test("No such Station Error", () => {
      let scooterApp = new ScooterApp();

      function noStation() {
        let scooter = scooterApp.createScooter("Good Street");
        expect(noStation).toThrow("no such station");
      }
    });
  });
  // rent scooter

  describe("Rent Scooter method", () => {
    test("Scooter is located and removed from station, rented to the user", () => {
      let scooterApp = new ScooterApp();
      let scooter = scooterApp.createScooter("station1");

      let user2 = new User({
        username: "Prince",
        password: "ofPersia",
        age: 57,
        loggedIn: true,
      });
      scooterApp.rentScooter(scooter, user2);

      expect(scooterApp.stations).toHaveProperty("station1", []);
      expect(scooter.user).toMatchObject(user2);
    });
    test("Scooter Already rented Error", () => {
      let scooterApp = new ScooterApp();
      let scooter = scooterApp.createScooter("station1");
      let user1 = new User({
        username: "Prince",
        password: "ofPersia",
        age: 57,
        loggedIn: true,
      });
      scooterApp.rentScooter(scooter, user1);
      function alreadyRented() {
        let user2 = new User({
          username: "Bob",
          password: "theBuilder",
          age: 79,
        });
        scooterApp.rentScooter(scooter, user2);
        expect(alreadyRented).toThrow("scooter already rented");
      }
    });
  });

  //   // dock scooter method
  //   describe("dock scooter method", () => {
  //     test("new scooter is docked added to station's scooter list", () => {
  //       let scooterApp = new ScooterApp();
  //       let scooter = scooterApp.createScooter("station1");

  //     });
  //     test("No such Station Error", () => {
  //       let scooterApp = new ScooterApp();

  //       function noStation() {
  //         let scooter = scooterApp.createScooter("Good Street");
  //         expect(noStation).toThrow("no such station");
  //       }
  //     });
  //   });
});
