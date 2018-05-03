import * as React from "react";
import { Search } from "semantic-ui-react";

interface SearchBarState {
    value: string;
}

type SearchBarProps = SearchBarState;

export default class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    constructor(props: any) {
        super(props);
        this.state = {value: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    public handleChange(event: any) {
        this.setState({value: event.target.value});
        console.log({value: event.target.value});
      }

      public handleSubmit(event: any) {
        console.log("Searching for repo: " + this.state.value);
        event.preventDefault();
        this.setState({value: ""});
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
