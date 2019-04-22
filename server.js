const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/** Alternative method to connect mongo Atlas
// DB config
const MongoClient = require('mongodb').MongoClient;
const uri = require('./config/keys').mongoURI;
const client = new MongoClient(uri, { useNewUrlParser: true });

// Connect to MongoDB
client.connect()
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))
 */

const connectionString = require('./config/keys').mongoURI;
mongoose.connect(connectionString, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!!'))

// Use Routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is running on port ${port}`))