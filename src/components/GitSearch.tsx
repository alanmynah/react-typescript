import * as React from "react";
import { Container, Header, List } from "semantic-ui-react";
import { FoundRepositories } from "./GitSearch/model";
import { Repositories } from "./GitSearch/Repositories";
import { SearchBar } from "./GitSearch/SearchBar";

type GitSearchState = FoundRepositories;

export class GitSearch extends React.Component<{}, GitSearchState> {
  constructor(props: any) {
    super(props);
    this.getRepositories = this.getRepositories.bind(this);
    this.state = {
      numberFound: 0,
      repositories: []
    };
  }

  public getRepositories(repos: FoundRepositories) {
    this.setState({
      numberFound: repos.numberFound,
      repositories: repos.repositories
    });
    console.log("State: ");
    console.dir(this.state);
  }

  public render() {
    return (
      <Container text style={{ marginTop: "7em" }}>
        <Header as="h1">This is a GitHub Search Bar</Header>
        <p>Go ahead and find some interesting repos</p>
        <SearchBar onRepoFetch={this.getRepositories}/>
        {
          this.state.numberFound === 0
          ? <p>Hopefully, office friendly ones...</p>
          : <Repositories numberFound={this.state.numberFound} repositories={this.state.repositories}/>
        }
      </Container>
    );
  }
}
