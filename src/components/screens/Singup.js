
import React,{useState} from 'react'
import { Link ,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const Signup = () => {
    const history = useHistory()
    const [name,SetName] = useState("")
    const [password,SetPassword] = useState("")
    const [email,SetEmail] = useState("")
    const PostData = ()=>{
        fetch("/Signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
                .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else
            {
                M.toast({html:data.message,classes:"#43a047 green darken-1"})
                history.push('/signin')
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
                placeholder="Name"
                value = {name}
                onChange={(e)=>SetName(e.target.value)}
                />
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
                >Signup</button>
                <h5>
                    <Link to="/Signin">Already have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup
