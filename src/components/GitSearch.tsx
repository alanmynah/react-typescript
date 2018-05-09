import * as React from "react";
import { Container, Header, List } from "semantic-ui-react";
import { FoundRepositories } from "./GitSearch/model";
import { Repositories } from "./GitSearch/Repositories";
import { SearchBar, SearchBarState } from "./GitSearch/SearchBar";

interface GitSearchState {
  foundRepositories: FoundRepositories;
  isLoading: boolean;
  error: string;
}

export class GitSearch extends React.Component<{}, GitSearchState> {
  constructor(props: any) {
    super(props);
    this.getRepositories = this.getRepositories.bind(this);
    this.state = {
      foundRepositories: {
        numberFound: 0,
        repositories: []
      },
      isLoading: true,
      error: ""
    };
  }

  public getRepositories(repos: FoundRepositories, searchState: SearchBarState) {
    this.setState({
      foundRepositories: {
        numberFound: repos.numberFound,
        repositories: repos.repositories
      },
      isLoading: searchState.isLoading,
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

          this.state.foundRepositories.numberFound === 0 && this.state.error === ""
          ? <p>Hopefully, office friendly ones...</p>
          : this.state.foundRepositories.numberFound === 0 && this.state.error === "No repositories found"
            ? <p>Sorry, we couldn't find anything</p>
            : <Repositories
              numberFound={this.state.foundRepositories.numberFound}
              repositories={this.state.foundRepositories.repositories}
            />
        }
      </Container>
    );
  }
}
