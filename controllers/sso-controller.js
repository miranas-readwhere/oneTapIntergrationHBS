const {
    checkLoginHelper,
    oneTapLoginHelper,
    logoutHelper,
} = require("../helpers/sso-helper");
const cookie = require("cookie");

const getHomePage = (req, res) => {
    res.render("homepage");
};
const oneTapLogin = async (req, res) => {
    const { credential } = req.body;

    const response = await oneTapLoginHelper(credential);
    if (!response) {
        return res.json({ msg: "User Login Failed" });
    }
    const { msg, user } = response;
    req.session.userId = user.user_id;
    req.session.token = user.token;
    res.cookie("user", JSON.stringify(user), {
        maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ status: true, data: { msg: "Succesfully Logged In" } });
};

const checkLogin = async (req, res) => {
    if (req.session.token && req.session.userId) {
        const response = await checkLoginHelper(
            req.session.token,
            req.session.userId
        );

        if (response && response.loggedIn) {
            res.cookie("user", JSON.stringify(response.user), {
                maxAge: 24 * 60 * 60 * 1000,
            });
            return res.json({ status: true, data: { loggedIn: true } });
        }
    }
    // const cook = req.headers.cookie;
    // let user;
    // if (cook) {
    //     const parsedCookie = cookie.parse(cook);
    //     user = parsedCookie.user ? JSON.parse(parsedCookie.user) : undefined;
    // }
    // if (user) {
    //     const response = await checkLoginHelper(user.token, user.user_id);
    //     if (response && response.loggedIn) {
    //         console.log(response);
    //         return res.json({ status: true, data: response });
    //     }
    // }
    req.session.destroy();
    res.clearCookie("user");
    return res.json({ status: true, data: { loggedIn: false } });
};
const logout = async (req, res) => {
    const { token } = req.body;
    const response = await logoutHelper(token);
    req.session.destroy();
    res.clearCookie("user");
    res.json("Logout");
};

module.exports = {
    getHomePage,
    checkLogin,
    oneTapLogin,
    logout,
};
