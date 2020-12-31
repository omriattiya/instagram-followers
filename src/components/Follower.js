import React from 'react';
import './follower.css';

export function Follower({username, fullName, profilePicUrl, type}) {

    return (
        <div className={'inline'}>
            <div className={['user-wrapper', type].join(' ')}>
            <div className={'details-section'}>
                <div className={'username'}>{username}</div>
                <div className={'full-name'}>{fullName || <>&nbsp;</>}</div>
            </div>
            <div>
                <img className={'profile-pic ' + type} src={profilePicUrl}/>
            </div>
            </div>
        </div>
    )
}
