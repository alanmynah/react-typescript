import * as lodash from "lodash";
import * as React from "react";
import { List, Search } from "semantic-ui-react";
import { FoundRepositories } from "./model";

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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            value: "",
            isLoading: true,
            error: ""
        };
      }

    public async handleChange(event: any) {
        this.setState({value: event.target.value});
        console.log(event.target.value);
        console.log(this.state.value);
        const repos = await this.fetchGitRepository(event.target.value);
        console.dir(repos);
        console.log({value: event.target.value});
      }

    public async handleSubmit(event: any) {
        event.preventDefault();
        const repos = await this.fetchGitRepository("");
        this.props.onRepoFetch(repos, this.state);
        this.setState({value: "", isLoading: false});
    }

    public fetchGitRepository(value: string): Promise<FoundRepositories> {
        return fetch(`https://api.github.com/search/repositories?q=${value}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            // doesn't work - need to figure out why
            // .catch((err) => {
            //     if (err.status === 404) {
            //         this.setState({error: "404"});
            //     }
            //     if (err.status === 403) {
            //         this.setState({error: "403"});
            //     }
            // })
            .then((json) => {
                const foundRepoInfo: FoundRepositories = {
                    numberFound: json.total_count,
                    repositories: json.items
                };
                if (json.total_count === 0) {
                    this.setState({
                        error: "No repositories found"
                    });
                }
                return foundRepoInfo;
            });
    }

    public render() {
        return (
            <Search
                onSearchChange={lodash.debounce(this.handleChange, 100000, {leading: true})}
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
