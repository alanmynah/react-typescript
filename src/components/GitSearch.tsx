import * as React from "react";
import { Container, Header, List } from "semantic-ui-react";
import { GitRepositoryResponse } from "./GitSearch/model";
import { SearchBar, SearchBarState } from "./GitSearch/SearchBar";

interface GitSearchState {
  foundRepositories: GitRepositoryResponse;
  error: string;
}

export class GitSearch extends React.Component<{}, GitSearchState> {
  constructor(props: any) {
    super(props);
    this.getRepositories = this.getRepositories.bind(this);
    this.state = {
      foundRepositories: {
        total_count: 0,
        items: []
      },
      error: ""
    };
  }

  public getRepositories(repos: GitRepositoryResponse, searchState: SearchBarState) {
    this.setState({
      foundRepositories: {
        total_count: repos.total_count,
        items: repos.items
      },
      error: searchState.error
    });
  }

  public render() {
    return (
      <Container text style={{ marginTop: "7em" }}>
        <Header as="h1">This is a GitHub Search Bar</Header>
        <p>Go ahead and find some interesting repos</p>
        <SearchBar onRepoFetch={this.getRepositories}/>
        <br/>
        {
        this.state.foundRepositories.total_count === 0
          ? this.handleErrors(this.state.error)
          : <p>All went well, I think</p>
        }
      </Container>
    );
  }

  private handleErrors(error: string) {
    switch (error) {
      case "No repositories found":
        return <p>Sorry, we couldn't find anything</p>;
      case "403":
        return <p>Whoah, ease off the gas a bit - too many requests</p>;
      case "404":
        return <p>Think something went oops... Try again later.</p>;
      default:
        return<p>Just some default</p>;
    }
  }
}
