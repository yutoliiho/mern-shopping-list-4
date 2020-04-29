const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/api/users');

const app = express();
const PORT = process.env.PORT || 5000;

// use route:
app.use(express.json());
app.use(userRouter);

// DB config:
const db = require('./config/keys').mongoURI;

// connect DB:
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => console.log(err));

// app.get('/', (req, res) => {
//   res.json([
//     {
//       name: 'Alexander Auchter',
//       age: 34,
//     },
//     {
//       name: 'TongTong',
//       age: 23,
//     },
//   ]);
// });

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
