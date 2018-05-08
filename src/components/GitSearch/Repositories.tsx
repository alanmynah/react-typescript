import * as React from "react";
import { List, Search } from "semantic-ui-react";
import { FoundRepositories } from "./model";

type RepositoriesProps = FoundRepositories;

export class Repositories extends React.Component<RepositoriesProps> {

    public render() {
        return (
            <div>
                <p>{this.props.numberFound}</p>
                <p>{this.props.repositories}</p>
            </div>
        );
    }
}
