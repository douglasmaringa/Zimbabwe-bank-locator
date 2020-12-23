const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
let port = process.env.PORT || 3000;
let Bank = require('./bank.model')

const bankRoutes = express.Router()

app.use(cors());
app.use(bodyParser.json())
app.use('/bank', bankRoutes)

// getting-started.js
//mongodb+srv://<username>:<password>@cluster0.oxngv.mongodb.net/<dbname>?retryWrites=true&w=majority

const connection_url = 'mongodb+srv://douglas2:pass@cluster0-oxngv.mongodb.net/bank?retryWrites=true&w=majority'

mongoose.connect(connection_url, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("the bluetooth device is connected successfully")
});
//Routes


//Get all
bankRoutes.route('/').get(function(req, res) {
    Bank.find(function(err, banks) {
        if (err) {
            console.log(err)
        } else {
            res.json(banks)
        }
    })
})
//post
bankRoutes.route('/add').post(function(req, res) {
    let bank = new Bank(req.body)
    bank.save()
        .then(bank => {
            res.status(200).json({'bank': 'todo added successfully'})
        })
        .catch(err => {
            res.status(400).send('adding new bank failed')
        })
})
//working search
bankRoutes.route('/search').post(function(req, res) {
    const query = Bank.find(req.body);
  //find by one gets 1 item the find gets all items
  // selecting the `name` and `surname and school` fields
  query.select('name  location time days');
  
  // execute the query at a later time
  query.exec(function (err, bank) {
    if (err) return handleError(err);
    
     res.json(bank)
  });
  
})
 
 



app.listen(port, function() {
    console.log("Server is running on Port: " + port)
})
