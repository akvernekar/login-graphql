import React from 'react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo' 
import ApolloClient from 'apollo-boost'

const client=new ApolloClient({
    uri:'http://localhost:4025/graphql',
    onError: (e) => { console.log('hgh',e) }
   
  })

const singleUser=gql`
    query($id:Int){
       getUser(id:$id){
        username
        email
        mobile
    }
}
`;

const updateUserMutation=gql`
mutation($id:Int!,$username:String!,$email:String!,$mobile:String!){
    updateUser(id:$id,username:$username,email:$email,mobile:$mobile){
        username
    }
}
`


class EditUser extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            email:'',
            mobile:''
        }

    }

componentDidMount=()=>{
    const id =parseInt(this.props.match.params.id);
    // console.log(this.props.client)
    // const client=client
    client.query({
        query:singleUser,
        variables:{id:id}
    })
    .then(user=>{
        const data=user.data.getUser
        console.log(user.data.getUser)
        if(user.data.getUser!=null){
          this.setState({
              username:data.username,
              email:data.email,
              mobile:data.mobile
          })  
        }
    })
    

}

handle=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
}

submit=(e)=>{
    e.preventDefault()
    const id =parseInt(this.props.match.params.id)
    // const client=client
    console.log(client)
    client.mutate({
        mutation:updateUserMutation,
        variables:{
            id:id,
            username:this.state.username,
            email:this.state.email,
            mobile:this.state.mobile
        }
    })
    .then(updated=>{
        this.props.history.push('/users')
    })

}


render(){
    // const userData=(localStorage.getItem('user2')!=null && JSON.parse(localStorage.getItem('user2')).role)
    return (
        
        <div className="container">
        <div className='form-group'>
            <h4>Edit user</h4>
            <form onSubmit={this.submit}>
           <label>Username<input className="form-control" type='text' value={this.state.username} name='username' onChange={this.handle} required/></label> 
           <br/>
           <label>Email<input className="form-control" type='email' value={this.state.email} name='email' onChange={this.handle} required/></label>
           <br/>
           <label>Mobile<input className="form-control" type='text' value={this.state.mobile} name='mobile' onChange={this.handle} minLength='10' maxLength='10' pattern="[9]{1}[0-9]{9}" placeholder='9*********' required/></label>
           <br/>
           <button type='submit' className="btn btn-success">save</button>
           </form>
        </div>
        </div>
        )
}

}

export default graphql(singleUser,updateUserMutation)(EditUser)