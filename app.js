var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Book = require('./Book.model');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var port = 3000;
var db = 'mongodb://localhost:27017/bookDB';
mongoose.connect(db, {useNewUrlParser: true}, function(err) {
    if (err) {
        console.log('Error occured on connecting to DB!')
    } else {
        console.log('Connected! Start server...')
    }
});

// home root
app.get('/', function(req, res) {
    res.send('happy to be here!');
});

// get book by id
app.get('/books/:id', function(req, res) {
    Book.findById({_id: req.params.id})
        .exec(function(err, book) {
            if (err) {
                console.log('error has occured');
            } else {
                return res.status(200).json(book);
            }
        });
});

// get all the books
app.get('/books', function(req, res) {
    Book.find({})
        .exec(function(err, books) {
            if (err) {
                return res.status(401);
            } else {
                return res.status(200).json(books);
            }
        });
});

app.post('/books', function(req, res) {
    // oneway
    var aBook = new Book();
    aBook.title = req.body.title;
    aBook.author = req.body.author;
    aBook.category = req.body.category;
    console.log(aBook);

    aBook.save(function(err, savedBook) {
        if (err) {
            return res.send('error saving book');
        } else {
            return res.send(savedBook);
        }
    });
});

app.listen(port, function() {
    console.log('Server running on port '+port);
})