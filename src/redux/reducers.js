import { ADD_TODO, MARK_COMPLETED , REMOVE_TODO , TOGGLE_TODO , MARK_INCOMPLETED , FILTER_TODOS, UPDATE_SEARCH_ITEMS, MARK_ALL_COMPLETED , MARK_ALL_INCOMPLETED } from "./actiontype"


const initialState = {
    todos : [],
    filter:"ALL",
    searchItem: ""
}

let outtercompleted = false;

const todoReducers = (state= initialState, action) => {
   switch(action.type){
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos ,{text: action.payload.text , completed:false , checked:false}],
            }
     
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo, index) => index !== action.payload.id)
            }
        
        case TOGGLE_TODO:
             return {
                ...state,
                todos: state.todos.map((todo, index) => index === action.payload.id ? {...todo , completed: !todo.completed , checked: !todo.checked}: todo)
             }    
        
        case MARK_COMPLETED:
             return {
                ...state,
                todos: state.todos.map((todo, index) => index === action.payload.id ? {...todo , completed: true , checked:true}: todo)
             }      
      
       case MARK_INCOMPLETED:
             return {
                ...state,
                todos: state.todos.map((todo, index) => index === action.payload.id ? {...todo , completed: false}: todo)
             }      
        
       case FILTER_TODOS:
             return {
                ...state,
                searched : state.todos.filter((todo, index) => todo === action.payload.search)
             }        
             
             

       case UPDATE_SEARCH_ITEMS:
             return {
                ...state,
                filter: action.payload.searchItem
             } 
                                 

       default: return state;    ``

    }
}

export default todoReducers;


