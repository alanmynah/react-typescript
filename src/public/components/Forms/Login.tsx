import * as React from "react";
import { Form, Button } from "semantic-ui-react";
import { Camera } from "../Camera/Camera";
import axios from "axios";
import { withRouter, Redirect } from "react-router-dom";
import { ValidationError } from "./Errors/ValidationError";
import { validate } from "./validate";
import { NoFaceError } from "./Errors/NoFaceError";
import { FaceImage } from "../../../server/models";

interface LoginState {
    name: string;
    username: string;
    blobId: string;
    faceId: string;
    redirectToRegistration: boolean;
    hasInputWarning: boolean;
    isValidName: boolean;
    hasFacialWarning: boolean;
    hasLoginError: boolean;
    imageHasFace: boolean;
    isAuthorised: boolean;
}

class Login extends React.Component<any, LoginState> {
    private readonly apiURL = "/api/login";

    constructor(props: any) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.getBlobId = this.getBlobId.bind(this);
        this.confirmImageHasFace = this.confirmImageHasFace.bind(this);
        this.state = {
            name: "",
            username: "",
            blobId: "",
            faceId: "",
            redirectToRegistration: false,
            hasInputWarning: false,
            isValidName: false,
            hasFacialWarning: false,
            hasLoginError: false,
            imageHasFace: false,
            isAuthorised: false
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
                hasInputWarning: false,
                isValidName: false,
            });
        } else {
            const isValid = validate(event.target.value);
            this.setState({
                hasInputWarning: !isValid,
                isValidName: isValid,
            });
        }
    }

    public getBlobId(blobId: string) {
        this.setState({
            blobId
        });
    }

    public confirmImageHasFace(imageData: FaceImage) {
        console.log(imageData.isValidImage);
        this.setState({
            hasFacialWarning: !imageData.isValidImage,
            imageHasFace: imageData.isValidImage
        });
        if (imageData.isValidImage) {
            this.setState({
                faceId: imageData.faceId,
            });
        }
    }

    public handleLogin = () => {
        const { name, username, blobId, faceId } = this.state;

        axios.post(this.apiURL, {
            name,
            username,
            blobId,
            faceId
        }).then((response => {
            if (response.status === 200) {
                this.setState ({
                    isAuthorised: true
                });
            }
        }));

    }

    public render() {
    const {
        name,
        username,
        isValidName,
        hasInputWarning,
        imageHasFace,
        hasFacialWarning,
        redirectToRegistration,
        isAuthorised } = this.state;

    return (
        <div>
            {hasInputWarning && <ValidationError />}
            {hasFacialWarning && <NoFaceError /> }
            <Form onSubmit={this.handleLogin}>
                <Form.Group>
                    <Form.Input placeholder="Name" name="name" value={name} onChange={this.handleNameChange} />
                    <Form.Input placeholder="Username" name="username" value={username} onChange={this.handleUsernameChange} />
                    <Form.Button disabled={!imageHasFace} content="Log in"/>
                </Form.Group>
            </Form>
            <br/>
            <Button onClick={this.redirectToRegistration} content="Register"/>
            {isValidName && <Camera width={320} height={280} getId={this.getBlobId} validateFace={this.confirmImageHasFace}/>}
            {redirectToRegistration && <Redirect to="registration" push={true} />}
            {isAuthorised && <Redirect to="list" push={true} />}
        </div>
        );
    }

    private redirectToRegistration = () => {
        this.setState({
            redirectToRegistration: true
        });
    }
}

export default withRouter(Login);
