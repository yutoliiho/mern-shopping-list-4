# mern-shopping-list-4
This is a boilarplate for client-server-mongoDB app

https://www.youtube.com/watch?v=PBTYxXADG_k&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE

npm init -y

dependencies:
\$ npm i express concurrently mongoose

dev dependencies:
\$ npm i nodemon --save-dev

<!-- touch server.js  -->

get the basics in...

<!-- package.json: -->

line 7:
"scripts": {
"client-install": "cd client && npm install",
"start": "node server.js",
"server": "nodemon server.js",
"client": "npm start --prefix client",
"dev": "concurrently \"npm run server\" \"npm run client\""
},

<!-- setup mongoDB backend: config/keys.js -->

go to mongoDB, get a sandbox, document credentials
config/keys.js:

module.exports = {
mongoURI:
'mongodb+srv://cryobeauty:9438666toYU@mern-shopping-list-8ocn7.mongodb.net/test?retryWrites=true&w=majority',
};

// acct: cryobeautysf@gmail.com
// code: 9438666toYU

<!-- setting up backend: server.js -->

the usual stuff..
load in express,
PORT,
app.listen,

DB config (const db = require('./config/keys').mongoURI),
connect DB (
mongoose.connect(db,
{
useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology: true,
useFindAndModify: false,
}
).then(dummy arrow func).catch(dummy arrow func))
// -----------------------------------
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/api/users')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(userRouter)

// DB config
const db = require('./config/keys').mongoURI;

// connect mongoDB
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

app.get('/', (req, res) => {
res.send([
{
name: 'Alexander Auchter',
age: 34,
},
{
name: 'TongTong',
age: 23,
},
]);
});

app.listen(PORT, () => {
console.log(`server is running on port ${PORT}`);
});

that is the end of the basic set up of react(default look) and server with mongoDB

<!-- ------------------------------------------------------------------------------------------------------------------------ -->

<!-- when using monsoose, we need 'models', its a modal of our datas: -->
<!-- models/Users.js -->

create models folder
create models/Items.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const ItemSchema = new Schema({
name: {
type: String,
required: true,
},
date: {
type: Date,
default: Date.now,
},
});

const Item = mongoose.model('item', ItemSchema);
module.exports = Item;

<!-- routes like app.get, app.post etc, other than putting it in server.js could go into their own file routes -->
<!-- routes/api/items.js -->

create routes/api/items.js
bring this file into server.js: const items = require('./routes/api/items')
// **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***
const express = require('express');
const router = express.Router();

const Users = require('../../models/Users');

router.get('/', (req, res) => {
Users.find()
.sort({
date: -1,
})
.then((users) => res.json(users));
});

module.exports = router;

server.js
// use route:
app.use(express.json());
app.use(userRouter);

now to see the result, we need postman:

<!-- --------------------------------------------------->
<!-- --------------------------------------------------->
<!--       over all look of server, route, models     -->

server.js: 【 server connect to route 】

const userRouter = require('./routes/api/users')

app.use(express.json())
app.use(userRouter)

router/api/users.js: 【 router connect to model 】
const express = require('express');
const router = express.Router();
const Users = require('../models/../Users')

router.get('/', (req, res) => {
Users.find()
.sort({
date: -1,
})
.then((users) => res.json(users));
});
module.exports = router;

models/Users.js: 【 models of a collection of DB 】
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
name: {
type: String,
required: true,
}
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;

<!-- --------------------------------------------------->
<!-- --------------------------------------------------->

<!-- postman -->

I have postman downloaded on my computer, if not, download it!!

open Postman: (testing if it's working: )
in a new page, use GET: http://localhost:5000/api/items send it. If you get a 200 OK status, and an empty [] that means it's working alright.
// it's empty is because there are currently nothing in the database.

<!-- create POST and DELETE enpoint (if postman is working correctly) -->

// POST api/items
router.post('/', (req, res) => {
// post a new item to the DB
const newItem = new Item({
name: req.body.name,
// date is automatically using defualt.
});
newItem.save().then((item) => res.json(item));
});

in postman header:
content-type: application/json
in postman body:
raw/json
{
"name": "lily"
}

then send it off you get:
{
"\_id": "5ea5fd51cb68c0043f8c2216",
"name": "lily",
"date": "2020-04-26T21:29:53.771Z",
"\_\_v": 0
}

// DELETE api/items
router.delete('/:id', (req, res) => {
Item.findById(req.params.id)
.then((item) => item.remove().then(() => res.json({ success: true })))
.catch((e) => {
res.status(404).json({ success: false });
});
});

till now back-end is completed....!!!

<!--               Back-end Completed                  -->
<!--               Back-end Completed                  -->
<!--               Back-end Completed                  -->
<!--               Back-end Completed                  -->
<!--               Back-end Completed                  -->
<!--               Back-end Completed                  -->
<!--               Back-end Completed                  -->
<!--               Back-end Completed                  -->
<!--               Back-end Completed                  -->
<!--               Back-end Completed                  -->

<!--               Front-end: react-app                 -->
<!--               Front-end: react-app                 -->
<!--               Front-end: react-app                 -->
<!--               Front-end: react-app                 -->
<!--               Front-end: react-app                 -->
<!--               Front-end: react-app                 -->
<!--               Front-end: react-app                 -->
<!--               Front-end: react-app                 -->
<!--               Front-end: react-app                 -->

\$ create-react-app client (this create the react app in a folder call client )

cd into client folder/package.json to add proxy: (~line 19 after script: )
"proxy": "http://localhost:5000/", // this the backend server.

go back to /mern-shopping-list-3/package.json add the following:

"scripts": {
"client-install": "cd client && npm install",
"start": "node server.js",
"server": "nodemon server.js",
"client": "npm start --prefix client",
"dev": "concurrently \"npm run server\" \"npm run client\""
},

\$npm run dev (to run server + client concurrently)

in /client/src,
delete logo.svg, index.css
delete content inside of App.css
delete referrence of App.css in index.js & App.js

<!--    reactstrap    ->
open a new terminal:
$ cd mern-shopping-list-3/client
$ npm install bootstrap reactstrap uuid react-transition-group

import { v4 as uuidv4 } from 'uuid';

请注意，新式的App.js是这样的：
function App() {
  return (
    <div className='App'>文字</div>
  );
}

之前的App.js （很多教程里都是老式的，也一样可以用）
class App extends Component {
    render(){
        return (
            <div className="App">文字</div>
        )
    }
}
**** 用老式的时候，记得代入{ Component } ****
import React, { Component } from 'react';

//////////////////////////////////////////

<!-- App.js -->

bootstrap:
import 'bootstrap/dist/css/bootstrap.min.css';
代入 <AppNavbar /> 和其他的 components 在 App.js 里边。

create components:
in src: create: components (folder), and AppNavbar.js file

<!-- src/components/AppNavbar.js -->

弄个 component 出来，记得链接进 App.js
这个 component 存在的意义和他的名字是一样的，这个 SPA 的
那个 navigation bar

create src/components/ShoppingList.js

<!-- src/components/ShoppingList.js -->

这个 component 是我们 App 的主题，购物清单。

<!-- src/components/ItemModals.js： （redux） -->

<!--            redux             -->
<!--            redux             -->
<!--            redux             -->
<!--            redux             -->
<!--            redux             -->
<!--            redux             -->
<!--            redux             -->
<!--            redux             -->
<!--            redux             -->
<!--            redux             -->
<!--            redux             -->
<!--            redux             -->
<!--            redux             -->
<!--            redux             -->

for interacting with our redux state...
\$ npm i redux react-redux redux-thunk
create store file: client/src/store.js (entray point for redux store)

<!-- ----------------------------------------------- -->

client/src/store.js:
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from "./reducers";

const initialState = {}
const middleware = [thunk];

const store = createStore(
rootReducer,
initialState,
compose(
applyMiddleware(...middleware),
window.**REDUX_DEVTOOLS_EXTENSION** && window.**REDUX_DEVTOOLS_EXTENSION**()
)
)
export default store;

<!-- ----------------------------------------------- -->

to bring redux into App.js, need import Provider
client/src/App.js

import { Provider } from 'react-redux';
import store from './store';

then everything needs to be wrapped in <Provider>:
<Provider store={store}>

<div>...</div>
</Provider>
<!-- ----------------------------------------------- -->
create reducers:
// client/src/reducers/index.js: for combining reducers. -->
import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

export default combineReducers({
item: itemReducer,
// auth: authReducer....
});

// client/src/reducers/itemReducer.js
// client/src/actions/types.js
export const GET_ITEMS = 'GET_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const ITEM_LOADING = 'ITEM_LOADING';
// client/src/actions/types.js
