import React ,{useState,useContext} from 'react'
import { Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Signin = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,SetPassword] = useState("")
    const [email,SetEmail] = useState("")
    const PostData = ()=>{
        fetch("/Signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
                .then(data=>{
                    console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else
            {
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify( data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Successfully Signedin",classes:"#43a047 green darken-1"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input 
                type="text" 
                placeholder="Email"
                value = {email}
                onChange={(e)=>SetEmail(e.target.value)}
                />
                <input 
                type="password" 
                placeholder="Password"
                value = {password}
                onChange={(e)=>SetPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>PostData()}
                >
                    Login
                </button>
                <h5>
                    <Link to="/Signup">Don't have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signin
