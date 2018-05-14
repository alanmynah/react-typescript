import * as React from "react";
import {Container} from "semantic-ui-react";

import { Footer } from "./components/Footer";
import { GitSearch } from "./components/GitSearch";
import { Header } from "./components/Header";

export class App extends React.Component {
    public render() {
        return (
            <div>
                <Header />
                <GitSearch />
                <div className="box"></div>
                <Footer />
            </div>);
    }
}
