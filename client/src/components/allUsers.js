import React from 'react'
import {graphql} from 'react-apollo'
import {gql} from 'apollo-boost'
import {Link} from 'react-router-dom'
import ApolloClient from 'apollo-boost'


const client=new ApolloClient({
    uri:'http://localhost:4025/graphql',
    onError: (e) => { console.log('hgh',e) }
   
  })
// const getAllUsers=gql`{
//     getAllUsers{
//         username
//         email
//         mobile
//         id
        
//     }
// }`

const getAllUsersAndAdmin=gql`{
    getAllUsersAndAdmin{
        username
        email
        mobile
        id
        
    }
}`


class AllUsers extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount=()=>{
       
        this.props.data.refetch()
        
        // client.query({
        //     refetchQueries:[{query:getAllUsers}]
        // })
        
    }
   
    render(){
        const userData=localStorage.getItem('user2')!=null && JSON.parse(localStorage.getItem('user2'))
        console.log(userData)
        return(
            <div className='container'>
            <div className='list-group'>
           <ul className="list-group list-group-flush"> {this.props.data.loading?<p>loading</p>:this.props.data.getAllUsersAndAdmin.map(user=>{
                return(
                 <li key={user.id} className="list-group-item">
                     <h4>{user.username}</h4>
           <h5>{user.email}</h5><p>{user.mobile}</p> 
           {(userData.role=='admin' || user.id==userData.id) && <Link to={`/user/${user.id}`}><button  type="button" className="btn btn-info">Edit</button></Link>}
            </li>
            )
            })}</ul>
            </div>
            </div>
        )
    }
}

export default graphql(getAllUsersAndAdmin)(AllUsers)