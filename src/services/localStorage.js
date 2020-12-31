const FOLLOWERS_KEY = 'followers';
const FOLLOWING_KEY = 'following';
const DIFF_KEY = 'diff';


export const localStorage = (function () {
    const localStorage = window.localStorage;

    return {
        saveFollowers,
        saveFollowing,
        saveDiff,
        loadFollowers,
        loadFollowing,
        loadDiff
    }

    function saveFollowers(followers) {
        localStorage.setItem(FOLLOWERS_KEY, JSON.stringify(followers));
    }

    function saveFollowing(following) {
        localStorage.setItem(FOLLOWING_KEY, JSON.stringify(following));
    }

    function saveDiff(diff) {
        localStorage.setItem(DIFF_KEY, JSON.stringify(diff));
    }

    function loadFollowers() {
        return JSON.parse(localStorage.getItem(FOLLOWERS_KEY)) || [];
    }

    function loadFollowing() {
        return JSON.parse(localStorage.getItem(FOLLOWING_KEY)) || [];
    }

    function loadDiff() {
        return JSON.parse(localStorage.getItem(DIFF_KEY)) || [];
    }

})();
