const express = require('express');
const views = require('./views');
const layout = require('./views/layout.js')
const app = express();
const { db, User, Page } = require('./models');



const wikiRouter = require('./routes/wiki.js')
const usersRouter = require('./routes/users.js')


//has to be top, everything goes through here
app.use(express.static('./public'));
app.use(express.urlencoded({extended:false}));


//middleware
app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);

//redirect from main to /wiki
app.get('/', (req, res)=>{
  res.redirect('/wiki')
})






// app.get('/', function (req, res) {
//     res.send(layout('hello world'))
// });



db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

async function init() {
    await User.sync();
    await Page.sync();
    app.listen(1337);
}

init();
