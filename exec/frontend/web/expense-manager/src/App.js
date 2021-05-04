import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectIsLoggedIn } from "./redux/user/user.selectors";

import Nav from "./components/nav/nav.component";
import SignInPage from "./pages/sign-in/sign-in.component";
import DashBoardPage from "./pages/dashboard/dashboard.component";
import UserRegisterPage from "./pages/user-register/user-register.component";
import UserListPage from "./pages/user-list/user-list.component";
import UserPaymentDetailsPage from "./pages/user-paymentdetails/user-paymentdetails.component";
import StoreListPage from "./pages/store-list/store-list.component";
import StoreRequestedPage from "./pages/store-requested/store-requested.component";
import StoreSalesDetailsPage from "./pages/store-salesdetails/store-salesdetails.component";
import StatisticsPage from "./pages/statistics/statistics.component";
import SettingsPage from "./pages/settings/settings.component";

import "./App.scss";
import "./index.css";

class App extends React.Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    console.log("this.props", this.props);
    console.log(this.props.isLoggedIn);
    return (
      <div className="noto-sans-KR flex">
        {this.props.isLoggedIn ? <Nav /> : ""}
        <Switch>
          <Route exact path="/dashboard" component={DashBoardPage} />
          <Route exact path="/user/register" component={UserRegisterPage} />
          <Route exact path="/user/list" component={UserListPage} />
          <Route
            exact
            path="/user/paymentdetails"
            component={UserPaymentDetailsPage}
          />
          <Route exact path="/store/list" component={StoreListPage} />
          <Route exact path="/store/requested" component={StoreRequestedPage} />
          <Route
            exact
            path="/store/salesdetails"
            component={StoreSalesDetailsPage}
          />
          <Route exact path="/statistics" component={StatisticsPage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route
            exact
            path="/"
            render={() =>
              this.props.isLoggedIn ? (
                <Redirect to="/dashboard" />
              ) : (
                <SignInPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoggedIn: selectIsLoggedIn,
});

export default connect(mapStateToProps)(App);
