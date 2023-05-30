// DOM
const newTodoForm = document.querySelector('.inputContainer');
const todoContainer = document.querySelector('.todo-list');

// bruker todo
let user_todos = [];

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
                <p class="item">${item}</p>
            `;
    
            todoContainer.innerHTML += template;
        });
    };
};

newTodoForm.addEventListener('submit', e => {
    e.preventDefault();

    const todo = newTodoForm.newTodo.value;

    user_todos.push(todo);

    const template = `
        <p class="item">${todo}</p>
    `;

    todoContainer.innerHTML += template;

    uploadTodos(user_todos);
});

getUserTodos();