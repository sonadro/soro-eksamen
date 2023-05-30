// controller
module.exports.home_get = (req, res) => {
    res.render('index', { title: 'Hjem' });
};

module.exports.signin_get = (req, res) => {
    res.render('signin', { title: 'Sign in' });
};

module.exports.signup_get = (req, res) => {
    res.render('signup', { title: 'Sign up' });
};

module.exports.user_get = (req, res) => {
    const username = req.params.username;

    if (res.locals.loggedIn) {
        // bruker er logget inn
        if (username !== res.locals.username) {
            res.redirect(`/user/${res.locals.username}`);
        } else {
            res.render('user', { title: 'Username' });
        };
    } else {
        // bruker er ikke logget inn
        res.redirect('/sign-in');
    };
};