const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://tdiazpiedra:VdpKBsp6FQQkrNpv@fooddelivery.nyrstpp.mongodb.net/FoodDelivery?retryWrites=true&w=majority&appName=AtlasApp";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(async err => {
  if (err) {
    console.error("Failed to connect:", err);
    return;
  }

  const collection = client.db("FoodDelivery").collection("users");
  
  // Add the locationAccess field to all users
  const result = await collection.updateMany(
    {},
    { $set: { "locationAccess": false } }
  );

  console.log(`Updated ${result.modifiedCount} documents.`);
  
  client.close();
});
