import React, {useState} from 'react';
import './follower.css';
import {Checkbox} from "./styled";

const INSTAGRAM_ADDRESS = 'https://www.instagram.com';

export function Follower({username, fullName, profilePicUrl, type, isNew = false, isPrivate, userId}) {

    const [checked, setChecked] = useState(false);

    function generateProfileLink() {
        return `${INSTAGRAM_ADDRESS}/${username}`;
    }

    function toggleCheck(event) {
        event.stopPropagation();
        event.preventDefault();
        setChecked(!checked);
    }

    const checkSrc = checked ? '/selection-box-on.svg' : '/selection-box-off.svg';

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
                    {isPrivate && <img src="/lock-gray.svg" className="lock" alt="lock"/>}
                    {isNew && <div className="new-user"> new! </div>}
                    <Checkbox src={checkSrc} onClick={toggleCheck} checked={checked}/>
                </div>
            </a>
        </div>
    );
}
