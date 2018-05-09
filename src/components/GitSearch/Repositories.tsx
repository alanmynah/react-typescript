import * as React from "react";
import { Card, List, Search } from "semantic-ui-react";
import { FoundRepositories } from "./model";

type RepositoriesProps = FoundRepositories;

export const Repositories: React.SFC<RepositoriesProps> = (props) => {
    return (
        <div>
            <p>There are {props.numberFound} repositories matching your search</p>
            <p>Here are the first 30: </p>
            {props.repositories.map(((r: any) => <Card
                key={r.id}
                header={r.full_name}
                description={r.description}
                meta={r.language}
                href={r.html_url}
                />))}
        </div>
    );
};
