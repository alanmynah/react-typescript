import * as React from "react";
import { Form } from "semantic-ui-react";
import { Camera } from "../Camera/Camera";
import axios from "axios";

interface RegistrationState {
    name: string;
    username: string;
    blobId: string;
}

export class Registration extends React.Component<any, RegistrationState> {
    private readonly apiURL = "/api/user";

    constructor(props: any) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getBlobId = this.getBlobId.bind(this);
        this.state = {
            name: "",
            username: "",
            blobId: "",
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

    public getBlobId(id: string) {
        this.setState({
            blobId: id
        });
    }

    public handleSubmit = () => {
    const { name, username, blobId } = this.state;

    axios.post(this.apiURL, {
        name,
        username,
        blobId
    });
    this.setState ({
        name: "",
        username: "",
        blobId: "",
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
                </Form.Group>
                <br/>
                <br/>
                <Form.Button content="Submit"/>
            </Form>
            <Camera width={320} height={280} getId={this.getBlobId}/>
        </div>
        );
    }
}
