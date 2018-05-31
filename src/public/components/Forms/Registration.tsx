import * as React from "react";
import { Container, Form } from "semantic-ui-react";

interface RegistrationState {
    name: string;
    username: string;
    submittedName: string;
    submittedUsername: string;
}

export class Registration extends React.Component<any, RegistrationState> {
    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: "",
            username: "",
            submittedName: "",
            submittedUsername: ""
        };
    }

    public handleChange(event: any) {
        this.setState({ [event.target.name]: event.target.value });
    }

    public handleSubmit = () => {
    const { name, username } = this.state;

    this.setState({ submittedName: name, submittedUsername: username });
    }

    public render() {
    const { name, username, submittedName, submittedUsername } = this.state;

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
            <strong>onSubmit:</strong>
            <pre>{JSON.stringify({ submittedName, submittedUsername }, null, 2)}</pre>
        </div>
        );
    }
}
