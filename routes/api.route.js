const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const express = require('express');
const path =  require("path")

const prisma = new PrismaClient()
const app = express();
//app.engine('html', require('ejs').renderFile);

const static_path = path.join(__dirname, "/../views")
app.use(express.static(static_path));
app.set("view engine", 'hbs');


router.get('/', async (req, res, next) => {
  //res.send({ message: 'Ok api is working 🚀' });
  console.log(static_path)
  //res.render("index");
});

router.get('/post', async (req, res, next) => {
  //res.send({ message: 'Ok api is working 🚀 post' });
  const details = await prisma.post.create({
    data : req.body,
  })
  res.json(details)
});

router.get('/getdetails', async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({})
    res.send(posts)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
