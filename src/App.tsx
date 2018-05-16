import * as React from "react";
import {Container} from "semantic-ui-react";

import { GitSearch } from "./components/Search/GitSearch";
import { Footer } from "./components/Shared/Footer";
import { Header } from "./components/Shared/Header";

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
