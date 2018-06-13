import * as React from "react";
import { Message } from "semantic-ui-react";

export const ValidationError: React.SFC<{}> = () => (
    <Message size="large" negative>
        <p>
            Please only use a-z, ' or - <br/>
        </p>
    </Message>
);
