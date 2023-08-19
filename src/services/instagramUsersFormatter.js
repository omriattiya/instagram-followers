import {instagramUsersUtils} from "./instagramUsersUtils";

export function formatInstagramUsers(instagramUsers) {
    const followers = instagramUsers.followers || [];
    const following = instagramUsers.following || [];
    return {
        followers,
        following,
        followingThatAreNotFollowers: instagramUsersUtils.findUsersDiff(followers, following),
        followersThatAreNotFollowing: instagramUsersUtils.findUsersDiff(following, followers),
    };
}
