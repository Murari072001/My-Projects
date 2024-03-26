import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, newtodo, updatingTodo } from "./todoSlice";
import { useAddNewTodoMutation, useDeleteTodoMutation, useGetAllTodosQuery, useLazyGetAllTodosQuery, useUpdateTodoMutation } from "../services/api";

const TodoList = () => {
    const todo = useSelector(state => state.todo)
    const dispatch = useDispatch()
    const { data, isLoading, error } = useGetAllTodosQuery()
    const [addNewTodo] = useAddNewTodoMutation()
    const [updateTodoFn] = useUpdateTodoMutation()
    const [deleteTodoFn] = useDeleteTodoMutation()
    const ref = useRef()
    let [fillArr, setArr] = React.useState([])
    useEffect(() => {
        dispatch(getTodos(data))
        setArr(data)
        document.getElementById("all").checked=true
    }, [data])
    const addTodo = () => {
        addNewTodo(todo.newTodo).then((res) => { setTodos(res.data) })
        ref.current.value = ""
    }
    const changeStatus = (i) => {
        updateTodoFn({ "index": i, "type": "status" }).then((res) => { setTodos(res.data) })
    }
    const editTodo = (i) => {
        ref.current.value = todo.todos[i].title
        dispatch(newtodo(todo.todos[i].title))
        dispatch(updatingTodo(i))
    }
    const deleteTodo = (i) => {
        deleteTodoFn(i).then((res) => { setTodos(res.data) })
    }
    const updateTodo = () => {
        updateTodoFn({ "index": todo.index, "type": "update", "title": todo.newTodo }).then((res) => { setTodos(res.data) })
        dispatch(updatingTodo())
        ref.current.value = ""
    }
    const filterTodos = (todoList=todo.todos) => {
        let val
        var list=[...document.getElementsByName("filter")]
        list.forEach(element => {
            if(element.checked)
            val=element.id
        })
        let aaa=todoList?.filter((todo) => {
            if (val === "completed")
                return todo.status
            else if (val === "notCompleted")
                return !todo.status
            else
                return true
        })
        console.log(todo.todos);
        setArr(
            aaa
        )
    }
    const setTodos = (data) => {
        dispatch(getTodos(data))
        filterTodos(data)
    }
    return (
        <div className="container text-center">
            <h1>TodoList</h1>
            <div className="bg-success ms-auto me-auto w-75 p-4">
                <div className="form-floating ms-auto me-auto w-50 m-2">
                    <input ref={ref} id="todo" className="form-control" type="text" placeholder="Enter New Todo" onKeyUp={(e) => { dispatch(newtodo(e.target.value)) }} />
                    <label htmlFor="todo">Enter New Todo</label>
                </div>
                {!todo.isUpdate && <button className="btn btn-primary w-50" onClick={() => { addTodo() }}>Add Todo</button>}
                {todo.isUpdate && <button className="btn btn-warning w-50" onClick={() => { updateTodo() }}>Update Todo</button>}
            </div>
            <div className="btn btn-secondary m-3">
                <input type="radio" name="filter" id="all" onChange={() => { filterTodos() }}/>
                <label htmlFor="all" >All Todos {todo.todos?.length}</label>
            </div>
            <div className="btn btn-success m-3">
            <input type="radio" name="filter" id="completed"  onChange={() => { filterTodos() }}/>
            <label htmlFor="completed">Completed Todos {todo.todos?.filter((todo) => todo.status).length}</label>
            </div>
            <div className="btn btn-danger m-3">
            <input type="radio" name="filter" id="notCompleted"  onChange={() => { filterTodos() }}/>
            <label htmlFor="notCompleted">Incomplete Todos {todo.todos?.filter((todo) => !todo.status).length}</label>
            </div>
            {
                isLoading && <h3>Loading</h3>
            }
            {
                !isLoading && <table className="table table-dark table-hover w-75 ms-auto me-auto">
                    <thead>
                        <tr>
                            <th>Todo</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fillArr?.map((todo, ind) => {
                            return <tr key={ind} className={todo.status ? "table-success" : "table-danger"}>
                                <td >{todo.title}</td>
                                <td>{todo.status ? "Completed" : "Not Completed"}</td>
                                <td>
                                    {!todo.status && <><button className="btn m-1 btn-success" onClick={() => { changeStatus(todo.title) }}>Done</button>
                                        <button className="btn m-1 btn-warning" onClick={() => { editTodo(ind) }}>Edit</button></>}
                                    {todo.status && <><button className="btn m-1 btn-primary" onClick={() => { changeStatus(todo.title) }}>Undo</button>
                                        <button className="btn m-1 btn-danger" onClick={() => { deleteTodo(todo.title) }}>Delete</button></>}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default TodoList