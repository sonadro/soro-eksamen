// DOM
const newTodoForm = document.querySelector('.inputContainer');
const todoContainer = document.querySelector('.todo-list');

// bruker todo
let user_todos = [];
let todo_id = 0;

const uploadTodos = async (todos) => {
    const res = await fetch('/todo-update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            todos
        })
    });
    
    const result = await(res.json());
    
    console.log(result);
};

const getUserTodos = async () => {
    const res = await fetch('/todo-getusertodos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            parcel: 'Gi med todos'
        })
    });
    
    const result = await(res.json());

    if (result.status === 'Du har todos!') {   
        result.items.forEach(item => {
            user_todos.push(item);
            
            const template = `
                <input id="${todo_id}" class="item">
            `;
    
            todoContainer.innerHTML += template;
        });
    };

    // oppdater input-verdiene
    const allInputs = Array.from(document.querySelectorAll('.item'));

    for (let i = 0; i < allInputs.length; i++) {
        const currentInput = allInputs[i];
        const currentValue = user_todos[i];

        currentInput.value = currentValue;
    };
};

newTodoForm.addEventListener('submit', e => {
    e.preventDefault();

    const todo = newTodoForm.newTodo.value;

    user_todos.push(todo);

    const template = `
    <input id="${todo_id}" class="item">
    `;

    todoContainer.innerHTML += template;

    // oppdater input-verdiene
    const allInputs = Array.from(document.querySelectorAll('.item'));

    for (let i = 0; i < allInputs.length; i++) {
        const currentInput = allInputs[i];
        const currentValue = user_todos[i];

        currentInput.value = currentValue;
    };

    uploadTodos(user_todos);
});

getUserTodos();