import React, {useState, useEffect} from 'react';
import {instagramRequests} from "./services/instagramRequests";
import {localStorage} from "./services/localStorage";

function App() {

    let [followers, setFollowers] = useState([]);
    let [following, setFollowing] = useState([]);

    useEffect(() => {
        (async () => {
            let instagram = {
                followers: localStorage.loadFollowers(),
                following: localStorage.loadFollowing()
            }

            if(!instagram.following.length && !instagram.followers.length) {
                instagram = await instagramRequests.getFollowersAndFollowing();
                localStorage.saveFollowers(instagram.followers)
                localStorage.saveFollowing(instagram.following)
            }

            setFollowers(instagram.followers);
            setFollowing(instagram.following);
        })();
    }, []);

    return (
        <div>
          {
            followers.map(follower => (
                <div key={follower.username}>
                  {follower.username}
                </div>
            ))
          }
        </div>
    );
}

export default App;
