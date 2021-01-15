import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Homepage from "./Pages/Homepage/Homepage";
import SignInSignUp from "./Pages/sign-in-sign-up/SignInSignUp";
import { auth, createUserProfileDocument } from "./firebase/utils";
import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      userFetched: false,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
            userFetched: true,
          });
        });
      }
      this.setState({
        currentUser: userAuth,
        userFetched: true,
      });
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />

        <Switch>
          <Route exact path="/">
            <Homepage currentUser={this.state.currentUser} />
          </Route>
          <Route exact path="/sign-up">
            <SignInSignUp />
          </Route>
          <Route exact path="/sign-in">
            <SignInSignUp isSignIn />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
