import {config} from "../config";
import {instagramUsers} from '../devData/instagramUsersTest.js';
import {formatInstagramUsers} from "./instagramUsersFormatter";

export const instagramRequests = (function () {

    return {
        getFollowersAndFollowing
    }

    async function getFollowersAndFollowing() {
        if (config.ENV === 'Dev') {
            return {followers: instagramUsers, following: []};
        }
        try {
            const instagramUsers = await (await fetch(`${config.INSTAGRAM_FOLLOWERS_BACKEND}/api/instagram`)).json();
            return formatInstagramUsers(instagramUsers);
        } catch (err) {
            return formatInstagramUsers({});
        }
    }

})();
