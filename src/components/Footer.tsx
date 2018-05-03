import * as React from "react";
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from "semantic-ui-react";

export const Footer = () => (
    <Segment
      inverted
      vertical
      style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
    >
      <Container textAlign="center">
        <List horizontal inverted divided link>
          <List.Item as="a" href="#">Site Map</List.Item>
          <List.Item as="a" href="#">Contact Us</List.Item>
          <List.Item as="a" href="#">Terms and Conditions</List.Item>
          <List.Item as="a" href="#">Privacy Policy</List.Item>
        </List>
      </Container>
    </Segment>
);
