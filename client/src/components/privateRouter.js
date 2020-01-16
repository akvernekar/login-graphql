import React from 'react'
import {Route,Redirect} from 'react-router-dom'

function PrivateRoute({component:Component,...rest}){
    return <Route {...rest} render={(props)=>{
        if(localStorage.getItem('user2')){
            var usr = JSON.parse(localStorage.getItem('user2'))
            // console.log("localStorage.getItem('user2')",usr.role)
            // console.log('hdsh',props.history.location.pathname,props.history.location.pathname == `/user/${props.match.params.id}`)
            if(props.match.url == `/user/${props.match.params.id}`){
                // console.log('hdsh',props.match.url == "/user/:id")
              return (usr.role == "admin" || usr.id==props.match.params.id) ?<Component {...props}/> : <Redirect to={{pathname:'/users'}}/>
        }else{
           return <Component {...props}/>
        }
        }
        else{
            return <Redirect to={{pathname:'/'}}/>
        }
    }}/>
}


export default PrivateRoute