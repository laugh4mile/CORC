import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

import Nav from "./components/nav/nav.component";
import SignInPage from "./pages/sign-in/sign-in.component";
import DashBoardPage from "./pages/dashboard/dashboard.component";

import "./App.css";
import "./index.css";

class App extends React.Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    console.log("this.props", this.props);
    console.log(this.props.currentUser);
    return (
      <div className="noto-sans-KR">
        {this.props.currentUser ? <Nav /> : ""}
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/dashboard" />
              ) : (
                <SignInPage />
              )
            }
          />
          <Route exact path="/dashboard" component={DashBoardPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
