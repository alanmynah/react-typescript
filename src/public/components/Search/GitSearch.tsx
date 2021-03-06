import * as React from "react";
import { Card, Container, Header, List } from "semantic-ui-react";
import { StatsPage } from "./Stats/StatsPage";
import { Repository } from "./model";
import { SearchBar, SearchBarState } from "./SearchBar";

interface GitSearchState {
  repoLoaded: boolean;
  repository: Repository;
  error?: string;
}

export class GitSearch extends React.Component<{}, GitSearchState> {
  constructor(props: any) {
    super(props);
    this.getRepository = this.getRepository.bind(this);
    this.state = {
      repoLoaded: false,
      repository: undefined,
      error: ""
    };
  }

  public getRepository(RepositoryKey: number, state: SearchBarState) {
    const repositoryToDisplay = state.repos.find((o) => o.id === RepositoryKey);
    if (repositoryToDisplay !== undefined) {
      this.setState ({
        repoLoaded: true,
        repository: repositoryToDisplay
    });
    }
    this.setState ({
      error: state.error
    });
  }

  public render() {
    return (
      <div>
        <Header as="h1">This is a GitHub Search Bar</Header>
        <p>{ this.handleErrors(this.state.error) }</p>
        <SearchBar getSelectedRepositoryKey={this.getRepository}/>
        <br />
        {this.state.repoLoaded
          ? <StatsPage repository={this.state.repository}/>
          : null}
      </div>
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
        return "";
    }
  }
}
