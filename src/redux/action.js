import { ADD_TODO } from "./actiontype";
import { TOGGLE_TODO } from "./actiontype";
import { REMOVE_TODO } from "./actiontype";
import { MARK_COMPLETED } from "./actiontype";
import { MARK_INCOMPLETED } from "./actiontype";
import { MARK_ALL_COMPLETED } from "./actiontype";
import { FILTER_TODOS } from "./actiontype";
import { UPDATE_SEARCH_ITEMS } from "./actiontype";


export const add_todo = (text)=>({
    type : ADD_TODO,
    payload : {text}
})

export const toggle_todo = (id)=>({
    type : TOGGLE_TODO,
    payload : {id}
})

export const remove_todo = (id)=>({
    type : REMOVE_TODO,
    payload : {id}
})


export const filter_todos = (search)=>({
    type : FILTER_TODOS,
    payload : search
})


export const update_search_items = (searchItem)=>({
    type: UPDATE_SEARCH_ITEMS,
    payload: {searchItem}
})