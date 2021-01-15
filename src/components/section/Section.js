import React from 'react';
import {Follower} from "../follower/Follower";
import './section.css';

export function Section({title, followersList, type}) {

    return (
        <div>
            <div className={'title'}>{title}</div>
            <hr/>
            {
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
            }
        </div>)
}
