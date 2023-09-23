import React, {useState} from 'react';
import './follower.css';
import {Checkbox} from "./styled";
import {checkUsersProvider} from "../../services/checkUsersProvider";

const INSTAGRAM_ADDRESS = 'https://www.instagram.com';

export function Follower(
    {
        username,
        fullName,
        profilePicUrl,
        type,
        isNew = false,
        isPrivate,
        userId,
        isChecked,
        allowCheck
    }) {

    const [checked, setChecked] = useState(isChecked);

    function generateProfileLink() {
        return `${INSTAGRAM_ADDRESS}/${username}`;
    }

    function toggleCheck(event) {
        event.preventDefault();
        setChecked(!checked);
        if (checked) {
            checkUsersProvider.uncheckUser(username);
        } else {
            checkUsersProvider.checkUser(username);
        }
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
                    {allowCheck &&
                        <Checkbox src={checkSrc} onClick={toggleCheck} checked={checked}/>
                    }
                </div>
            </a>
        </div>
    );
}
