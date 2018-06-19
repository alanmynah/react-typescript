import * as React from "react";
import { Message, List } from "semantic-ui-react";

export const LoginAttemptsList: React.SFC<{}> = () => (
    <Message size="large" positive>
        <p>
            This is a list page, you're logged in<br/>
        </p>
    </Message>
);
