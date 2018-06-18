import * as React from "react";
import { Message } from "semantic-ui-react";

export const NoFaceError: React.SFC<{}> = () => (
    <Message size="large" negative>
        <p>
            Your image doesn't have a face. Fix it! <br/>
        </p>
    </Message>
);
