// DOM
const signupForm = document.querySelector('.lag-bruker');
const feedback = document.querySelector('.feedback');

const signup = async user => {
    const res = await fetch('/user-signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user
        })
    });
    
    const result = await(res.json());
    
    // vis feedback til bruker
    showFeedback(result.status, result.code, feedback, true);
};

signupForm.addEventListener('submit', e => {
    e.preventDefault();

    const user = {
        epost: signupForm.epost.value,
        brukernavn: signupForm.brukernavn.value,
        passord: signupForm.passord.value,
        gjentaPassord: signupForm.gjentaPassord.value
    };

    signup(user);
});