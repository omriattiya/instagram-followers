export const instagramUsersUtils = {
    findUsersDiff,
    getNewUsers,
}

function findUsersDiff(followersGroup1, followersGroup2) {
    const group1Users = followersGroup1.map(user => user.username);
    const group2Users = followersGroup2.map(user => user.username);
    const diffUsers = group2Users.filter(username => !group1Users.includes(username));
    return followersGroup2.filter(user => diffUsers.includes(user.username));
}

function getNewUsers(oldUsers, newUsers) {
    let newFollowers = instagramUsersUtils.findUsersDiff(newUsers.followers, oldUsers.followers);
    let newFollowing = instagramUsersUtils.findUsersDiff(newUsers.following, oldUsers.following);
    let newFollowingThatAreNotFollowers = instagramUsersUtils.findUsersDiff(newUsers.followingThatAreNotFollowers, oldUsers.followingThatAreNotFollowers);
    let newFollowersThatAreNotFollowing = instagramUsersUtils.findUsersDiff(newUsers.followersThatAreNotFollowing, oldUsers.followersThatAreNotFollowing);

    return [...newFollowers, ...newFollowing, ...newFollowingThatAreNotFollowers, ...newFollowersThatAreNotFollowing];
}
