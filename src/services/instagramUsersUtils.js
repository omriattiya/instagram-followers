export const instagramUsersUtils = {
    findUsersDiff,
}

function findUsersDiff(followersGroup1, followersGroup2) {
    const group1Users = followersGroup1.map(user => user.username);
    const group2Users = followersGroup2.map(user => user.username);
    const diffUsers = group2Users.filter(username => !group1Users.includes(username));
    return followersGroup2.filter(user => diffUsers.includes(user.username));
}
