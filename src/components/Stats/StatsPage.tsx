import * as React from "react";
import { Button, Card, Container, Image, List, Statistic } from "semantic-ui-react";
import { Repository } from "../GitSearch/model";

interface StatsPageProps {
    repository: Repository;
}

export const StatsPage: React.SFC<StatsPageProps> = (props) => (
    <Container>
        <Card>
            <Card.Content>
                <Image floated="right" size="mini" src={props.repository.owner.avatar_url} />
                <Card.Header>{props.repository.name}</Card.Header>
                <Card.Meta>{props.repository.language}</Card.Meta>
                <Card.Description>{props.repository.description}</Card.Description>
            </Card.Content>
        </Card>
        <List>
            <List.Item>
                <List.Content>
                    <List.Header as="a">{props.repository.owner.html_url}</List.Header>
                    <List.Description>{props.repository.owner.login}</List.Description>
                    <Statistic.Group>
                        <Statistic>
                            <Statistic.Value>{props.repository.watchers}</Statistic.Value>
                            <Statistic.Label>
                                {props.repository.watchers === 1
                                    ? "Watcher"
                                    : "Watchers"
                                }
                            </Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>{props.repository.open_issues}</Statistic.Value>
                            <Statistic.Label>
                                {props.repository.open_issues === 1
                                    ? "Open Issue"
                                    : "Open Issues"
                                }
                            </Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                </List.Content>
            </List.Item>
        </List>
    </Container>
);
