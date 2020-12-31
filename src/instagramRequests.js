const fetch = require('node-fetch');
const config = require('./user.config.json');

const REQUEST_HEADERS = {headers: {cookie: config.cookie}};

const REQUEST = {
    followers: {
        queryUrl: `https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=`,
        key: `edge_followed_by`,
    },
    following: {
        queryUrl: `https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=`,
        key: `edge_follow`,
    }
}

export const instagramRequests = (function () {

    return {
        getFollowersAndFollowing
    }

    async function getFollowersAndFollowing() {
        try {
            let userId = await getUserId();
            let followers = await getAccounts(userId, REQUEST.followers);
            let following = await getAccounts(userId, REQUEST.following);
            return {followers, following};
        } catch (err) {
            console.error(err);
        }
        //
        // let followersStr = followers.map(v => JSON.stringify(v));
        // let followingStr = followings.map(v => JSON.stringify(v));
        // let diff = followingStr.filter(follower => !followersStr.includes(follower)).map(v => JSON.parse(v));
    }


    async function getAccounts(userId, request) {
        let followers = [];
        let hasNext = true;
        let after = null;
        while (hasNext) {
            await fetch(request.queryUrl + encodeURIComponent(JSON.stringify({
                id: userId,
                include_reel: true,
                fetch_mutual: true,
                first: 50,
                after: after
            })), REQUEST_HEADERS).then(res => res.json()).then(res => {
                hasNext = res.data.user[request.key].page_info.has_next_page
                after = res.data.user[request.key].page_info.end_cursor
                followers = followers.concat(res.data.user[request.key].edges.map(({node}) => {
                    return {
                        username: node.username,
                        full_name: node.full_name
                    }
                }))
            })
        }
        return followers;
    }

    async function getUserId() {
        let res = await fetch(`https://www.instagram.com/${config.username}/?__a=1`, REQUEST_HEADERS);
        res = await res.json();
        return res.graphql.user.id;
    }


})();
