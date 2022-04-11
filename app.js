const express = require('express')
const app = express()
const router = express.Router()
require('dotenv').config()
const bodyParser = require('body-parser')
// import dotenv from 'dotenv'
// dotenv.config()
const PORT = process.env.PORT

app.use(bodyParser.json({extended: true})); //사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어
app.use(bodyParser.urlencoded({extended: true})); //json이 아닌 post형식으로올때 파서

const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/todo-demo", {
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.use(express.json())

app.use(express.static("./client"))

const postRouter = require('./routes/Post')
app.use("/posts", postRouter)
const commentRouter = require('./routes/Comment')
app.use("/comments", commentRouter)

// 404
app.get('*', (req,res) => {
	res.send('404 Not Found');
});


app.listen(PORT, () => {
  console.log(`port on ${PORT}`)
})

