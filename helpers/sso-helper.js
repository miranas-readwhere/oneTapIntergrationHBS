const { default: axios } = require("axios");

oneTapLoginHelper = async (credential) => {
    try {
        var config = {
            method: "post",
            url: "http://localhost:5004/v2/sso/onetaplogin",
            data: {
                credential,
            },
        };
        const response = await axios(config);
        if (response.data.status) {
            return response.data.data;
        }
        console.log(response.data.error);
        return false;
    } catch (error) {
        console.log("Error in Logging In");
        return false;
    }
};

checkLoginHelper = async (token, userId) => {
    try {
        var config = {
            method: "post",
            url: "http://localhost:5004/v2/sso/checklogin",
            data: {
                token: token,
                userId: userId,
            },
        };
        const response = await axios(config);
        if (response.data.status) return response.data.data;
        console.log(response.data.error);
        return false;
    } catch (error) {
        console.log("Error in checkLogin");
        return false;
    }
};
logoutHelper = async (token) => {
    try {
        var config = {
            method: "post",
            url: "http://localhost:5004/v2/sso/logout",
            data: {
                token: token,
            },
        };
        const response = await axios(config);
        if (response.data.status) return response.data.data;
        console.log(response.data.error);
        return false;
    } catch (error) {
        console.log("Error Loggin Out");
        return false;
    }
};

module.exports = {
    oneTapLoginHelper,
    checkLoginHelper,
    logoutHelper,
};
