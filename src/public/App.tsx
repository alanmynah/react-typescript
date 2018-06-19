import * as React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import {Container} from "semantic-ui-react";
import { Header } from "./components/Shared/Header";
import { Footer } from "./components/Shared/Footer";
import { ThankYou } from "./components/Forms/ThankYou";
import Registration from "./components/Forms/Registration";
import Login from "./components/Forms/Login";
import { LoginAttemptsList } from "./components/List/List";

export class App extends React.Component {

    public render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Container text style={{ marginTop: "7em" }}>
                        <Switch>
                            <Redirect exact={true} path="/" to="/login" />
                            <Route path="/login" component={Login} />
                            <Route path="/registration" component={Registration}/>
                            <Route path="/thankyou" component={ThankYou}/>
                            <Route path="/list" component={LoginAttemptsList} />
                        </Switch>
                    </Container>
                    <Footer />
                </div>
            </BrowserRouter>);
    }
}
