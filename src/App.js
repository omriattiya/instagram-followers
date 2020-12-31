import React, {useState, useEffect} from 'react';
import {instagramRequests} from "./services/instagramRequests";
import {localStorage} from "./services/localStorage";
import {Follower} from "./components/Follower";

const USER_TYPE = {FOLLOWER: 'follower', FOLLOWING: 'following'}

const loadAnyway = false;
const shouldSave = true;

function App() {

    let [followers, setFollowers] = useState([]);
    let [following, setFollowing] = useState([]);

    useEffect(() => {
        (async () => {
            let instagram = {
                followers: localStorage.loadFollowers(),
                following: localStorage.loadFollowing()
            }

            if (loadAnyway || (!instagram.following.length && !instagram.followers.length)) {
                instagram = await instagramRequests.getFollowersAndFollowing();
                if (shouldSave) {
                    localStorage.saveFollowers(instagram.followers)
                    localStorage.saveFollowing(instagram.following)
                }
            }

            setFollowers(instagram.followers);
            setFollowing(instagram.following);
        })();
    }, []);

    return (
        <div>
            {
                followers.map(user => (
                    <Follower
                        username={user.username}
                        fullName={user.fullName}
                        profilePicUrl={user.profilePicUrl}
                        type={USER_TYPE.FOLLOWER}
                        key={user.username}
                    />
                ))
            }
            {
                following.map(user => (
                    <Follower
                        username={user.username}
                        fullName={user.full_name}
                        profilePicUrl={user.profilePicUrl}
                        type={USER_TYPE.FOLLOWING}
                        key={user.username}
                    />
                ))
            }
        </div>
    );
}

export default App;
