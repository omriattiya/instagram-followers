import React, {useState, useEffect} from 'react';
import {instagramRequests} from "./instagramRequests";

function App() {

    let [followers, setFollowers] = useState([]);
    let [following, setFollowing] = useState([]);

    useEffect(() => {
        (async () => {
            let instagram = await instagramRequests.getFollowersAndFollowing();
            setFollowers(instagram.followers || []);
            setFollowing(instagram.following || []);
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
