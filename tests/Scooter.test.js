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
  test("if the scooter is charged above 20 and it's not broken", () => {
    let scooter3 = new Scooter({
      station: "London Eye",
    });
    scooter3.charge = 25;
    expect(scooter3.charge).toBeGreaterThan(20);
    scooter3.isBroken = false;
    expect(scooter3.isBroken).toBe(false);
  });

  test("check it out to user", () => {
    let user1 = new User({
      username: "Anabela",
      password: "thisIsIt",
      age: 75,
      loggedIn: true,
    });

    let scooter4 = new Scooter({
      station: "British Museum",
    });
    scooter4.charge = 50;
    scooter4.isBroken = false;
    scooter4.user = user1;
    expect(scooter4.user).toBe(user1);
  });
  // test error messages
  test("scooter needs to charge", () => {
    let scooter5 = new Scooter({
      station: "Station5",
    });
    scooter5.charge = 10;
    scooter5.isBroken = false;
    function needsCharge() {
      scooter5.rent();
    }
    expect(needsCharge).toThrow("scooter needs to charge");
  });
  test("scooter needs repair", () => {
    let scooter6 = new Scooter({
      station: "Station6",
    });
    scooter6.charge = 50;
    scooter6.isBroken = true;
    function needsRepair() {
      scooter6.rent();
    }
    expect(needsRepair).toThrow("scooter needs repair");
  });
  //dock method
  test("dock scooter to station", () => {
    let scooter = new Scooter("station7");
    scooter.rent();
    scooter.dock("station8");
    expect(scooter).toHaveProperty("station", "station8");
  });
  //charge method
  test("charge", async () => {
    const scooter = new Scooter("station9");
    await scooter.charge; // we need to wait for the charge!
    expect(scooter.charge).toBe(100);
  });
  //requestRepair method
  test("repair", async () => {
    const scooter = new Scooter("station9");
    await scooter.isBroken; // we need to wait for the charge!
    expect(scooter.isBroken).toBe(false);
  });
});
