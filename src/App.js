import React, { useState, useEffect } from 'react';
import './App.scss';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Register from './Register/Register';
import PostCreate from './PostCreate/PostCreate';
import Login from './Login/Login'
import Menu from './Menu/Menu';
import { UserContext } from './user-context';
import { UserService } from './services/user-service';
import Feed from "./Feed/Feed";
import Spinner from "./common/Spinner/Spinner";
import Profile from "./Profile/Profile";
import EditProfile from "./EditProfile/EditProfile";
import Search from "./Search/Search";
import PostPage from "./PostPage/PostPage";


function App() {

  const [isLoading, setLoading] = useState(true)
  const [user, setUser] = useState({});
  const history = useHistory()

  useEffect( ()=>{  //once the app is Up we want to check if we have cookie. if we do have insert user data into context
    async function getUser() {
        const user = await UserService.get()
        setUser(user);
        setLoading(false);
        if (!user) {
          history.push('/login')
        }
      }
      getUser();
  }, [])


  return (
    <UserContext.Provider value={{user,setUser}}>
      {isLoading && <Spinner />}
      {/* <Router className="App"> */}
      {/*<div className="App__Loding spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div>*/}
        <div className="d-flex flex-column flex-md-column-reverse">
          {/* <div className="order-1 order-lg-0"> */}

          {/* </div> */}
          <div className="container mt-3 flex-grow-1 p-0 p-lg-3">
            <Switch> 
              
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>

              <Route path="/post/create">
                <PostCreate />
              </Route>
              <Route path="/post/:id">
                <PostPage />
              </Route>
              <Route path="/profile/:id">
                <Profile />
              </Route>
              <Route path="/edit-profile">
                <EditProfile />
              </Route>
              <Route path="/search">
                <Search />
              </Route>

              <Route path="/">
                <Feed />
              </Route>


            </Switch>
          </div>
          {user && <Menu />}
        </div>
      {/* </Router> */}
    </UserContext.Provider>
  );
}

export default App;
