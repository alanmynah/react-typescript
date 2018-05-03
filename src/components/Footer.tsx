import * as React from "react";
import { Container, Icon, List, Menu, Segment } from "semantic-ui-react";

export const Footer: React.SFC<{}> = () => (
    <Menu fixed="bottom" inverted>
      <Segment
        inverted
        vertical
        style={{ margin: "2em 0em 0em", padding: "1em 0em" }}
      >
        <Container textAlign="center">
          <List horizontal inverted divided link>
            <Icon name="github" />
            <List.Item as="a" href="https://github.com/alanmynah/react-typescript">GitHub</List.Item>
          </List>
        </Container>
      </Segment>
    </ Menu>
);
