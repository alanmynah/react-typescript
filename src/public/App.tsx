import * as React from "react";
import {Container} from "semantic-ui-react";

import { Camera } from "./components/Camera/Camera";
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
                    <Camera width={320} height={280}/>
                </Container>
                <Footer />
            </div>);
    }
}
