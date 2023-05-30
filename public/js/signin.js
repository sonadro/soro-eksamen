// DOM
const signinForm = document.querySelector('.innlogging');
const feedback = document.querySelector('.feedback');

const signin = async user => {
    const res = await fetch('/user-signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user
        })
    });
    
    const result = await(res.json());
    
    showFeedback(result.status, result.code, feedback, true);
};

signinForm.addEventListener('submit', e => {
    e.preventDefault();

    const user = {
        epost: signinForm.epost.value,
        passord: signinForm.passord.value
    };

    signin(user);
});