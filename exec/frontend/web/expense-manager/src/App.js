import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthContext from "./store/auth-context";

import Layout from "./components/Layout/Layout";

import AuthPage from "./pages/AuthPage";
import DashBoardPage from "./pages/DashBoardPage";
// User
import UserRegisterPage from "./pages/User/UserRegisterPage";
import UserListPage from "./pages/User/UserListPage";
import UserDetailPage from "./pages/User/UserDetailPage";
import PaymentPage from "./pages/User/PaymentPage";
import PaymentDetailPage from "./pages/User/PaymentDetailPage";
// Store
import StoreListPage from "./pages/Store/StoreListPage";
import RequestedStoresPage from "./pages/Store/RequestedStoresPage";
import SalesPage from "./pages/Store/SalesPage";
import SalesDetailPage from "./pages/Store/SalesDetailPage";

import StatisticsPage from "./pages/StatisticsPage";
import SettingsPage from "./pages/SettingsPage";

import "./App.css";
import "./index.css";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          {!authCtx.isLoggedIn && <AuthPage />}
          {authCtx.isLoggedIn && <DashBoardPage />}
        </Route>
        <Route path="/dashboard" exact>
          <DashBoardPage />
        </Route>
        <Route path="/user/register" exact>
          <UserRegisterPage />
        </Route>
        <Route path="/user/list" exact>
          <UserListPage />
        </Route>
        <Route path="/user/list/:employeeNum">
          <UserDetailPage />
        </Route>
        <Route exact path="/user/payment">
          <PaymentPage />
        </Route>
        <Route path="/user/payment/:employeeNum">
          <PaymentDetailPage />
        </Route>
        <Route exact path="/store/list">
          <StoreListPage />
        </Route>
        <Route exact path="/store/requested">
          <RequestedStoresPage />
        </Route>
        <Route exact path="/store/sales">
          <SalesPage />
        </Route>
        <Route exact path="/store/sales/:storeId">
          <SalesDetailPage />
        </Route>
        <Route exact path="/statistics">
          <StatisticsPage />
        </Route>
        <Route exact path="/settings" component={SettingsPage} />

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
};
export default App;
