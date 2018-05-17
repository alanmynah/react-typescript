import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "semantic-ui-react";

interface CameraState {
    width: number;
    height: number;
}

export class Camera extends React.Component<{}, CameraState> {
    private video: HTMLVideoElement;
    private canvas: HTMLCanvasElement;
    private photo: HTMLPictureElement;
    private startButton: HTMLButtonElement;

    constructor(props: any) {
        super(props);
        this.takePhoto = this.takePhoto.bind(this);
        this.paintToCanvas = this.paintToCanvas.bind(this);
        this.state = {
            width: 320,
            height: 240,
        };
    }

    public async componentDidMount() {
        this.video.srcObject = await navigator.mediaDevices.getUserMedia({
            video: {width: this.state.width, height: this.state.height},
            audio: false
        });
        this.paintToCanvas(this.video);
    }

    private paintToCanvas(video: HTMLVideoElement) {
        this.canvas.width = this.state.width;
        this.canvas.height = this.state.height;
        const context = this.canvas.getContext("2d");
        return setInterval(() => {
            context.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
        }, 16);
    }

    private takePhoto() {
        const photo = this.canvas.toDataURL("image/png");
        this.photo.setAttribute("src", photo);
    }

    public render() {
        return (
            <div>
                <div className="camera">
                    <video
                        className="video"
                        ref={(input) => { this.video = input; }}>
                        Video stream not available.
                    </video>
                    <button className="button" ref="button" onClick={this.takePhoto}>Take photo</button>
                </div>
                <canvas
                    className="canvas"
                    ref={(input) => { this.canvas = input; }}
                />
                <div className="output">
                    <img
                        className="photo"
                        ref={(input) => { this.photo = input; }}
                        alt="The screen capture will appear in this box."
                    />
                </div>
            </div>
        );
    }
}
