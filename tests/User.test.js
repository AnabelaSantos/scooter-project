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
});
//test loogedIn status
describe("User class looged status", () => {
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
  // test login
  test("If password is correct, logs the user in", () => {
    let user3 = new User({
      username: "Bob",
      password: "theBuilder",
      age: 79,
    });
    user3.login("theBuilder");
    expect(user3.password).toBe("theBuilder");
    expect(user3.loggedIn).toBe(true);
  });

  // test logout
  test("If password is incorrect, throw error", () => {
    let user4 = new User({
      username: "Bob",
      password: "theBuilder",
      age: 79,
    });
    function incorrectPassword() {
      user4.login("wrongPassword");
    }
    expect(incorrectPassword).toThrow(Error);
  });
});
