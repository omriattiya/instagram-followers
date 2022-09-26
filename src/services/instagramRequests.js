import {config} from "../config";

export const instagramRequests = (function () {

    return {
        getFollowersAndFollowing
    }

    async function getFollowersAndFollowing() {
        try {
            return (await fetch(`http://${config.INSTAGRAM_FOLLOWERS_BACKEND}/api/instagram`)).json();
        } catch (err) {
            return {followers: [], following: []}
        }
    }

})();
