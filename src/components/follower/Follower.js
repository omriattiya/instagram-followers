import React from 'react';
import './follower.css';

const INSTAGRAM_ADDRESS = 'https://www.instagram.com';

export function Follower({username, fullName, profilePicUrl, type, isNew = false, isPrivate, userId}) {

    function generateProfileLink() {
        return `${INSTAGRAM_ADDRESS}/${username}`;
    }

    return (
        <div className="inline">
            <a href={generateProfileLink()}
               target="_blank"
               rel="noopener noreferrer"
               className="user-link"
            >
                <div className={['user-wrapper', type].join(' ')}>
                    <div className="details-section">
                        <div className="username">{username}</div>
                        <div className="full-name">{fullName || <>&nbsp;</>}</div>
                    </div>
                    {
                        isPrivate && <img src="/lock-gray.svg" className="lock"  alt="lock"/>
                    }
                    {
                        isNew &&
                        <div className="new-user">
                            new!
                        </div>
                    }
                </div>
            </a>
        </div>
    )
}
