import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./containers/NewUser/NewUser";
import NewUserAvatar from "./containers/NewUser/NewUserAvatar";
import LandingPage from "./containers/Landing/Landing";
import Home from "./containers/Home/Home";
import Page from './containers/Page/Page';
import Explore from "./containers/Explore/Explore";
import Settings from "./containers/Settings/Settings";

import API from "./utils/API";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import CurrentUser from "./AppContext";


class App extends Component {
    constructor() {
        super()
        this.state = {
            isUser: false,
            user: null,
            pages: [],
            logOut: this.logoutUser,
            checkIfUser: this.checkIfUser,
            updatePages: this.updatePages
      };
    };

    // Fires check user function on page load
    componentDidMount() {
        this.checkIfUser()
    };

    // Checks to see if a token for the user has been stored in session storage
    // If session token does exist, writeUserData function is called to write users data to state
    // If session token does not exist, this.state.isUser is set to false to not allow them into restricted areas of app
    checkIfUser = () => {
        const token = sessionStorage.getItem("jwtToken");
        if (token) {
            this.writeUserData(token)
        } else {
            this.setState({ isUser: false })
        }
    };

    // Write user takes token and decodes it to extract the data
    // User ID is pushed into user | All pages created by the current user ID are pushed into the pages array
    // These are pushed into state at this level so that they can be accessed in context anywhere in the app 
    writeUserData = token => {

        // Decode session token and pass it into the userData const
        const userData = jwt_decode(token);

        // Extract user id and related pages from userData
        let user = userData.id;
        let pages = userData.pages.map(page => page);

        // Pushes user and related pages into state to be accessed with context in other components
        this.setState({
            user: user,
            pages: pages
        })

        // Pushes user's id and active page into session storage for easier access.
        sessionStorage.setItem("user_id", user)
        sessionStorage.setItem("active_page", pages[0].page_title)
            
        // Sets isUser to true and fires checkIfUser function
        this.setState({ isUser: true });
    }

    // Function to run to update context and session token on page add
    updatePages = userId => {

        API.updatePages(userId)
            .then(res => {
                
                // Pushes user and related pages into state to be accessed with context in other components
                this.setState({
                    user: userId,
                    pages: res.data
                })  

            })
            .catch(err => console.log(err));
    }


    // Logout function by clearing session token, removing the AuthToken, and rechecking if the user is logged in.
    logoutUser = () => {
        sessionStorage.clear();
        setAuthToken(false);
        this.checkIfUser();
    }

  render() {
      return (
          <CurrentUser.Provider value={this.state}>
            <Router>
                <div className="App">
                    <Switch>
                    <Route 
                        exact path="/"
                        render={() => 
                            <LandingPage 
                                updateUser={this.updateUser}
                            />} 
                    />
                    <Route 
                        exact path="/home"
                        component={Home}
                    />
                    <Route 
                        exact path="/explore"
                        component={Explore}
                    />
                    <Route 
                        exact path="/account-settings"
                        component={Settings}
                    />
                    <Route 
                        exact path="/pages/:id"
                        component={Page}
                    />
                    <Route 
                        path="/signup"
                        render={() => 
                            <Register />}
                    />
                    <Route 
                        exact path="/newuseravatar"
                        component={NewUserAvatar}
                    />
                    </Switch>
                </div>
            </Router>
          </CurrentUser.Provider>
      );
  }
}

export default App;