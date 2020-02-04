const mongoose = require('mongoose');

const user = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   CLIENTID: {type: String, required: true},
   CLIENTSECRET: {type: String, required: true},
   MBAGEN: {type: String, required: true},
   MBDESN: {type: String, required: true},
   MBHTEL: {type: String, required: true}
});

module.exports = mongoose.model('User', user);

