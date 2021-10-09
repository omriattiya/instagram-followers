export const instagramRequests = (function () {

    return {
        getFollowersAndFollowing
    }

    async function getFollowersAndFollowing() {
        try {
            return (await fetch(`http://192.168.1.25:8080/api/instagram`)).json();
        } catch (err) {
            return {followers: [], following: []}
        }
    }

})();
