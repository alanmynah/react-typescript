import * as React from "react";
import { Message } from "semantic-ui-react";

export const ThankYou: React.SFC<{}> = () => (
    <Message size="large" positive>
        <p>
            Thank you for registering with Camera Challenge App<br/>
        </p>
    </Message>
);
