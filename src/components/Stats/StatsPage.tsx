import * as React from "react";
import { Image, List } from "semantic-ui-react";
import { Repository } from "../GitSearch/model";

interface StatsPageProps {
    repository: Repository;
}

export const StatsPage: React.SFC<StatsPageProps> = (props) => (
    <div>
        <List>
            <List.Item>
            <Image avatar src={props.repository.owner.avatar_url} />
            <List.Content>
                <List.Header as="a">{props.repository.name}</List.Header>
                <List.Description>{props.repository.description}</List.Description>
            </List.Content>
            </List.Item>
        </List>
    </div>
);
