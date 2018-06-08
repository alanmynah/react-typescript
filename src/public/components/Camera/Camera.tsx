import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, Grid, Image, List, Segment } from "semantic-ui-react";
import axios from "axios";
import { PhotoBlob } from "../../../server/models";

interface CameraProps {
    width: number;
    height: number;
}

interface DeviceProps {
    devices: MediaDeviceInfo[];
}

interface CameraState {
    width: number;
    height: number;
    stream: MediaStream;
    facingMode: string;
    constraints: MediaTrackSupportedConstraints;
    devices: MediaDeviceInfo[];
}

export class Camera extends React.Component<CameraProps, CameraState> {
    private video: HTMLVideoElement;
    private canvas: HTMLCanvasElement;
    private photo: HTMLPictureElement;

    private userFacingMode = "user";
    private environmentFacingMode = "environment";

    constructor(props: any) {
        super(props);
        this.takePhoto = this.takePhoto.bind(this);
        this.paintToCanvas = this.paintToCanvas.bind(this);
        this.flipCamera = this.flipCamera.bind(this);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            stream: undefined,
            facingMode: "",
            constraints: {},
            devices: []
        };
    }

    public async componentDidMount() {
        this.setStream(this.userFacingMode);
        this.paintToCanvas(this.video);
        this.getDevices();
    }

    public render() {
        return (
            <Grid container columns={2} stackable className="grid">
                <Grid.Column>
                    <Grid verticalAlign="middle" columns={1} centered >
                        <Grid.Row>
                            <Segment className="camera">
                                <video className="video" ref={(input) => { this.video = input; }}>
                                    Video stream not available.
                                </video>
                            </Segment>
                        </Grid.Row>
                        <Grid.Row>
                            <Button className="button" onClick={this.takePhoto} icon="camera" />
                            <Button className="button" onClick={this.flipCamera}>Flip Camera</Button>
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
                <canvas
                    className="canvas"
                    ref={(input) => { this.canvas = input; }}
                />
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
        return setInterval(() => {
            context.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
        }, 16);
    }

    private async flipCamera() {
        this.state.facingMode === this.userFacingMode
            ? this.setStream(this.environmentFacingMode)
            : this.setStream(this.userFacingMode);
    }

    private takePhoto() {
        const photo: PhotoBlob = {
            blobName: "blobname",
            text: this.canvas.toDataURL("image/jpeg")
        };
        console.log(`sent photo ${photo.blobName} from react`);
        console.dir(photo);
        axios.post("api/photo", photo);
        this.photo.setAttribute("src", photo.text);
    }
}
