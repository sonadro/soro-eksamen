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
    console.log(username);
    res.render('user', { title: 'Username' });
};