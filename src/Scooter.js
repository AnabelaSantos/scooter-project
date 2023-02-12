class Scooter {
  // Stactic initialization block
  static nextSerial = 1;

  // scooter code here
  constructor({ station }) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }

  // Scooter method rent

  rent() {
    if (this.charge > 20 && this.isBroken === false) {
      this.station = null;
    }
    if (this.charge <= 20) {
      throw new Error("scooter needs to charge");
    }
    if (this.isBroken) {
      throw new Error("scooter needs repair");
    }
  }
  // Scooter method dock
  dock(station) {
    this.station = station;
  }

  // Scooter method recharge
  incrementCharge() {
    this.charge += 10;
    if (this.charge > 100) {
      this.charge = 100;
    }
    console.log(this.incrementCharge);
  }
  async charge() {
    console.log("Starting charge");

    await new Promise((resolve) => setInterval(resolve, incrementCharge, 500));
    this.charge = 100;

    console.log("Charge complete");
  }

  //Scooter method request repair
  async isBroken() {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // wait 5 seconds
    this.isBroken = false;

    console.log("repair completed");
  }
}

module.exports = Scooter;
