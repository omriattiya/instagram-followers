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

        if (loadAnyway || (!instagram.following.length && !instagram.followers.length)) {
            loadFromInstagram(instagram);
        } else {
            setInstafollow({
                followers: instagram.followers,
                following: instagram.following,
                diff: findDiff(instagram.followers, instagram.following)
            });
            setIsLoading(false);
        }
    }, []);

    async function loadFromInstagram(instagram) {
        setIsLoading(true);
        instagram = await instagramRequests.getFollowersAndFollowing();
        if (shouldSave) {
            localStorage.saveFollowers(instagram.followers)
            localStorage.saveFollowing(instagram.following)
            localStorage.saveDiff(findDiff(instagram.followers, instagram.following))
        }
        setInstafollow({
            followers: instagram.followers,
            following: instagram.following,
            diff: findDiff(instagram.followers, instagram.following)
        });
        setIsLoading(false);
    }

    function findDiff(followers, followings) {
        let followersUsers = followers.map(user => user.username);
        let followingUsers = followings.map(user => user.username);
        let diffUsers = followingUsers.filter(username => !followersUsers.includes(username));
        return followings.filter(user => diffUsers.includes(user.username));
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
