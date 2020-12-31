const FOLLOWERS_KEY = 'followers';
const FOLLOWING_KEY = 'following';


export const localStorage = (function () {
    const localStorage = window.localStorage;

    return {
        saveFollowers,
        saveFollowing,
        loadFollowers,
        loadFollowing
    }

    function saveFollowers(followers) {
        localStorage.setItem(FOLLOWERS_KEY, JSON.stringify(followers));
    }
    function saveFollowing(following) {
        localStorage.setItem(FOLLOWING_KEY, JSON.stringify(following));
    }

    function loadFollowers() {
        return JSON.parse(localStorage.getItem(FOLLOWERS_KEY)) || [];
    }

    function loadFollowing() {
        return JSON.parse(localStorage.getItem(FOLLOWING_KEY)) || [];
    }

})();
