import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBarPage from "./view/NavBarPage/NavBarPage";
import LandingPage from "./view/LandingPage/LandingPage";
import LoginPage from "./view/LoginPage/LoginPage";
import RegisterPage from "./view/RegisterPage/RegisterPage";
import DetailProductPage from "./view/DetailProductPage/DetailProductPage";
import UploadPage from "./view/UploadPage/UploadPage";
import CartPage from "./view/CartPage/CartPage";
import HistoryPage from "./view/HistoryPage/HistoryPage";
import Auth from "../hoc/auth";

function App() {
  return (
    <Router>
      <div>
        <div
          style={{
            width: "100%",
            height: "70px",
            position: "fixed",
            zIndex: 5,
            backgroundColor: "white",
          }}
        >
          <NavBarPage />
        </div>
        <div style={{ paddingTop: "70px", minHeight: "calc(100vh - 80px)" }}>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
            <Route
              exact
              path="/product/upload"
              component={Auth(UploadPage, true)}
            />
            <Route
              exact
              path="/product/:productId"
              component={Auth(DetailProductPage, null)}
            />
            <Route exact path="/user/cart" component={Auth(CartPage, true)} />
            <Route exact path="/history" component={Auth(HistoryPage, true)} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
