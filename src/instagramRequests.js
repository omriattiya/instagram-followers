export const instagramRequests = (function () {

    return {
        getFollowersAndFollowing
    }

    async function getFollowersAndFollowing() {
        try {
            return (await fetch(`http://localhost:3001/api/instagram`)).json();
        } catch (err) {
            return {followers: [], following: []}
        }
    }

})();
