const {GraphQLObjectType,GraphQLInt,GraphQLString}=require("graphql");


var userType=new GraphQLObjectType({
    name:"users",
    fields:()=>{
        return{
            id:{type:GraphQLInt},
            username:{type:GraphQLString},
            email:{type:GraphQLString},
            mobile:{type:GraphQLString},
            role:{type:GraphQLString},
            password:{type:GraphQLString}
        }
    }
});

module.exports={userType};