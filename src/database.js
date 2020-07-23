const mongoose = require('mongoose')

const URI = 'mongodb+srv://cristina:asdf1234@cursito.ank6a.mongodb.net/cursito?retryWrites=true&w=majority'
mongoose.connect(URI, { useUnifiedTopology: true })
    .then(db => console.log('la bd esta conectada'))
    .catch(err => console.error(err))

module.exports = mongoose

/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://cristina:<password>@cursito.ank6a.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/
