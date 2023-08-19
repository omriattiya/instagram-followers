import React, {useEffect, useMemo, useState} from 'react';
import {instagramRequests} from "./services/instagramRequests";
import {localStorage} from "./services/localStorage";
import {Section} from "./components/section/Section";
import {ReloadButton} from "./components/reload-button/ReloadButton";
import './app.css';
import {USER_TYPE} from "./cosnts/userTypes";

function App() {

    let [instafollow, setInstafollow] = useState({
        followers: [], following: [], followingThatAreNotFollowers: [], followersThatAreNotFollowing: []
    });

    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const instagram = localStorage.loadInstagramUsers();
        clearNewFlag(instagram);
        if (!instagram.following.length && !instagram.followers.length) {
            loadFromInstagram(instagram);
        } else {
            setInstafollow({
                followers: instagram.followers,
                following: instagram.following,
                followingThatAreNotFollowers: instagram.followingThatAreNotFollowers,
                followersThatAreNotFollowing: instagram.followersThatAreNotFollowing,
            });
            setIsLoading(false);
        }
    }, []);

    const sections = useMemo(() => ([{
        title: 'Don\'t Follow Back',
        followersList: instafollow.followingThatAreNotFollowers,
        type: USER_TYPE.FOLLOWING_THAT_ARE_NOT_FOLLOWERS,
    }, {
        title: 'Followers', followersList: instafollow.followers, type: USER_TYPE.FOLLOWER,
    }, {
        title: 'Following', followersList: instafollow.following, type: USER_TYPE.FOLLOWING,
    }, {
        title: 'I Don\'t Follow Back',
        followersList: instafollow.followersThatAreNotFollowing,
        type: USER_TYPE.FOLLOWERS_THAT_ARE_NOT_FOLLOWING,
    },]), [instafollow]);

    function clearNewFlag({followers, following, followingThatAreNotFollowers, followersThatAreNotFollowing}) {
        const clearNew = user => user.isNew = false;
        [...followers, ...following, ...followingThatAreNotFollowers, ...followersThatAreNotFollowing].forEach(clearNew);
    }

    function setNewUsers({followers, following, followingThatAreNotFollowers, followersThatAreNotFollowing}) {
        let newFollowers = findDiffRight(instafollow.followers, followers);
        let newFollowing = findDiffRight(instafollow.following, following);
        let newFollowingThatAreNotFollowers = findDiffRight(instafollow.followingThatAreNotFollowers, followingThatAreNotFollowers);
        let newFollowersThatAreNotFollowing = findDiffRight(instafollow.followersThatAreNotFollowing, followersThatAreNotFollowing);

        const setNewFlag = user => user.isNew = true;
        [...newFollowers, ...newFollowing, ...newFollowingThatAreNotFollowers, ...newFollowersThatAreNotFollowing].forEach(setNewFlag);
    }

    async function loadFromInstagram() {
        setIsLoading(true);
        const instagram = await instagramRequests.getFollowersAndFollowing();
        instagram.followingThatAreNotFollowers = findDiffRight(instagram.followers, instagram.following);
        instagram.followersThatAreNotFollowing = findDiffRight(instagram.following, instagram.followers);
        setNewUsers(instagram);
        localStorage.saveInstagramFollowers(instagram);
        setInstafollow({
            followers: instagram.followers,
            following: instagram.following,
            followingThatAreNotFollowers: instagram.followingThatAreNotFollowers,
            followersThatAreNotFollowing: instagram.followersThatAreNotFollowing,
        });
        setIsLoading(false);
    }

    function findDiffRight(followersGroup1, followersGroup2) {
        let group1Users = followersGroup1.map(user => user.username);
        let group2Users = followersGroup2.map(user => user.username);
        let diffUsers = group2Users.filter(username => !group1Users.includes(username));
        return followersGroup2.filter(user => diffUsers.includes(user.username));
    }

    return (<>
        <div className={'reload-button-container'}>
            <ReloadButton isLoading={isLoading} reload={loadFromInstagram}/>
        </div>
        <div>
            {sections.map(section => (<Section
                key={section.title}
                title={section.title}
                followersList={section.followersList}
                type={section.type}
            />))}
        </div>
    </>);
}

export default App;
