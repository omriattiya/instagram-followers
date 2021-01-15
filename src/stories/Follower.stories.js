import React from 'react';
import {Follower} from "../components/follower/Follower";

export default {
    title: 'Example/Follower',
    component: Follower,
};

const PROFILE_PIC_URL = `https://instagram.ftlv2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/115865907_1292899327709961_7588389500256706775_n.jpg?_nc_ht=instagram.ftlv2-1.fna.fbcdn.net&_nc_ohc=3RXNnQeH7HcAX81aSJk&tp=1&oh=adfb6f17a7fe8dff41252732882081b6&oe=60176A6C`;

const Template = (args) => <Follower {...args} />;

export const follower = Template.bind({});
follower.args = {
    username: 'some user name',
    fullName: 'עמרי הגבר',
    type: 'follower',
    profilePicUrl: PROFILE_PIC_URL,
};

export const following = Template.bind({});
following.args = {
    username: 'some user name',
    fullName: 'עמרי הגבר',
    type: 'following',
    profilePicUrl: PROFILE_PIC_URL
};

export const newUser = Template.bind({});
newUser.args = {
    username: 'some user name that is a very log name',
    fullName: 'עמרי הגבר אבל ממש ממש ארוך כדי לבדוק משהו',
    type: 'following',
    profilePicUrl: PROFILE_PIC_URL,
    isNew: true
};
