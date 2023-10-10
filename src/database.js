const mongoose = require('mongoose');
const functions = require('firebase-functions');

let instance = null;

class Database {
  constructor() {
    if (!instance) {
      instance = this;
      this.connect();
    }
    return instance;
  }

  async connect() {
    try {
      await mongoose.connect("mongodb+srv://tdiazpiedra:VdpKBsp6FQQkrNpv@fooddelivery.nyrstpp.mongodb.net/FoodDelivery?retryWrites=true&w=majority&appName=AtlasApp", { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  }
}

module.exports = new Database();
