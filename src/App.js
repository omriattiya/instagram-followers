import React, {useEffect, useState} from 'react';
import Loader from 'react-loader-spinner'
import {instagramRequests} from "./services/instagramRequests";
import {localStorage} from "./services/localStorage";
import {Section} from "./components/section/Section";
import {ReloadButton} from "./components/reload-button/ReloadButton";
import './app.css';

const loadAnyway = false;
const shouldSave = true;
const USER_TYPE = {FOLLOWER: 'follower', FOLLOWING: 'following', DIFF: 'diff'}

function App() {

    let [instafollow, setInstafollow] = useState({
        followers: [],
        following: [],
        diff: []
    });

    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        let instagram = {
            followers: localStorage.loadFollowers(),
            following: localStorage.loadFollowing(),
            diff: localStorage.loadDiff()
        }
        clearNewFlag(instagram);
        if (loadAnyway || (!instagram.following.length && !instagram.followers.length)) {
            loadFromInstagram(instagram);
        } else {
            setInstafollow({
                followers: instagram.followers,
                following: instagram.following,
                diff: instagram.diff
            });
            setIsLoading(false);
        }
    }, []);

    function clearNewFlag({followers, following, diff}) {
        const clearNew = user => user.isNew = false;
        [...followers, ...following, ...diff].forEach(clearNew);
    }

    function setNewUsers({followers, following, diff}) {
        let newFollowers = findDiffRight(instafollow.followers, followers);
        let newFollowing = findDiffRight(instafollow.following, following);
        let newDiff = findDiffRight(instafollow.diff, diff);

        const setNewFlag = user => user.isNew = true;
        [...newFollowers, ...newFollowing, ...newDiff].forEach(setNewFlag);
    }

    async function loadFromInstagram(instagram) {
        setIsLoading(true);
        instagram = await instagramRequests.getFollowersAndFollowing();
        instagram.diff = findDiffRight(instagram.followers, instagram.following);
        setNewUsers(instagram);
        if (shouldSave) {
            localStorage.saveFollowers(instagram.followers)
            localStorage.saveFollowing(instagram.following)
            localStorage.saveDiff(instagram.diff)
        }
        setInstafollow({
            followers: instagram.followers,
            following: instagram.following,
            diff: instagram.diff
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
                            followersList={instafollow.diff}
                            type={USER_TYPE.DIFF}
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
