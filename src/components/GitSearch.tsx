import * as React from "react";
import { Container, Header, List } from "semantic-ui-react";
import { GitRepositoryResponse } from "./GitSearch/model";
import { SearchBar, SearchBarState } from "./GitSearch/SearchBar";

interface GitSearchState {
  error: string;
}

export class GitSearch extends React.Component<{}, GitSearchState> {
  constructor(props: any) {
    super(props);
    this.getRepositories = this.getRepositories.bind(this);
    this.state = {
      error: ""
    };
  }

  public getRepositories(repos: GitRepositoryResponse, searchState: SearchBarState) {
    this.setState({
      error: searchState.error
    });
    console.log(this.state.error);
  }

  public render() {
    return (
      <Container text style={{ marginTop: "7em" }}>
        <Header as="h1">This is a GitHub Search Bar</Header>
        <p>{ this.handleErrors(this.state.error) }</p>
        <SearchBar onRepoFetch={this.getRepositories}/>
      </Container>
    );
  }

  private handleErrors(error: string) {
    switch (error) {
      case "No repositories found":
        return "Sorry, we couldn't find anything";
      case "403":
        return "Whoah, ease off the gas a bit - too many requests";
      case "404":
        return "Think something went oops... Try again later.";
      default:
        return "Let's find something";
    }
  }
}
