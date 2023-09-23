import {localStorage} from "./localStorage";

export const checkUsersProvider = (function () {

    const users = localStorage.loadCheckedUsers();

    return {
        get,
        checkUser,
        uncheckUser,
    };

    function get() {
        return users;
    }

    function checkUser(username) {
        users.push(username);
        localStorage.saveCheckedUsers(users);
    }

    function uncheckUser(username) {
        const index = users.indexOf(username);
        users.splice(index, 1);
        localStorage.saveCheckedUsers(users);
    }

})();
