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
                <div class="todo">
                    <input id="${todo_id}item" class="item">
                    <div class="rightButtons">
                        <button class="updateButton" type="submit" id="${todo_id}button">Update</button>
                        <button class="imgButton" id="${todo_id}check"><img src="/img/check-solid-white.png" alt="mark as done"></button>
                        <button class="imgButton" id="${todo_id}delete"><img src="/img/trash-solid.png" alt="delete"></button>
                    </div>
                </div>
            `;

            todo_id++;
    
            todoContainer.innerHTML += template;
        });
    };

    // oppdater input-verdiene
    const allInputs = Array.from(document.querySelectorAll('.item'));

    console.log(allInputs);

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
        <div class="todo">
            <input id="${todo_id}item" class="item">
            <ul class="rightButtons">
                <li><button type="submit" id="${todo_id}button">Update</button></li>
                <li><button class="imgButton" id="${todo_id}check"><img src="/img/check-solid-white.png" alt="mark as done"></button></li>
                <li><button class="imgButton" id="${todo_id}delete"><img src="/img/trash-solid.png" alt="delete"></button></li>
            </ul>
        </div>
    `;

    todo_id++;

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