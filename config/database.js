const {Client} =require('pg')
const connectionString='postgressql://postgres:akshay@localhost:5432/loginGraphql'

const client=new Client({connectionString})

const connectDb=()=>{
    client.connect()
    .then(()=>{
        console.log('connected to db')
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports=connectDb