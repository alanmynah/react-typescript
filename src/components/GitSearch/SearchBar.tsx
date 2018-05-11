import { debounce } from "lodash";
import * as React from "react";
import { List, Search } from "semantic-ui-react";
import { GitRepositoryResponse, Item, Result } from "./model";

export interface SearchBarState {
    value?: string;
    results: Result[];
    error: string;
}

export class SearchBar extends React.Component<{}, SearchBarState> {

    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.debouncedEvent = debounce(this.debouncedEvent, 500);
        this.state = {
            value: "",
            results: [],
            error: ""
        };
    }

    public async handleChange(event: any) {
        const searchValue = event.target.value;
        this.setState({ value: searchValue });
        const repos = await this.debouncedEvent(searchValue);
    }

    private async debouncedEvent(searchValue: string) {
        if (searchValue === "") {
            return;
        }
        const repos = await this.fetchGitRepository(searchValue);
        const results: Result[] = repos.items.map((i) => ({
            title: i.name,
            description: i.language,
            image: i.owner.avatar_url
        }));
        this.setState({
            results
        });
    }

    public async fetchGitRepository(value: string): Promise<GitRepositoryResponse> {
        const response = await fetch(`https://api.github.com/search/repositories?q=${value}`);
        if (response.status === 404 || response.status === 403) {
            this.setState({error: `${response.status}`});
        }
        if (response.ok) {
            const receivedRepositories: GitRepositoryResponse = await response.json();
            const foundRepoInfo: GitRepositoryResponse = {
                total_count: receivedRepositories.total_count,
                items: receivedRepositories.items.map((i) => ({
                        id: i.id,
                        name: i.name,
                        owner: {
                            login: i.owner.login,
                            avatar_url: i.owner.avatar_url,
                            html_url: i.owner.html_url,
                        },
                        html_url: i.html_url,
                        open_issues: i.open_issues,
                        language: i.language,
                        description: i.description,
                        watchers: i.watchers,
                }))
            };
            if (receivedRepositories.total_count === 0) {
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
                results={this.state.results}
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
