const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const user = require('./user.route');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/customer',{ useUnifiedTopology: true , useNewUrlParser: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

const PORT = 2000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/checking', function(req, res){
   res.json({
      "Tutorial": "Welcome to the Node express JWT Tutorial"
   });
});

app.use('/user.route', user);

app.listen(PORT, function(){
   console.log('Server is running on Port',PORT);
});