import { debounce } from "lodash";
import * as React from "react";
import { List, Search } from "semantic-ui-react";
import { GitRepositoryResponse, Item, Result } from "./model";

export interface SearchBarState {
    value?: string;
    isLoading: boolean;
    results: Result[];
    error: string;
}

interface SearchBarProps {
    onRepoFetch: any;
}

export class SearchBar extends React.Component<SearchBarProps, SearchBarState> {

    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.debouncedEvent = debounce(this.debouncedEvent, 500);
        this.state = {
            value: "",
            results: [],
            error: "",
            isLoading: false
        };
    }

    public componentWillMount() {
        this.resetComponent();
    }

    private resetComponent = () => this.setState({ isLoading: false, results: [], value: "" });

    public async handleChange(event: any) {
        const searchValue = event.target.value;
        this.setState({ isLoading: true, value: searchValue });
        const repos = await this.debouncedEvent(searchValue);
    }

    private async debouncedEvent(searchValue: string) {
        if (this.state.value.length < 1) {
            return this.resetComponent();
        }
        const repos = await this.fetchGitRepository(searchValue);
        this.props.onRepoFetch(repos, this.state);
        if (repos.items !== []) {
            const results: Result[] = repos.items.map((i) => ({
                key: i.id,
                title: i.name,
                description: i.language,
                image: i.owner.avatar_url
            }));
            this.setState({
                results
            });
        }
        this.setState({
            isLoading: false
        });
    }

    public async fetchGitRepository(value: string): Promise<GitRepositoryResponse> {
        const response = await fetch(`https://api.github.com/search/repositories?q=${value}`);
        if (response.status !== 200) {
            this.setState({error: `${response.status}`});
        }
        if (response.ok) {
            const receivedRepositories: GitRepositoryResponse = await response.json();
            if (receivedRepositories.total_count === 0) {
                this.setState({
                    error: "No repositories found",
                    isLoading: false
                });
                const noRepoInfo: GitRepositoryResponse = {
                    total_count: 0,
                    items: null
                };
                return noRepoInfo;
            }
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
            this.setState({ error: "" });
            return foundRepoInfo;
        }
    }

    public render() {
        return (
            <Search
                loading={this.state.isLoading}
                onSearchChange={this.handleChange}
                value={this.state.value}
                results={this.state.results}
            />
        );
    }
}
