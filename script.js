let todos = [];
let filter = "all"


// get the todos from local storage
function getTodo() {
    const data = localStorage.getItem("todo")
    if (data) {
        return JSON.parse(data)
    } else {
        return []
    }


}
todos = getTodo()
rendertodos()



// add todo
function addTodo() {
    const input = document.getElementById("todo-input")
    const text = input.value.trim()
    if (text === "") return;
    const newtodo = {
        id: Date.now(),
        text: text,
        completed: false

    }
    todos.push(newtodo)
    rendertodos()
    saveTodo()
    input.value = ""




}
function saveTodo() {
    localStorage.setItem("todo", JSON.stringify(todos))
}


const addBTN = document.getElementById("add-btn")
addBTN.addEventListener("click", () => {
    addTodo()

})

const alltodo = document.getElementById("all-btn").addEventListener("click", ()=>{
    filter = "all"
    rendertodos()
})
const completedtodo = document.getElementById("cmplt-btn").addEventListener("click", ()=>{
    filter = "completed"
    rendertodos()
})
const uncompletedtodo = document.getElementById("active-btn").addEventListener("click", ()=>{
    filter = "active"
    rendertodos()
})







function rendertodos() {
    // get the todo list
    const list = document.getElementById("todo-list")
    // clear the list
    list.innerHTML = ""
    let filteredtodos = todos
    if (filter === "completed") {
        filteredtodos = todos.filter((todo) => todo.completed)
    } else if (filter === "active") {
        filteredtodos = todos.filter((todo) => !todo.completed)
    }
    // render the todos
    filteredtodos.forEach((todo) => {
        //wrapper 
        const div = document.createElement("div")
        div.className = "flex items-center justify-between border p-2 rounded"
        //left side
        const left = document.createElement("div")
        left.className = "flex items-center gap-2"

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = todo.completed

        const text = document.createElement("span")
        text.innerText = todo.text

        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked
            rendertodos()
            saveTodo()
        })
        if (todo.completed) {
            text.classList.add("line-through", "text-gray-400");
        }

        //right side/delete button
        const delBtn = document.createElement("button")
        delBtn.className = "px-4 bg-red-500 hover:bg-red-700  text-white rounded cursor-pointer"
        delBtn.innerText = "Delete"
        // delBtn.className = "text-red-500"
        delBtn.addEventListener("click", () => {
            todos = todos.filter((t) => t.id !== todo.id)
            rendertodos()
            saveTodo()
        })
        



        //structure
        left.appendChild(checkbox)
        left.appendChild(text)

        div.appendChild(left)
        div.appendChild(delBtn)

        list.appendChild(div)
    })


}