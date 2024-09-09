import  { useState, useEffect } from 'react';
import './Todo.css';
import { add_todo, remove_todo, toggle_todo } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Todo() {
    const [newTodoText, setnewTodoText] = useState("");
    const [searchValue, setsearchValue] = useState("");
    const [isOpen, setisOpen] = useState(false);
    const [noResultsToastShown, setNoResultsToastShown] = useState(false);

    const currentValues = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const handleAddTodo = (text) => {
        if (text.trim() === '') {
            toast.error("Task cannot be empty!");
            return;
        }
        dispatch(add_todo(text));
        toast.success("Task added successfully!");
    };

    const handleAddTodoClick = () => {
        handleAddTodo(newTodoText);
        setnewTodoText("");
    };

    const handleRemoveTodo = (id) => {
        dispatch(remove_todo(id));
        toast.info("Task removed successfully!");
    };

    const handleRemoveTodoClick = (id) => {
        handleRemoveTodo(id);
    };

    const handletoggleTodo = (id) => {
        dispatch(toggle_todo(id));
    };

    const handletoggleTodoClick = (id) => {
        handletoggleTodo(id);
    };

    const toggle = () => {
        setisOpen(!isOpen);
    };

    const filteredTasks = currentValues.filter(item =>
        searchValue === '' ? item : item.text.includes(searchValue)
    );

    useEffect(() => {
        if (searchValue && filteredTasks.length === 0 && !noResultsToastShown) {
            toast.warn("No matching tasks found!");
            setNoResultsToastShown(true);
        } else if (filteredTasks.length > 0) {
            setNoResultsToastShown(false);
        }
    }, [searchValue, filteredTasks, noResultsToastShown]);

    return (
        <div id='mydiv'>
            <ToastContainer />
            <h1>Todo App</h1>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <input  className='input' placeholder='Write your list item here✍' type="text" value={newTodoText} onChange={(e) => { setnewTodoText(e.target.value) }} />
                <button className='btn' onClick={handleAddTodoClick}>+</button>
            </div>

            <div className='search-container'>
                <AnimatePresence>
                    {isOpen && (
                        <motion.input
                            initial={{ width: '0px' }}
                            animate={{ width: isOpen ? '100%' : '0px' }}
                            exit={{ width: '0px' }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            type="text"
                            className='searchbar'
                            placeholder='search here'
                            value={searchValue}
                            style={{ overflow: 'hidden', display: 'inline-block' }}
                            onChange={(e) => { setsearchValue(e.target.value) }}
                        />
                    )}
                </AnimatePresence>
                <span className='search-icon' onClick={toggle}>🔍</span>
            </div>

            <div>
                {filteredTasks.length === 0 && searchValue !== '' ? (
                    <p className='nothingtext'>Nothing to show...</p>
                ) : (
                    <ul>
                        {filteredTasks.map((value, index) => (
                            <li className='list' key={index}>
                                <div>
                                    <span className='values'>
                                        {value.text.split(new RegExp(`(${searchValue})`, 'gi')).map((part, i) =>
                                            part.toLowerCase() === searchValue.toLowerCase() ? <mark key={i}>{part}</mark> : part
                                        )}
                                    </span>
                                    {value.completed && <div className="line"></div>}
                                </div>
                                <div className='container'>
                                    <input type="checkbox" checked={value.checked} id="checkbox" onChange={() => handletoggleTodoClick(index)} />
                                    <button id='button' onClick={() => handleRemoveTodoClick(index)}>✖</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Todo;
