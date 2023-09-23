import React, {useState} from 'react';
import _ from 'lodash';
import {Follower} from "../follower/Follower";
import {USER_TYPE} from "../../cosnts/userTypes";
import './section.css';

const ALLOW_CHECK_TYPES = [USER_TYPE.FOLLOWING_THAT_ARE_NOT_FOLLOWERS];

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
                    isChecked={user.isChecked}
                    allowCheck={_.includes(ALLOW_CHECK_TYPES, type)}
                />)
            ))}
        </div>
    </div>)
}
