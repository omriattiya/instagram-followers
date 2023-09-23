import React, {useState} from 'react';
import {Follower} from "../follower/Follower";
import './section.css';

export function Section({title, followersList, type, showTitle = false}) {

    const [showContent, setShowContent] = useState(true);

    const toggleShowContent = () => setShowContent(!showContent);

    return (<div className="section">
        {showTitle && (<div
            className="title"
            onClick={toggleShowContent}
        >
            {`${title} (${followersList.length})`}
        </div>)}
        <div className="users">
            {showContent && (followersList.map(user =>
                (<Follower
                    username={user.username}
                    fullName={user.fullName}
                    profilePicUrl={user.profilePicUrl}
                    userId={user.userId}
                    isPrivate={user.isPrivate}
                    type={type}
                    isNew={user.isNew}
                    key={user.username}
                />)
            ))}
        </div>
    </div>)
}
