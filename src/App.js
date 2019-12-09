import React from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import Phone from "./components/phone";
// import Code from "./components/code";

class App extends React.Component {
    render() {
        let routes = (
            <Switch>
                <Route path="login/phone" component={Phone} />;
                {/* <Route path="login/code" component={Code} />; */}
                <Route path="/" exact component={Phone} />;
            </Switch>
        );
        return <div>{routes}</div>;
    }
}
export default App;
