import React, {useEffect, useMemo, useState} from 'react';
import _ from 'lodash';
import {instagramRequests} from "./services/instagramRequests";
import {localStorage} from "./services/localStorage";
import {Section} from "./components/section/Section";
import {ReloadButton} from "./components/reload-button/ReloadButton";
import './app.css';
import {USER_TYPE} from "./cosnts/userTypes";
import {instagramUsersUtils} from "./services/instagramUsersUtils";
import {
    Content,
    InstagramUserTypeButton,
    NavBar,
    ScreenWrapper,
    SectionWrapper,
    Title
} from "./styled";
import {checkUsersProvider} from "./services/checkUsersProvider";

function App() {

    const [instafollow, setInstafollow] = useState({
        followers: [], following: [], followingThatAreNotFollowers: [], followersThatAreNotFollowing: []
    });

    const [isLoading, setIsLoading] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const instagram = localStorage.loadInstagramUsers();
        clearNewFlag(instagram);
        if (!instagram.following.length && !instagram.followers.length) {
            loadFromInstagram(instagram);
        } else {
            setInstafollow({
                followers: instagram.followers,
                following: instagram.following,
                followingThatAreNotFollowers: instagram.followingThatAreNotFollowers,
                followersThatAreNotFollowing: instagram.followersThatAreNotFollowing,
            });
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        updateSelectedSection(_.find(sections, {title: selectedSection?.title}) || _.first(sections));
    }, [instafollow]);

    const sections = useMemo(() => ([{
        title: 'Don\'t Follow Back',
        followersList: instafollow.followingThatAreNotFollowers,
        type: USER_TYPE.FOLLOWING_THAT_ARE_NOT_FOLLOWERS,
    }, {
        title: 'Followers', followersList: instafollow.followers, type: USER_TYPE.FOLLOWER,
    }, {
        title: 'Following', followersList: instafollow.following, type: USER_TYPE.FOLLOWING,
    }, {
        title: 'I Don\'t Follow Back',
        followersList: instafollow.followersThatAreNotFollowing,
        type: USER_TYPE.FOLLOWERS_THAT_ARE_NOT_FOLLOWING,
    },]), [instafollow]);

    function clearNewFlag({followers, following, followingThatAreNotFollowers, followersThatAreNotFollowing}) {
        const clearNew = user => user.isNew = false;
        [...followers, ...following, ...followingThatAreNotFollowers, ...followersThatAreNotFollowing].forEach(clearNew);
    }

    function markNewUsers(oldFollowers) {
        instagramUsersUtils.getNewUsers(oldFollowers, instafollow).forEach(user => user.isNew = true);
    }

    function checkUsers(users) {
        const checkedUsers = checkUsersProvider.get();
        users.forEach(user => user.isChecked = checkedUsers.includes(user.username))
    }

    function updateSelectedSection(section) {
        checkUsers(section.followersList || []);
        setSelectedSection(section);
    }

    async function loadFromInstagram() {
        setIsLoading(true);
        const instagram = await instagramRequests.getFollowersAndFollowing();
        markNewUsers(instagram);
        localStorage.saveInstagramFollowers(instagram);
        setInstafollow({
            followers: instagram.followers,
            following: instagram.following,
            followingThatAreNotFollowers: instagram.followingThatAreNotFollowers,
            followersThatAreNotFollowing: instagram.followersThatAreNotFollowing,
        });
        setIsLoading(false);
    }

    return (<>
        <ScreenWrapper>
            <Title>INSTAFOLLOW</Title>
            <Content>
                <NavBar>
                    <ReloadButton isLoading={isLoading} reload={loadFromInstagram}/>
                    {sections.map(section => (
                        <InstagramUserTypeButton
                            key={section.title}
                            selected={selectedSection?.title === section.title}
                            onClick={() => updateSelectedSection(section)}
                        >
                            {section.title}
                        </InstagramUserTypeButton>
                    ))}
                </NavBar>
                {selectedSection && (
                    <SectionWrapper>
                        <Section
                            key={selectedSection.title}
                            title={selectedSection.title}
                            followersList={selectedSection.followersList}
                            type={selectedSection.type}
                        />
                    </SectionWrapper>
                )}
            </Content>
        </ScreenWrapper>
    </>);
}

export default App;
