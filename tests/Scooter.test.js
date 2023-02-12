const Scooter = require("../src/Scooter");
const User = require("../src/User");

//typeof scooter === object
describe("scooter object", () => {
  test("can create new scooter instance", () => {
    let user1 = new User({
      username: "Anabela",
      password: "thisIsIt",
      age: 75,
      loggedIn: true,
    });

    let scooter1 = new Scooter({
      station: "London Bridge",
    });

    expect(typeof scooter1).toBe("object");
    expect(scooter1).toHaveProperty("station", "London Bridge"); // test station
    expect(scooter1).toHaveProperty("user", null); //test user
    expect(scooter1).toHaveProperty("serial", 1); // test serial
    expect(scooter1).toHaveProperty("charge", 100); // test charge
    expect(typeof scooter1.isBroken).toBe("boolean");
    expect(scooter1.isBroken).toBe(false);
  });
  test("test next serial number", () => {
    let user1 = new User({
      username: "Anabela",
      password: "thisIsIt",
      age: 75,
      loggedIn: true,
    });

    let scooter2 = new Scooter({
      station: "Vauxhall Bridge",
    });
    expect(scooter2).toHaveProperty("serial", 2); // test next serial
  });
});

//Method tests
describe("scooter methods", () => {
  // tests here!
  //rent method
  //dock method
  //requestRepair method
  //charge method
});
