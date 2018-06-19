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
    hasInputWarning: boolean;
    isValidName: boolean;
    hasFacialWarning: boolean;
    imageHasFace: boolean;
}

class Registration extends React.Component<any, RegistrationState> {
    private readonly apiURL = "/api/registration";

    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            username: "",
            blobId: "",
            faceId: "",
            redirect: false,
            hasInputWarning: false,
            isValidName: false,
            hasFacialWarning: false,
            imageHasFace: false,
        };
    }

    public render() {
        const { name, username, isValidName, hasInputWarning, imageHasFace, hasFacialWarning, redirect } = this.state;

        return (
            <div>
                {hasInputWarning && <ValidationError />}
                {hasFacialWarning && <NoFaceError /> }
                <Form onSubmit={this.handleRegistration}>
                    <Form.Group>
                        <Form.Input placeholder="Name" name="name" value={name} onChange={this.handleNameChange} />
                        <Form.Input placeholder="Username" name="username" value={username} onChange={this.handleUsernameChange} />
                        {(isValidName && imageHasFace) && <Form.Button content="Submit"/>}
                    </Form.Group>
                    <br/>
                </Form>
                <Camera width={320} height={280} getId={this.getBlobId} validateFace={this.confirmImageHasFace}/>
                {redirect && <Redirect to="thankyou" push={true} />}
            </div>
            );
        }

    private handleNameChange = (event: any) => {
        this.setState({
            name: event.target.value
        });
        this.validateInputFor(event);
    }

    private handleUsernameChange = (event: any) => {
        this.setState({
            username: event.target.value
        });
        this.validateInputFor(event);
    }

    private validateInputFor = (event: any) => {
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

    private getBlobId = (blobId: string) => {
        this.setState({
            blobId
        });
    }

    private confirmImageHasFace = (imageData: FaceImage) => {
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

    private handleRegistration = () => {
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
}

export default withRouter(Registration);
