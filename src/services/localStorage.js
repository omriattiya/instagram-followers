const FOLLOWERS_KEY = 'followers';
const FOLLOWING_KEY = 'following';
const DIFF_FOLLOWING_THAT_ARE_NOT_FOLLOWERS_KEY = 'followingThatAreNotFollowers';
const DIFF_FOLLOWERS_THAT_ARE_NOT_FOLLOWING_KEY = 'followersThatAreNotFollowing';


export const localStorage = (function () {
    const localStorage = window.localStorage;

    return {
        saveInstagramFollowers,
        loadInstagramUsers,
    }

    function saveFollowers(followers) {
        localStorage.setItem(FOLLOWERS_KEY, JSON.stringify(followers));
    }

    function saveFollowing(following) {
        localStorage.setItem(FOLLOWING_KEY, JSON.stringify(following));
    }

    function saveFollowingThatAreNotFollowers(diff) {
        localStorage.setItem(DIFF_FOLLOWING_THAT_ARE_NOT_FOLLOWERS_KEY, JSON.stringify(diff));
    }

    function saveFollowersThatAreNotFollowing(diff) {
        localStorage.setItem(DIFF_FOLLOWERS_THAT_ARE_NOT_FOLLOWING_KEY, JSON.stringify(diff));
    }

    function loadFollowers() {
        return JSON.parse(localStorage.getItem(FOLLOWERS_KEY)) || [];
    }

    function loadFollowing() {
        return JSON.parse(localStorage.getItem(FOLLOWING_KEY)) || [];
    }

    function loadFollowingThatAreNotFollowers() {
        return JSON.parse(localStorage.getItem(DIFF_FOLLOWING_THAT_ARE_NOT_FOLLOWERS_KEY)) || [];
    }

    function loadFollowersThatAreNotFollowing() {
        return JSON.parse(localStorage.getItem(DIFF_FOLLOWERS_THAT_ARE_NOT_FOLLOWING_KEY)) || [];
    }

    function saveInstagramFollowers(instagram) {
        saveFollowers(instagram.followers)
        saveFollowing(instagram.following)
        saveFollowingThatAreNotFollowers(instagram.followingThatAreNotFollowers);
        saveFollowersThatAreNotFollowing(instagram.followersThatAreNotFollowing);
    }

    function loadInstagramUsers() {
        return {
            followers: loadFollowers(),
            following: loadFollowing(),
            followingThatAreNotFollowers: loadFollowingThatAreNotFollowers(),
            followersThatAreNotFollowing: loadFollowersThatAreNotFollowing(),
        }
    }
})();
