import * as React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import {Container} from "semantic-ui-react";
import { ThankYou } from "./components/ThankYou";
import { Footer } from "./components/Shared/Footer";
import { Header } from "./components/Shared/Header";
import Registration from "./components/Forms/Registration";

export class App extends React.Component {

    public render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Container text style={{ marginTop: "7em" }}>
                        <Redirect path="/" to="/registration" />
                        <Route path="/registration" component={Registration}/>
                        <Route path="/thankyou" component={ThankYou}/>
                    </Container>
                    <Footer />
                </div>
            </BrowserRouter>);
    }
}
