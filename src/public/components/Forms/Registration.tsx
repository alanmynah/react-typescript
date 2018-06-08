import * as React from "react";
import { Container, Form } from "semantic-ui-react";
import axios from "axios";

interface RegistrationState {
    name: string;
    username: string;
}

export class Registration extends React.Component<any, RegistrationState> {
    private readonly apiURL = "/api/user";

    constructor(props: any) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: "",
            username: "",
        };
    }

    public handleNameChange(event: any) {
        this.setState({
            name: event.target.value
        });
    }

    public handleUsernameChange(event: any) {
        this.setState({
            username: event.target.value
        });
    }

    public handleSubmit = () => {
    const { name, username } = this.state;

    axios.post(this.apiURL, {
        name,
        username
    });
    }

    public render() {
    const { name, username } = this.state;

    return (
        <div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                <Form.Input placeholder="Name" name="name" value={name} onChange={this.handleNameChange} />
                <Form.Input placeholder="Username" name="username" value={username} onChange={this.handleUsernameChange} />
                <Form.Button content="Submit" />
                </Form.Group>
            </Form>
            <strong>onChange:</strong>
            <pre>{JSON.stringify({ name, username }, null, 2)}</pre>
        </div>
        );
    }
}
