import { Component } from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Homepage from "./Pages/Homepage/Homepage";
import SignInSignUp from "./Pages/sign-in-sign-up/SignInSignUp";
import { auth, createUserProfileDocument } from "./firebase/utils";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      warningMessage: "Post as anonymous",
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
            warningMessage: `Post as ${snapShot.data().displayName}`,
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
      <Container>
        <Header currentUser={this.state.currentUser} />
        {this.state.userFetched && (
          <Switch>
            <Route exact path="/">
              <Homepage
                currentUser={this.state.currentUser}
                warningMessage={this.state.warningMessage}
              />
            </Route>
            <Route exact path="/sign-up">
              <SignInSignUp />
            </Route>
            <Route exact path="/sign-in">
              <SignInSignUp isSignIn />
            </Route>
          </Switch>
        )}
      </Container>
    );
  }
}

export default App;
