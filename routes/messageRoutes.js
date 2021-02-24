import express from 'express'
const router = express.Router()

//Home route
app.get('/', (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(messages))
    }
  });
});


app.post('/', (req, res) => {
  Message.create({}, (err, messages) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(messages))
    }
  });
});

export default router
