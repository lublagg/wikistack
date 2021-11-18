const express = require('express');
const router = express.Router();

const addPage = require('../views/addPage.js')

const { Page } = require('../models')

//mounted on /wiki

//routes mounted on a router

router.get('/', (req, res, next)=>{
  // try{

  res.send('ello');
  // } catch(error){
  //   next(error)
  // }

})

router.post('/', async (req, res, next)=>{
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.pageStatus
    });
    page.save();

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect('/');
  } catch (error) {
    next(error)
  }
})



router.get('/add',(req, res, next)=>{
  res.send(addPage())
})

router.get('/:slug', (req, res, next) => {
  res.send(`hit dynamic route at ${req.params.slug}`);
});


module.exports = router;

