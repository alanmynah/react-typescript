import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, Grid, Image, Segment } from "semantic-ui-react";

interface CameraProps {
    width: number;
    height: number;
}

interface CameraState {
    width: number;
    height: number;
    stream: MediaStream;
    facingMode: string;
}

export class Camera extends React.Component<CameraProps, CameraState> {
    private video: HTMLVideoElement;
    private canvas: HTMLCanvasElement;
    private photo: HTMLPictureElement;

    constructor(props: any) {
        super(props);
        this.takePhoto = this.takePhoto.bind(this);
        this.paintToCanvas = this.paintToCanvas.bind(this);
        this.flipCamera = this.flipCamera.bind(this);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            stream: undefined,
            facingMode: "user"
        };
    }

    public async componentDidMount() {
        this.setState({
            stream: await navigator.mediaDevices.getUserMedia({
                video: {
                    width: this.state.width,
                    height: this.state.height,
                    facingMode: this.state.facingMode
                },
                audio: false
            })
        });
        this.video.srcObject = this.state.stream;
        this.paintToCanvas(this.video);
        console.dir(this.state);
    }

    public async componentWillUnmount() {
        await this.state.stream.getVideoTracks()[0].stop();
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
    //     console.dir(this.state);
    //     if (this.state.facingMode === "user") {
    //         this.setState({
    //             stream: await navigator.mediaDevices.getUserMedia({
    //                 video: {
    //                     width: this.state.width,
    //                     height: this.state.height,
    //                     facingMode: "envinronment"
    //                 },
    //                 audio: false
    //             }),
    //             facingMode: "envinronment"
    //         });
    //     } else {
    //         this.setState({
    //             stream: await navigator.mediaDevices.getUserMedia({
    //                 video: {
    //                     width: this.state.width,
    //                     height: this.state.height,
    //                     facingMode: "user"
    //                 },
    //                 audio: false
    //             }),
    //             facingMode: "user"
    //         });
    //     }
    }

    private async takePhoto() {
        const photo = this.canvas.toDataURL("image/png");
        this.photo.setAttribute("src", photo);
    }

    public render() {
        return (
            <   Grid container columns={2} stackable className="grid">
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
                            <Button className="button" ref="button" onClick={this.takePhoto} icon="camera" />
                            <Button className="button" ref="button" onClick={this.flipCamera} >Flip Camera</Button>
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
            </  Grid >
        );
    }
}
