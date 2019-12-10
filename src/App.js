import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Phone from "./components/phone";
import Code from "./components/code";
import UserInfo from "./components/userInfo";

class App extends React.Component {
    render() {
        let routes = (
            <Switch>
                <Route path="/login/phone" component={Phone} />;
                <Route path="/login/code" component={Code} />;
                <Route path="/userinfo" component={UserInfo} />;
                <Route path="/" exact component={Phone} />;
            </Switch>
        );
        return <React.Fragment>{routes}</React.Fragment>;
    }
}
export default App;
