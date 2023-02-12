class User {
  // User code here

  constructor({ username, password, age }) {
    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false; //the loggedIn is a property and is just initialized to false
  }

  //the methods are assigned to properties in the object because they're in a constructor, not an object literal

  login = function (password) {
    if (this.password === password) {
      this.loggedIn = true;
    } else {
      this.logout();
      throw new Error("incorrect password");
    }
  };
  logout = function () {
    this.loggedIn = false;
  };
}

module.exports = User;
