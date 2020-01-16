import React from 'react'
import {Link} from 'react-router-dom'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo' 



const addUserMutation=gql`
mutation($username:String!,$email:String!,$mobile:String!,$password:String!,$role:String!){
    addUser(username:$username,email:$email,mobile:$mobile,password:$password,role:$role){
        username
    }     
}
`;

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            email:'',
            mobile:'',
            password:'',
            role:'user'
        }
    }

    componentDidMount=()=>{
        console.log("error=-=",this.props.client)
        console.log(this.props)
    }
    handle=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submit=(e)=>{
        e.preventDefault()
       console.log(this.state)
        const client = this.props.client;
        console.log(client)
        client.mutate({
            mutation:addUserMutation,
            variables:this.state
        })
        .then(user=>{
            console.log('a',user)
            window.location.href='/'
        })
        .catch(err=>{
            alert(err)
        })
        
    
    }

    render(){
        console.log(this.state)
        return (<div>
            <br/>
            <div className='container'>
                <h2>Register</h2>
                <form onSubmit={this.submit}>
                <div className="form-group">
                <label>Username<input className="form-control " type='text' value={this.state.username} name='username' onChange={this.handle} required/></label>
                <br/>
                <label>Email<input className="form-control" type='email' value={this.state.email} name='email' onChange={this.handle} required/></label>
                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                
                <label>Mobile<input className="form-control" type="text" value={this.state.mobile} name='mobile' onChange={this.handle} minLength='10' maxLength='10' pattern="[9]{1}[0-9]{9}" required placeholder='9*********'/></label>
                <br/>
                <label>Password<input className="form-control" type='password' value={this.state.password} onChange={this.handle} name='password' required/></label>
                <br/>
                Role- <input type='radio' name='role' value='admin' onChange={()=>this.setState({role:'admin'})}/> admin <input type='radio' name='role' value='user' onChange={()=>this.setState({role:'user'})} checked="checked"/> user
                <br/>
                <button className="btn btn-primary" type='submit'>Register</button>
                </div>
                </form>
                <small className="form-text text-muted"> <p>have an account?<Link to='/'> sign in</Link></p></small>
            </div>
            </div>  )
    }
}

export default graphql(addUserMutation)(Register);