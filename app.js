const express = require('express');
const views = require('./views');
const layout = require('./views/layout.js')
const app = express();
const { db, User, Page } = require('./models');

app.use(express.static('./public'));
app.use(express.urlencoded({extended:false}));

app.get('/', function (req, res) {
    res.send(layout('hello world'))
});

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
