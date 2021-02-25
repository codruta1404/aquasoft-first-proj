const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const bodyParser = require('body-parser');
const prettyFormat = require('pretty-format');
const fs = require('fs');
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost/firstProj', {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
}).on('error', (error) => {
  console.log('error is:', error);
});

//Init app
const app = express();

app.use(bodyParser.json());

//Bring in models
let Message = require('./models/message');

//Home route
app.get('/', asyncHandler(async (req, res) => {
  const messages = await Message.find({})
      res.json(messages)
}))

app.get('/descending-date', async (req, res) => {
  const messages = await Message.aggregate([
    {"$sort": {"date": -1}}
  ])
  response = JSON.stringify(messages)
  res.send(response)

  const path = './descending-date.txt'
  try {
    if (fs.existsSync(path)) {

      //delete the actual content
      fs.truncate(path, 0, () => {console.log('Content file deleted!')})

      //add the new data
      fs.writeFile(path, response, (err) => {
        if (err) {
          return console.log(err)
        }
        console.log('I put the response in descending-date.txt file')
      })

    }
  } catch(err) {
    console.error('The file does not exist!')
  }
})

app.post('/post',  async (req, res) => {
  const message = new Message({
  users: req.body.users,
  date: new Date(),
  messages: req.body.messages
})
  const saved = await message.save()
  res.json(saved)
})

app.delete('/delete/:id', async (req, res) => {
  Message.findByIdAndRemove({_id: req.params.id}).then((deletedMessage) => {
    res.send(deletedMessage)
  })
})

app.put('/update/:id', async (req, res, next) => {
  Message.findByIdAndUpdate({_id:req.params.id}, req.body).then(() => {
    Message.findOne({_id:req.params.id}).then((updatedMessage) => {
      res.send(JSON.stringify(updatedMessage))
    })
  })
})

//Start server
app.listen(3000, () => {
  console.log('Server started on port 3000... ')
})
