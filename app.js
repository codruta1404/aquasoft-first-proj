const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const router = express.Router();

mongoose.connect('mongodb://localhost/firstProj', {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
}).on('error', (error) => {
  console.log('error is:', error);
});

//Init app
const app = express();

//Bring in models
let Message = require('./models/message');

//Home route
app.get('/', asyncHandler(async (req, res) => {
  const messages = await Message.find({})
      res.send(JSON.stringify(messages))
}));

app.post('/', (req, res) => {
  const message = new Message({
  users: [
    {
      name: req.body.name,
      email:req.body.email ,
      phone: req.body.phone
    }
  ],
  date: new Date(),
  messages: [
    {
      date:  new Date(),
      sender:  req.body.sender,
      receiver:  req.body.receiver,
      message_content: req.body.message_content
    }
  ]
})
  Message.create(
    message, (err, response) => {
      if(err) {
        console.log(err)
      } else {
        res.json(response)
      }
    }
  )
})

// app.post('/', async (req, res) => {
//     const message = new Message({
//         ...req.body
//     })
//     try {
//         const newMessage = await message.save()
//         res.json(newMessage)
//     }
//     catch (err) {
//         res.json({ message: err })
//     }
// })

// app.post("/", (req, res) => {
//   const message = new Message({
//   users: [
//     {
//       name: req.body.name,
//       email:req.body.email ,
//       phone: req.body.phone
//     }
//   ],
//   date: new Date(),
//   messages: [
//     {
//       date:  new Date(),
//       sender:  req.body.sender,
//       receiver:  req.body.receiver,
//       message_content: req.body.message_content
//     }
//   ]
//
//   });
//   message.save().then(() => res.json("Your message was added"))
//   .catch((err) => res.status(400).json("Error: " + err));
// });
//

//Start server
app.listen(3000, () => {
  console.log('Server started on port 3000... ')
})
