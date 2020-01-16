import React from 'react'
import {Link} from 'react-router-dom'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'
import {useQuery} from '@apollo/react-hooks'

 const getUser=gql`
 query($email:String){
     getUser(email:$email){
        email
        id
        role
     }
 }
 `;

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
    }
    componentDidMount=()=>{
        console.log(this.props.client)
    }

    handle=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submit=(e)=>{
        e.preventDefault()
        // const formData=this.state
        // console.log(formData)
        // {if(JSON.parse(localStorage.getItem('user1')).email==this.state.email){
        //     this.props.history.push('/home')
        // }}
        const client=this.props.client
        console.log('s',client)
        client.query({
           query:getUser,
           variables:{email:this.state.email}
            })
            .then(user=>{
               console.log(user.data.getUser)
               if(user.data.getUser!=null){
                   console.log('ss')
                   localStorage.setItem('user2',JSON.stringify(user.data.getUser))
                 window.location.href='/home'
                
                
               }else{
                alert('invalid email/password')
               }
               
            })
            .catch(err=>{
                console.log(err)
                
            })
        
        
    }

    render(){
        return (<div>
            <br/>
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={this.submit}>
                 <div className="form-group">
                <label>Email<input className="form-control" type='email' value={this.state.email} name='email' onChange={this.handle} required/></label>
                <br/>
                <label>Password<input className="form-control" type='password' value={this.state.password} onChange={this.handle} name='password' required/></label>
                <br/>
                <button type='submit' className="btn btn-primary">Login</button>
                </div>
                </form>
                <small className="form-text text-muted"><p>Not register? <Link to='/register'> signup</Link></p></small>
            </div>
            </div>)
    }
}

export default graphql(getUser)(Login)