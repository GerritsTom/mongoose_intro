var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Book = require('./Book.model');

var app = express();

var port = 8080;
var db = 'mongodb://localhost:27017/bookDB';
mongoose.connect(db, {useNewUrlParser: true}, function(err) {
    if (err) {
        console.log('Error occured on connecting to DB!')
    } else {
        console.log('Connected! Start server...')
    }
});

app.get('/', function(req, res) {
    res.send('happy to be here!');
});

app.get('/books', function(req, res) {
    Book.find({})
        .exec(function(err, books) {
            if (err) {
                console.log('error has occured');
            } else {
                res.status(200).json(books);
            }
        });
});


app.listen(port, function() {
    console.log('Server running on port '+port);
})