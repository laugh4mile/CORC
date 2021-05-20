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
          {authCtx.isLoggedIn && <DashBoardPage />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/user/register" exact>
          {authCtx.isLoggedIn && <UserRegisterPage />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/user/list" exact>
          {authCtx.isLoggedIn && <UserListPage />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/user/list/:employeeNum">
          {authCtx.isLoggedIn && <UserDetailPage />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/user/payment" exact>
          {authCtx.isLoggedIn && <PaymentPage />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/user/payment/:employeeNum">
          {authCtx.isLoggedIn && <PaymentDetailPage />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/store/list" exact>
          {authCtx.isLoggedIn && <StoreListPage />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/store/requested" exact>
          {authCtx.isLoggedIn && <RequestedStoresPage />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/store/sales" exact>
          {authCtx.isLoggedIn && <SalesPage />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/store/sales/:storeId">
          {authCtx.isLoggedIn && <SalesDetailPage />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/statistics" exact>
          {/* {authCtx.isLoggedIn && <StatisticsPage />} */}
          {authCtx.isLoggedIn && <Redirect to="/" />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/settings" exact>
          {/* {authCtx.isLoggedIn && <SettingsPage />} */}
          {authCtx.isLoggedIn && <Redirect to="/" />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
};
export default App;
