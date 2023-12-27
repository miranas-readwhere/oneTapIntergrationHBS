(function (window, undefined) {
    var document = window.document;
    deEvents = {
        checkLogin: "checkLoginEvent",
        onTapLogin: "oneTapLoginEvent",
    };
    const deConfig = {};

    setUserData = () => {
        const userData = $.cookie("user");
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            deConfig.user = parsedUserData;
            $('.navbar ul li:contains("Logout")').show();
            $('.navbar ul li:contains("Logout")').on("click", function (e) {
                e.preventDefault();
                logout();
            });
            $(".content h1").text(`Welcome ${deConfig.user.name}`);
        } else {
            deConfig.user = {};
            $(".content h1").text(`Welcome Guest`);
            $('.navbar ul li:contains("Logout")').hide();
            $('.navbar ul li:contains("Logout")').off("click");
        }
    };

    displayOneTapLogin = () => {
        var oneTapDiv = $("<div>", {
            id: "g_id_onload",
            "data-client_id":
                "425934262472-8p27v9nskhjvte23l6p1138q2p6sbgcs.apps.googleusercontent.com",
            "data-context": "signin",
            "data-callback": "oneTapLogin12",
            "data-itp_support": "true",
        });

        $("body").append(oneTapDiv);
    };

    oneTapLogin12 = (data) => {
        const { credential } = data;
        $.ajax({
            url: `/oneTapLogin`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ credential: credential }),
            success: function (result) {
                if (result.status) {
                    setUserData();
                }
            },
            error: function (error) {
                console.log("Error in Logging In");
            },
        });
    };
    function checkLogin12() {
        $.ajax({
            url: `/checkLogin`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                token: "afd",
                userId: "fdsaf",
            }),
            success: function (result) {
                if (!result.status || !result.data.loggedIn) {
                    displayOneTapLogin();
                } else {
                    setUserData();
                }
            },
            error: function (error) {
                console.log("Error in checking in  loggedIn User");
                displayOneTapLogin();
            },
        });
    }

    function logout() {
        $.ajax({
            url: `/logout`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                token: deConfig.user.token,
            }),
            success: function (result) {
                setUserData();
            },
            error: function (error) {
                console.log("Error Loggin Out");
            },
        });
    }
    $(document).ready(function () {
        $(window).bind(deEvents.checkLogin, checkLogin12);
        $(window).trigger(deEvents.checkLogin);
    });
})(window);
