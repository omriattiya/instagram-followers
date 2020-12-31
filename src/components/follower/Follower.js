import React from 'react';
import './follower.css';

const INSTAGRAM_ADDRESS = 'https://www.instagram.com';

export function Follower({username, fullName, profilePicUrl, type}) {

    function generateProfileLink() {
        return `${INSTAGRAM_ADDRESS}/${username}`;
    }

    return (
        <div className={'inline'}>
            <div className={['user-wrapper', type].join(' ')}>
            <div className={'details-section'}>
                <a href={generateProfileLink()} target={'_blank'} rel="noopener noreferrer" className={'username'}>{username}</a>
                <div className={'full-name'}>{fullName || <>&nbsp;</>}</div>
            </div>
            <div>
                <img className={'profile-pic ' + type} src={profilePicUrl} alt={'profile pic'}/>
            </div>
            </div>
        </div>
    )
}
