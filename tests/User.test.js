const User = require("../src/User");

// User tests here
describe("User class integrity checks", () => {
  test("can create new user instance", () => {
    let user1 = new User({
      username: "Anabela",
      password: "thisIsIt",
      age: "75",
      loggedIn: true,
    });
    expect(typeof user1).toBe("object");
    expect(user1).toHaveProperty("username", "Anabela"); // test username
    expect(user1).toHaveProperty("password", "thisIsIt");
    expect(user1).toHaveProperty("age", "75"); // test age
  });
  //test loogedIn status
  test("Have LoggedIn status", () => {
    let user2 = new User({
      username: "Prince",
      password: "ofPersia",
      age: "15",
      loggedIn: false,
    });
    expect(typeof user2.loggedIn).toBe("boolean");
    expect(user2.loggedIn).toBe(false);
  });
  test("");
});

// test login

// test logout
