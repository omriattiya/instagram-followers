import React, {useState} from 'react';
import {Follower} from "../follower/Follower";
import './section.css';

export function Section({title, followersList, type}) {

    const [showContent, setShowContent] = useState(true);

    const toggleShowContent = () => setShowContent(!showContent);

    return (
        <div className="section">
            <div
                className="title"
                onClick={toggleShowContent}
            >
                {`${title} (${followersList.length})`}
            </div>
            {
                showContent && (
                    followersList.map(user => (
                        <Follower
                            username={user.username}
                            fullName={user.fullName}
                            profilePicUrl={user.profilePicUrl}
                            type={type}
                            isNew={user.isNew}
                            key={user.username}
                        />
                    ))
                )
            }
        </div>)
}