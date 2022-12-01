import {config} from "../config";
import {instagramUsers} from '../devData/instagramUsersTest.js';

export const instagramRequests = (function () {

    return {
        getFollowersAndFollowing
    }

    async function getFollowersAndFollowing() {
        if (config.ENV === 'Dev') {
            return {followers: instagramUsers, following: []};
        }
        try {
            return (await fetch(`${config.INSTAGRAM_FOLLOWERS_BACKEND}/api/instagram`)).json();
        } catch (err) {
            return {followers: [], following: []}
        }
    }

})();
