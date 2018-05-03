import * as React from "react";
import { Container, Header } from "semantic-ui-react";
import ButtonExampleButton from "./Button";
import SearchBar from "./GitSearch/Search";

export const GitSearch = () => (
    <Container text style={{ marginTop: "7em" }}>
      <Header as="h1">This is a GitHub Search Bar</Header>
      <p>Go ahead and find some interesting repos</p>
      <SearchBar />
      <p>Hopefully, office friendly...</p>
    </Container>
);
