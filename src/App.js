import React from "react";
import GuardRoute from "./components/GuardRoute";

import "upkit/dist/style.min.css";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import RegisterSuccess from "./pages/RegisterSuccess";
import SendJobSuccess from "./pages/SendJobSuccess";

import DetailJob from "./pages/DetailJob";

// component dashboard
import DashboardJob from "./pages/Dashboard/ManagementJob";
import UpdateJob from "./pages/Dashboard/ManagementJob/Update";
// component dashboard

import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import { listen } from "./app/listener";

function App() {
  React.useEffect(() => {
    listen();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {/* routing company */}
          <GuardRoute path="/dashboard/job">
            <DashboardJob />
          </GuardRoute>
          <GuardRoute path="/dashboard/update-job/:jobId">
            <UpdateJob />
          </GuardRoute>
          {/* routing company */}

          <Route path="/success-send-applicants" component={SendJobSuccess} />
          <Route path="/register/success" component={RegisterSuccess} />
          <Route path="/register" component={Register} />

          <GuardRoute path="/logout">
            <Logout />
          </GuardRoute>

          <Route path="/job/:jobId" component={DetailJob} />

          <Route path="/login" component={Login} />
          <Route path="/" component={Home} exact />

          <Route path="/jobs" component={Jobs} />
        </Switch>
      </Router>
    </Provider >
  );
}

export default App;
