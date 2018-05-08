import * as React from "react";
import { List, Search } from "semantic-ui-react";
import { FoundRepositories } from "./model";

interface SearchBarState {
    value?: string;
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
            value: ""
        };
      }

    public handleChange(event: any) {
        this.setState({value: event.target.value});
        console.log({value: event.target.value});
      }

    public async handleSubmit(event: any) {
        event.preventDefault();
        console.log("Searching for repos: " + this.state.value);
        const repos = await this.fetchGitRepository();
        this.props.onRepoFetch(repos);
        this.setState({value: ""});
    }

    public fetchGitRepository(): Promise<FoundRepositories> {
        const foundrepositories = fetch(`https://api.github.com/search/repositories?q=${this.state.value}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok");
            })
            .then((json) => {
                if (json.total_count === 0) {
                    console.log("Found no repositories");
                } else {
                    const foundRepoInfo: FoundRepositories = {
                        numberFound: json.total_count,
                        repositories: json.items
                    };
                    console.dir(foundRepoInfo);
                    return foundRepoInfo;
                }
            });
        return foundrepositories;
    }

    public render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Search:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
