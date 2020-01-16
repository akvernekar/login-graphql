const express = require('express')
const graphqlHTTP = require('express-graphql')
const connectDb = require('./config/database')
const userSchema = require('./server/graphql/user/userSchema')
const cors = require('cors')
// const User=require('./server/models').User
const app=express()
const port=4025;

app.use(cors())

connectDb()

app.use('/graphql',graphqlHTTP({
    schema:userSchema,
    graphiql:true
}));

// User.create({
//     username:'akshay1',
//     email:"akshay56781@gmail.com",
//         mobile:"9999999919",
//     password:"9999999999" 
// })
// .then(user=>{
//     console.log('sucess')
// })


app.listen(port,()=>{
    console.log('connected to port',port)
})
