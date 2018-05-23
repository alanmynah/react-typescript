import * as React from "react";
import { Container, List, Menu, Segment } from "semantic-ui-react";

export const Footer: React.SFC<{}> = () => (
    <Menu fixed="bottom" inverted>
      <Segment
        inverted
        vertical
        style={{ margin: "20px 0em 0em", padding: "20px" }}
      >
        <Container textAlign="center">
          <List horizontal inverted divided link>
            <List.Item as="a" href="https://github.com/alanmynah/react-typescript">GitHub</List.Item>
          </List>
        </Container>
      </Segment>
    </ Menu>
);
