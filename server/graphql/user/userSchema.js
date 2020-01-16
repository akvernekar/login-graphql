const {GraphQLSchema,GraphQLObjectType,GraphQLList,GraphQLString,GraphQLInt} = require("graphql");
const Op = require('sequelize').Op
const User=require('../../models').User;
const {userType} =require('./userType');

var queryType= new GraphQLObjectType({
    name:"Query",
    fields:()=>({
        getAllUsersAndAdmin:{
            type: new GraphQLList(userType),
            resolve:async ()=>{
                return await User.findAll()
            }
        },
        getAllUsers:{
            type: new GraphQLList(userType),
            resolve:async ()=>{
                return await User.findAll({where:{role:'user'}})
            }
        },
        getUser:{
            type:userType,
            args:{
             email:{type:GraphQLString },
             id:{type:GraphQLInt}
            },
            resolve:async (args,params)=>{
                return await User.findOne({where:{
                    [Op.or]:[{id:params.id || null},{email:params.email || null}]
                }})
            }
        }
    })
});

var mutation =new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addUser:{
            type:userType,
            args:{
                username:{type:GraphQLString},
                email:{type:GraphQLString},
                mobile:{type:GraphQLString},
                role:{type:GraphQLString},
                password:{type:GraphQLString}
            },
            resolve:async (args,params)=>{
                    let user= await User.create(params)
                    return user;
            }
        },
        updateUser:{
            type:userType,
            args:{
                id:{type:GraphQLInt},
                username:{type:GraphQLString},
                email:{type:GraphQLString},
                mobile:{type:GraphQLString}
            },
            resolve:async(args,params)=>{
                let updated = await User.update(params,{where:{id:params.id}})
                if(updated.length===1){
                    let updatedUser= await User.findOne({where:{id:params.id}})
                    return updatedUser
                   }
            }
        }
    },
   
})

module.exports=new GraphQLSchema({
    query:queryType,
    mutation:mutation
});

