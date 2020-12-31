import React, {useEffect, useState} from 'react';
import {instagramRequests} from "./services/instagramRequests";
import {localStorage} from "./services/localStorage";
import {Section} from "./components/section/Section";
import {follower} from "./stories/Follower.stories";

const loadAnyway = false;
const shouldSave = true;
const USER_TYPE = {FOLLOWER: 'follower', FOLLOWING: 'following', DIFF: 'diff'}

function App() {

    let [instafollow, setInstafollow] = useState({
        followers: [],
        following: [],
        diff: []
    });

    useEffect(() => {
        (async () => {
            let instagram = {
                followers: localStorage.loadFollowers(),
                following: localStorage.loadFollowing(),
                diff: localStorage.loadDiff()
            }

            if (loadAnyway || (!instagram.following.length && !instagram.followers.length)) {
                instagram = await instagramRequests.getFollowersAndFollowing();
                if (shouldSave) {
                    localStorage.saveFollowers(instagram.followers)
                    localStorage.saveFollowing(instagram.following)
                    localStorage.saveDiff(findDiff(instagram.followers, instagram.following))
                }
            }

            setInstafollow({
                followers: instagram.followers,
                following: instagram.following,
                diff: findDiff(instagram.followers, instagram.following)
            });
        })();
    }, []);

    function findDiff(followers, followings) {
        let followersStr = followers.map(v => JSON.stringify(v));
        let followingStr = followings.map(v => JSON.stringify(v));
        return followingStr.filter(follower => !followersStr.includes(follower)).map(v => JSON.parse(v));
    }

    return (
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
    );
}

export default App;
