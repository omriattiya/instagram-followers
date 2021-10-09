import React, {useEffect, useState} from 'react';
import Loader from 'react-loader-spinner'
import {instagramRequests} from "./services/instagramRequests";
import {localStorage} from "./services/localStorage";
import {Section} from "./components/section/Section";
import {ReloadButton} from "./components/reload-button/ReloadButton";
import './app.css';

const loadAnyway = false;
const shouldSave = true;
const USER_TYPE = {
    FOLLOWER: 'follower',
    FOLLOWING: 'following',
    FOLLOWING_THAT_ARE_NOT_FOLLOWERS: 'followingThatAreNotFollowers'
};

function App() {

    let [instafollow, setInstafollow] = useState({
        followers: [],
        following: [],
        followingThatAreNotFollowers: []
    });

    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        let instagram = {
            followers: localStorage.loadFollowers(),
            following: localStorage.loadFollowing(),
            followingThatAreNotFollowers: localStorage.loadFollowingThatAreNotFollowers()
        }
        clearNewFlag(instagram);
        if (loadAnyway || (!instagram.following.length && !instagram.followers.length)) {
            loadFromInstagram(instagram);
        } else {
            setInstafollow({
                followers: instagram.followers,
                following: instagram.following,
                followingThatAreNotFollowers: instagram.followingThatAreNotFollowers
            });
            setIsLoading(false);
        }
    }, []);

    function clearNewFlag({followers, following, followingThatAreNotFollowers}) {
        const clearNew = user => user.isNew = false;
        [...followers, ...following, ...followingThatAreNotFollowers].forEach(clearNew);
    }

    function setNewUsers({followers, following, followingThatAreNotFollowers}) {
        let newFollowers = findDiffRight(instafollow.followers, followers);
        let newFollowing = findDiffRight(instafollow.following, following);
        let newFollowingThatAreNotFollowers = findDiffRight(instafollow.followingThatAreNotFollowers, followingThatAreNotFollowers);

        const setNewFlag = user => user.isNew = true;
        [...newFollowers, ...newFollowing, ...newFollowingThatAreNotFollowers].forEach(setNewFlag);
    }

    async function loadFromInstagram(instagram) {
        setIsLoading(true);
        instagram = await instagramRequests.getFollowersAndFollowing();
        instagram.followingThatAreNotFollowers = findDiffRight(instagram.followers, instagram.following);
        setNewUsers(instagram);
        if (shouldSave) {
            localStorage.saveFollowers(instagram.followers)
            localStorage.saveFollowing(instagram.following)
            localStorage.saveFollowingThatAreNotFollowers(instagram.followingThatAreNotFollowers)
        }
        setInstafollow({
            followers: instagram.followers,
            following: instagram.following,
            followingThatAreNotFollowers: instagram.followingThatAreNotFollowers
        });
        setIsLoading(false);
    }

    function findDiffRight(followersGroup1, followersGroup2) {
        let group1Users = followersGroup1.map(user => user.username);
        let group2Users = followersGroup2.map(user => user.username);
        let diffUsers = group2Users.filter(username => !group1Users.includes(username));
        return followersGroup2.filter(user => diffUsers.includes(user.username));
    }

    return (
        <div>
            <div className={'reload-button-container'}>
                <ReloadButton isLoading={isLoading} reload={loadFromInstagram}/>
            </div>
            {!isLoading ?
                (
                    <div>
                        <Section
                            title={`Don't Follow Back`}
                            followersList={instafollow.followingThatAreNotFollowers}
                            type={USER_TYPE.FOLLOWING_THAT_ARE_NOT_FOLLOWERS}
                        />
                        <Section
                            title={'Followers'}
                            followersList={instafollow.followers}
                            type={USER_TYPE.FOLLOWER}
                        />
                        <Section
                            title={'Following'}
                            followersList={instafollow.following}
                            type={USER_TYPE.FOLLOWING}
                        />
                    </div>
                )
                :
                (
                    <div className={'loader-spinner'}>
                        <Loader type="Oval" color="#00BFFF" height={150} width={150}/>
                    </div>
                )
            }
        </div>
    );
}

export default App;
