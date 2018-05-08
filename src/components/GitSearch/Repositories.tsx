import * as React from "react";
import { List, Search } from "semantic-ui-react";
import { FoundRepositories } from "./model";

type RepositoriesProps = FoundRepositories;

export class Repositories extends React.Component<RepositoriesProps> {

    public render() {
        const repos = this.props.repositories.map(((r) => <li key={r.id}>{r.full_name}</li>));
        return (
            <div>
                <p>{this.props.numberFound}</p>
                {repos}
            </div>
        );
    }
}
