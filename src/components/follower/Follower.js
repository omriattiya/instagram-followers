import React from 'react';
import './follower.css';

const INSTAGRAM_ADDRESS = 'https://www.instagram.com';

export function Follower({username, fullName, profilePicUrl, type, isNew = false}) {

    function generateProfileLink() {
        return `${INSTAGRAM_ADDRESS}/${username}`;
    }

    return (
        <div className={'inline'}>
            <a href={generateProfileLink()}
               target={'_blank'}
               rel="noopener noreferrer"
               className="user-link"
            >
                <div className={['user-wrapper', type].join(' ')}>
                    <div className={'details-section'}>
                        <div className={'username'}>{username}</div>
                        <div className={'full-name'}>{fullName || <>&nbsp;</>}</div>
                    </div>
                    <div>
                        <img className={'profile-pic ' + type} src="/favicon.ico" alt={'profile pic'}/>
                    </div>
                    {
                        isNew &&
                        <div className={'new-user'}>
                            new!
                        </div>
                    }
                </div>
            </a>
        </div>
    )
}
