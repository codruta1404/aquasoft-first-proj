let mongoose = require('mongoose');

//Message Schema
let messageSchema = mongoose.Schema({
  users: [
    {
      name: String,
      email: String,
      phone: String,
    },
  ],
  date: Date,
  messages: [
    {
      date: Date,
      sender: String,
      receiver: String,
      message_content: String,
    },
  ],
})

let Message = module.exports = mongoose.model('Message', messageSchema);
