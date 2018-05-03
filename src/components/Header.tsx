import * as React from "react";
import { Container, Dropdown, Menu } from "semantic-ui-react";

export const Header: React.SFC<{}> = () => (
    <Menu fixed="top" inverted>
        <Container>
            <Menu.Item as="a" header>
                React-Typescript Project
            </Menu.Item>
        </Container>
    </Menu>
);
