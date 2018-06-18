import * as React from "react";
import { Form } from "semantic-ui-react";
import { Camera } from "../Camera/Camera";
import axios from "axios";
import { withRouter, Redirect } from "react-router-dom";
import { ValidationError } from "./Errors/ValidationError";
import { validate } from "./validate";
import { NoFaceError } from "./Errors/NoFaceError";
import { FaceImage } from "../../../server/models";

interface RegistrationState {
    name: string;
    username: string;
    blobId: string;
    faceId: string;
    redirect: boolean;
    displayInputWarning: boolean;
    validName: boolean;
    displayFacialWarning: boolean;
    imageHasFace: boolean;
}

class Registration extends React.Component<any, RegistrationState> {
    private readonly apiURL = "/api/user";

    constructor(props: any) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
        this.getBlobId = this.getBlobId.bind(this);
        this.confirmImageHasFace = this.confirmImageHasFace.bind(this);
        this.state = {
            name: "",
            username: "",
            blobId: "",
            faceId: "",
            redirect: false,
            displayInputWarning: false,
            validName: false,
            displayFacialWarning: false,
            imageHasFace: false,
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
                displayInputWarning: false,
                validName: false,
            });
        } else {
            const isValid = validate(event.target.value);
            this.setState({
                displayInputWarning: !isValid,
                validName: isValid,
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
            displayFacialWarning: !imageData.isValidImage,
            imageHasFace: imageData.isValidImage
        });
        if (imageData.isValidImage) {
            this.setState({
                faceId: imageData.faceId,
            });
        }
    }

    public handleRegistration = () => {
        const { name, username, blobId, faceId } = this.state;

        axios.post(this.apiURL, {
            name,
            username,
            blobId,
            faceId
        });
        this.setState ({
            redirect: true
        });
    }

    public render() {
    const { name, username, validName, displayInputWarning, imageHasFace, displayFacialWarning, redirect } = this.state;

    return (
        <div>
            {displayInputWarning && <ValidationError />}
            {displayFacialWarning && <NoFaceError /> }
            <Form onSubmit={this.handleRegistration}>
                <Form.Group>
                    <Form.Input placeholder="Name" name="name" value={name} onChange={this.handleNameChange} />
                    <Form.Input placeholder="Username" name="username" value={username} onChange={this.handleUsernameChange} />
                    {(validName && imageHasFace) && <Form.Button content="Submit"/>}
                </Form.Group>
                <br/>
            </Form>
            <Camera width={320} height={280} getId={this.getBlobId} validateFace={this.confirmImageHasFace}/>
            {redirect && <Redirect to="thankyou" push={true} />}
        </div>
        );
    }
}

export default withRouter(Registration);
