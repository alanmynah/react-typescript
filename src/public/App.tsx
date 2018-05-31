import * as React from "react";
import {Container} from "semantic-ui-react";

import { Footer } from "./components/Shared/Footer";
import { Header } from "./components/Shared/Header";
import { Registration } from "./components/Forms/Registration";

export class App extends React.Component {
    public render() {
        return (
            <div>
                <Header />
                <Container text style={{ marginTop: "7em" }}>
                    <Registration />
                </Container>
                <Footer />
            </div>);
    }
}
