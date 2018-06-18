import * as React from "react";
import { Button, Grid, Segment, Form } from "semantic-ui-react";
import axios from "axios";
import { PhotoBlob, FaceImage } from "../../../server/models";
import { colourEffect } from "./colourFilters";

interface CameraProps {
    width: number;
    height: number;
    getId: (id: string) => void;
    validateFace: (imageData: FaceImage) => void;
}

interface CameraState {
    width: number;
    height: number;
    stream: MediaStream;
    originalImage: any;
    facingMode: string;
    constraints: MediaTrackSupportedConstraints;
    devices: MediaDeviceInfo[];
    blobId: string;
    validImage: boolean;
    faceId: string;
}

export class Camera extends React.Component<CameraProps, CameraState> {
    private video: HTMLVideoElement;
    private canvas: HTMLCanvasElement;
    private photo: HTMLPictureElement;
    private canvasInterval: any;

    private userFacingMode = "user";
    private environmentFacingMode = "environment";

    constructor(props: any) {
        super(props);
        this.applyFilter = this.applyFilter.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.takeRegistrationPhoto = this.takeRegistrationPhoto.bind(this);
        this.paintToCanvas = this.paintToCanvas.bind(this);
        this.paintCanvasUsingColour = this.paintCanvasUsingColour.bind(this);
        this.flipCamera = this.flipCamera.bind(this);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            stream: undefined,
            originalImage: undefined,
            facingMode: "",
            constraints: {},
            devices: [],
            blobId: "",
            validImage: false,
            faceId: ""
        };
    }

    public async componentDidMount() {
        this.setStream(this.userFacingMode);
        this.paintToCanvas(this.video);
        this.getDevices();
    }

    public async componentWillUnmount() {
        this.video.srcObject = null;
    }

    public render() {
        return (
            <Grid container columns={2} stackable className="grid">
                <Grid.Column>
                    <Grid verticalAlign="middle" columns={1} centered >
                        <Grid.Row>
                            <Segment className="camera">
                                <canvas
                                    className="canvas"
                                    ref={(input) => { this.canvas = input; }}
                                />
                            </Segment>
                        </Grid.Row>
                        <Grid.Row>
                            <Button className="button" onClick={this.takeRegistrationPhoto} icon="camera" />
                            <Button className="button" onClick={this.flipCamera}>Flip Camera</Button>
                        </Grid.Row>
                        <Grid.Row>
                            <Form>
                                <Grid container columns={4} stackable className="grid">
                                    <Grid.Column>
                                        <Button className="button" onClick={() => { this.applyFilter("red" ); }}>Red</Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Button className="button" onClick={() => { this.applyFilter("green"); }}>Green</Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Button className="button" onClick={() => { this.applyFilter("blue"); }}>Blue</Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Button className="button" onClick={this.removeFilter}>No filter</Button>
                                    </Grid.Column>
                                </Grid>
                            </Form>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column>
                    <Segment className="output">
                    <img
                        className="photo"
                        src={`https://loremflickr.com/${this.state.width}/${this.state.height}`}
                        ref={(input) => { this.photo = input; }}
                    />
                    </Segment>
                </Grid.Column>
                <video className="video" ref={(input) => { this.video = input; }}>
                    Video stream not available.
                </video>
            </Grid >
        );
    }

    private async getDevices() {
        try {
            const gotConstraints = await navigator.mediaDevices.getSupportedConstraints();
            console.dir(gotConstraints);
            const gotDevices = await navigator.mediaDevices.enumerateDevices();
            this.setState({
                constraints: gotConstraints,
                devices: gotDevices
            });
        } catch (error) {
            Promise.reject(error);
        }
    }

    private async setStream(mode: string) {
        try {
            this.setState({
                stream: await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: this.state.width,
                        height: this.state.height,
                        facingMode: mode,
                    },
                    audio: false
                }),
                facingMode: mode
                });
            this.video.srcObject = this.state.stream;
            this.video.play();
        } catch (error) {
            const constraints = {
                video: true,
                audio: false
            };
            await navigator.getUserMedia(
                constraints,
                (stream) => {
                    this.video.srcObject = stream;
                },
                (err) => {
                    console.dir(err);
                }
            );
            this.setState({
                facingMode: mode
            });
            this.video.play();
        }
    }

    private paintToCanvas(video: HTMLVideoElement) {
        this.canvas.width = this.state.width;
        this.canvas.height = this.state.height;
        const context = this.canvas.getContext("2d");
        this.setState({
            originalImage: context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        });
        this.canvasInterval = setInterval(() => {
            context.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
        }, 16);
    }

    private removeFilter() {
        window.clearInterval(this.canvasInterval);
        const context = this.canvas.getContext("2d");
        context.putImageData(this.state.originalImage, 0, 0);
        this.canvasInterval = setInterval(() => {
            context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        }, 16);
    }

    private applyFilter(filterColour: string) {
        this.paintCanvasUsingColour(filterColour, this.video);
    }

    private paintCanvasUsingColour(colour: string, video: HTMLVideoElement) {
        window.clearInterval(this.canvasInterval);
        this.canvas.width = this.state.width;
        this.canvas.height = this.state.height;
        const context = this.canvas.getContext("2d");
        this.canvasInterval = setInterval(() => {
            context.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
            let pixels = context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            pixels = colourEffect(pixels, colour);
            context.putImageData(pixels, 0, 0);
        }, 16);
    }

    private async flipCamera() {
        this.state.facingMode === this.userFacingMode
            ? this.setStream(this.environmentFacingMode)
            : this.setStream(this.userFacingMode);
    }

    private takeRegistrationPhoto() {
        const photo: PhotoBlob = {
            blobId: "blobname",
            text: this.canvas.toDataURL("image/jpeg")
        };
        axios.post("api/photo", photo)
            .then((response) => {
                console.dir(response);
                this.photo.setAttribute("src", response.data.imageUrl);
                this.setState({
                    blobId: response.data.blobId,
                    validImage: response.data.hasFace,
                    faceId: response.data.faceId,
                });
            }).then(() => {
                this.props.getId(this.state.blobId);
                const imageData: FaceImage = {
                    isValidImage: this.state.validImage,
                    faceId: this.state.faceId
                };
                this.props.validateFace(imageData);
            });
    }
}
