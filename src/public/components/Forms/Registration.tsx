import * as React from "react";
import { Form } from "semantic-ui-react";
import { Camera } from "../Camera/Camera";
import axios from "axios";
import { withRouter, Redirect } from "react-router-dom";
import { ValidationError } from "./ValidationError";
import { validate } from "./validate";

interface RegistrationState {
    name: string;
    username: string;
    blobId: string;
    redirect: boolean;
    displayWarning: boolean;
    allowedToSubmit: boolean;
}

class Registration extends React.Component<any, RegistrationState> {
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
            redirect: false,
            displayWarning: false,
            allowedToSubmit: false,
        };
    }

    public handleNameChange(event: any) {
        this.setState({
            name: event.target.value
        });
        this.validateInputFor(event);

    }

    public handleUsernameChange(event: any) {
        this.setState({
            username: event.target.value
        });
        this.validateInputFor(event);
    }

    public validateInputFor(event: any) {
        if (event.target.value === "") {
            this.setState({
                displayWarning: false,
                allowedToSubmit: false,
            });
        } else {
            const isValid = validate(event.target.value);
            this.setState({
                displayWarning: !isValid,
                allowedToSubmit: isValid,
            });
        }
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
            redirect: true
        });
    }

    public render() {
    const { name, username, allowedToSubmit, redirect, displayWarning } = this.state;

    return (
        <div>
            {(displayWarning) && <ValidationError />}
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Input placeholder="Name" name="name" value={name} onChange={this.handleNameChange} />
                    <Form.Input placeholder="Username" name="username" value={username} onChange={this.handleUsernameChange} />
                    {(allowedToSubmit) && <Form.Button content="Submit"/>}
                </Form.Group>
                <br/>
            </Form>
            <Camera width={320} height={280} getId={this.getBlobId}/>
            {redirect && <Redirect to="thankyou" push={true} />}
        </div>
        );
    }
}

export default withRouter(Registration);
