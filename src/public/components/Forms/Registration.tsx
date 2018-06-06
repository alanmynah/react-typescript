import * as React from "react";
import { Container, Form } from "semantic-ui-react";
import axios from "axios";

interface RegistrationState {
    name: string;
    username: string;
}

export class Registration extends React.Component<any, RegistrationState> {
    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: "",
            username: "",
        };
    }

    public handleChange(event: any) {
        this.setState({ [event.target.name]: event.target.value });
    }

    public handleSubmit = () => {
    const { name, username } = this.state;

    const apiURL = "/api/photo";
    axios.post(apiURL, {
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
                <Form.Input placeholder="Name" name="name" value={name} onChange={this.handleChange} />
                <Form.Input placeholder="Username" name="username" value={username} onChange={this.handleChange} />
                <Form.Button content="Submit" />
                </Form.Group>
            </Form>
            <strong>onChange:</strong>
            <pre>{JSON.stringify({ name, username }, null, 2)}</pre>
        </div>
        );
    }
}
