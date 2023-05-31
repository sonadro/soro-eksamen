// controller
module.exports.home_get = (req, res) => {
    res.render('index', { title: 'Hjem' });
};

module.exports.signin_get = (req, res) => {
    if (res.locals.loggedIn) {
        // hvis man er logget inn, skal man ikke nå siden
        res.redirect('/');
    } else {
        res.render('signin', { title: 'Sign in' });
    };
};

module.exports.signup_get = (req, res) => {
    if (res.locals.loggedIn) {
        // hvis man er logget inn, skal man ikke nå siden
        res.redirect('/');
    } else {
        res.render('signup', { title: 'Sign up' });
    };
};

module.exports.user_get = (req, res) => {
    const username = req.params.username;

    if (res.locals.loggedIn) {
        // bruker er logget inn
        if (username !== res.locals.username) {
            res.redirect(`/user/${res.locals.username}`);
        } else {
            res.render('user', { title: req.params.username });
        };
    } else {
        // bruker er ikke logget inn
        res.redirect('/sign-in');
    };
};

module.exports.admin_get = (req, res) => {
    res.render('admin', { title: 'Admin' });
};

module.exports.admin_prosjektplan_get = (req, res) => {
    res.render('prosjektplan', { title: 'Prosjektplan' });
};

module.exports.admin_ipplan_get = (req, res) => {
    res.render('ipplan', { title: 'IP-Plan' });
};

module.exports.admin_veileder_get = (req, res) => {
    res.render('veileder', { title: 'Veileder' });
};

module.exports.owner_get = (req, res) => {
    res.render('owner', { title: 'Eierside'});
};