import React from 'react';
import {ReloadButton} from "../components/reload-button/ReloadButton";

export default {
    title: 'Example/ReloadButton',
    component: ReloadButton,
};

const Template = (args) => <ReloadButton {...args} />;

export const defaultButton = Template.bind({});
defaultButton.args = {};
