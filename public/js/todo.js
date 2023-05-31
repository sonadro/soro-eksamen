// DOM
const newTodoForm = document.querySelector('.inputContainer');
const updateForm = document.querySelector('.todo-list');

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
                    <input id="item${todo_id}" class="item">
                    <div class="rightButtons">
                        <button onclick="updateTodos();" class="updateButton" id="button${todo_id}">Update</button>
                        <button onclick="markTodo(${todo_id});" class="imgButton" id="check${todo_id}"><img src="/img/check-solid-white.png" alt="mark as done"></button>
                        <button onclick="deleteTodo(${todo_id});" class="imgButton" id="delete${todo_id}"><img src="/img/trash-solid.png" alt="delete"></button>
                    </div>
                </div>
            `;

            todo_id++;
    
            updateForm.innerHTML += template;
        });
    };

    // oppdater input-verdiene
    const allInputs = Array.from(document.querySelectorAll('.item'));

    for (let i = 0; i < allInputs.length; i++) {
        const currentInput = allInputs[i];
        const currentValue = user_todos[i].value;

        currentInput.value = currentValue;
    };

    // oppdater finished styles
    for (let i = 0; i < user_todos.length; i++) {
        const currentTodo = user_todos[i];

        // hvis todo er markert som fullført
        if (currentTodo.finished) {
            // finn inputfeltet, og bildet i check-knappen
            const currentField = document.querySelector(`#item${i}`);
            const button = document.querySelector(`#check${i}`);
            const img = button.querySelector('img');
        
            // gi inputfeltet finished-styles
            currentField.classList.add('finished');

            // endre bilder til X, i stedet for check
            img.src = '/img/xmark-solid.png';
        };
    };
};

newTodoForm.addEventListener('submit', e => {
    e.preventDefault();

    const todo = newTodoForm.newTodo.value;

    user_todos.push({
        value: todo,
        finished: false
    });

    const template = `
        <div class="todo">
            <input id="item${todo_id}" class="item">
            <div class="rightButtons">
                <button onclick="updateTodos();" class="updateButton" id="button${todo_id}">Update</button>
                <button onclick="markTodo(${todo_id});" class="imgButton" id="check${todo_id}"><img src="/img/check-solid-white.png" alt="mark as done"></button>
                <button onclick="deleteTodo(${todo_id});" class="imgButton" id="delete${todo_id}"><img src="/img/trash-solid.png" alt="delete"></button>
            </div>
        </div>
    `;

    todo_id++;

    updateForm.innerHTML += template;

    // oppdater input-verdiene
    const allInputs = Array.from(document.querySelectorAll('.item'));

    for (let i = 0; i < allInputs.length; i++) {
        const currentInput = allInputs[i];
        const currentValue = user_todos[i].value;

        currentInput.value = currentValue;
    };

    uploadTodos(user_todos);
});

updateForm.addEventListener('submit', e => {
    e.preventDefault();
});

getUserTodos();

// update, mark as complete, and delete todos functions

const updateTodos = () => {
    let new_todos = [];

    const newTodoFields = Array.from(document.querySelectorAll('.item'));

    newTodoFields.forEach(field => {
        new_todos.push({
            value: field.value,
            finished: false
        });
    });

    uploadTodos(new_todos);
};

const markTodo = id => {
    const item = document.querySelector(`#item${id}`);
    
    const button = document.querySelector(`#check${id}`);
    const img = button.querySelector('img');

    item.classList.toggle('finished');

    if (item.classList.contains('finished')) {
        user_todos[id].finished = true;
        img.src = '/img/xmark-solid.png';
    } else {
        user_todos[id].finished = false;
        img.src = '/img/check-solid-white.png';
    };

    uploadTodos(user_todos);
};

const deleteTodo = id => {
    console.log('delete', id);
};