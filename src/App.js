import React,{useEffect,createContext,useReducer,useContext} from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import { BrowserRouter, Route ,Switch,useHistory} from 'react-router-dom'
import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Singup";
import CreatePost from "./components/screens/CreatePost";
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload :user})
    }
    else{
      history.push('/signin')
    }
  },[])
  return(
    <Switch>
<Route exact path="/">
        <Home />
      </Route>
      <Route path="/Signin">
        <Signin />
      </Route>
      <Route path="/Signup">
        <Signup/>
      </Route>
      <Route exact path="/Profile">
        <Profile />
      </Route>
      <Route path="/Create">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>

      </Switch>
  )
}




function App() {
  const [state,dispatch] =useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing/>


    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
