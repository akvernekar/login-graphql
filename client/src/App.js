import React from 'react';
import Register  from './components/register'
import Login from './components/login'
import Home from './components/home'
import AllUsers from './components/allUsers'
import EditUser from './components/editUser'
import PrivateRouter from './components/privateRouter'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import {createMemoryHistory} from 'history'
import {Router,BrowserRouter,MemoryRouter,Route,Link,Switch,Redirect} from 'react-router-dom'

const client=new ApolloClient({
  uri:'http://localhost:4025/graphql',
  onError: (e) => { console.log('hgh',e) }
 
})

function App(props) { 
  const userData=(localStorage.getItem('user2')!=null && JSON.parse(localStorage.getItem('user2')).role)
  return (
    <div>
    
  <BrowserRouter>    
 {localStorage.getItem('user2')!=undefined && 
 <>
 <div className="navbar navbar-expand-lg navbar-light bg-light">
   <h2 className="navbar">|_|ser InFO</h2>
 <Link className="navbar"  to='/users'>Users</Link> |
  <Link className="navbar"  to='/' onClick={()=>{localStorage.removeItem('user2')
window.location.href='/'}}>Logout</Link>
</div>
  </>}
 <ApolloProvider client={client} >
 
 <Route path='/register'  render={()=> <Register client={client} />} exact={true}/>
 <Route path='/' render={()=> <Login client={client}/>} exact={true}/>
 
 <PrivateRouter path='/home' component={Home}/>
  
  <PrivateRouter path='/user/:id' component={EditUser} exact />
  <PrivateRouter path='/users' component={AllUsers}/>
 
  {/* // render={(props)=> <AllUsers {...props} client={client} exact/>}  */}
  
 {/* <PrivateRouter path='/user/:id' render={(props)=>userData=='admin' ? <EditUser {...props} client={client} exact/>:<Redirect to='/home'/> }/>
  */}
 
  {/* <PrivateRouter path='/user/:id' component={EditUser}/> */}

  </ApolloProvider>  
  </BrowserRouter> 
 
  
  
  
   </div>
  )
}

export default App;
