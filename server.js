const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Article = require('./models/article')
const articleRouter = require('./routes/articles');

mongoose.connect('mongodb://localhost/blog')

app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended:false }))
app.use(methodOverride('_method'))



app.get('/', async (req,res) => {
    const articles = await Article.find().sort({time: 'desc'})
    res.render('articles/index', { articles:articles })
})

app.use('/articles', articleRouter);
app.listen(3000)