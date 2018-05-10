import { debounce } from "lodash";
import * as React from "react";
import { List, Search } from "semantic-ui-react";
import { FoundRepositories, GitRepositoryResponse } from "./model";
import { Repositories } from "./Repositories";

export interface SearchBarState {
    value?: string;
    isLoading: boolean;
    error: string;
}

interface SearchBarProps {
    onRepoFetch: any;
}

export class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.debouncedEvent = debounce(this.debouncedEvent, 1000);
        this.state = {
            value: "",
            isLoading: true,
            error: ""
        };
    }

    public async handleChange(event: any) {
        const searchValue = event.target.value;
        this.setState({ value: searchValue });
        const repos = await this.debouncedEvent(searchValue);
    }

    private async debouncedEvent(searchValue: string) {
        const repos = await this.fetchGitRepository(searchValue);
        this.props.onRepoFetch(repos, this.state);
        this.setState({value: ""});
    }

    public async fetchGitRepository(value: string): Promise<FoundRepositories> {
        const response = await fetch(`https://api.github.com/search/repositories?q=${value}`);
        if (response.status === 404 || response.status === 403) {
            this.setState({error: `${response.status}`});
            const foundRepoInfo: FoundRepositories = {
                numberFound: 0,
                repositories: []
            };
        }
        if (response.ok) {
            const recievedRepositories: GitRepositoryResponse = await response.json();
            const foundRepoInfo: FoundRepositories = {
                numberFound: recievedRepositories.total_count,
                repositories: recievedRepositories.items
            };
            if (recievedRepositories.total_count === 0) {
                this.setState({
                    error: "No repositories found"
                });
            }
            return foundRepoInfo;
        }
    }

    public render() {
        return (
            <Search
                onSearchChange={this.handleChange}
                value={this.state.value}
            />
            // <form onSubmit={this.handleSubmit}>
            //     <label>
            //         Search:
            //         <input type="text" value={this.state.value} onChange={this.handleChange} />
            //     </label>
            //     <input type="submit" value="Submit" />
            // </form>
        );
    }
}
