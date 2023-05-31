const container = document.querySelector('.userContainer');

const getUsers = async () => {
    const res = await fetch('/users-get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            parcel: 'Hent brukere'
        })
    });
    
    const result = await(res.json());
    
    result.forEach(user => {
        const template = `
            <div class="user" id="${user._id}">
                <h2>${user.brukernavn} (${user.epost})</h2>
                <button onclick="toggleAdmin('${user._id}');" class="adminButton ${user.admin}">${user.admin}</button>
            </div>
        `;

        container.innerHTML += template;
    });
};

getUsers();

const toggleAdmin = async (id) => {
    const res = await fetch('/user-toggleadmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: id
        })
    });
    
    const result = await(res.json());
    
    console.log(result);

    location.reload();
};