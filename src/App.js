import logo from './logo.svg';
import './App.css';

import TodoForm from './components/TodoForm'; 
import TodoList from './components/TodoList';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {  addTodo,deleteTodo, toggleTodo } from './redux/todoSlice';


function App() {



  const [filtreActif ,setFiltreActif] = useState('tous');
  const [loading, setLoading] = useState(false);  // État chargement
  const [error, setError] = useState(null);  // Etat d'erreur
  // pour stocker la liste
  const todos = useSelector(state => state.todos.items);
  const dispatch = useDispatch();


  // ajouter tache 
   const handleAddTodo = (text) => {
    dispatch(addTodo(text)); // yaani // → action.payload = texte de la tache par exemple: gym

  };

  // modifier tache
   const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };
  
  // supprimer tache 
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };
  

const tachesFiltrees =  todos.filter((todo) => {
  if (filtreActif === 'actifs') return todo.completed === false;
  if (filtreActif === 'termines') return todo.completed === true;
  return true;
        })



  return(
  <div className="todo-container">
    {loading && <div className="loading">Chargement...</div>}
    {error && <div className="error">Erreur: {error}</div>}
    <TodoForm onAction={handleAddTodo} />
    <div className="filter-buttons">
      <button onClick={() => setFiltreActif('tous')}>Tous</button>
      <button onClick={() => setFiltreActif('actifs')}>Actifs</button>
      <button onClick={() => setFiltreActif('termines')}>Terminés</button>
    </div>
    <TodoList tache={tachesFiltrees} onChecked={handleToggleTodo} onDelete={handleDeleteTodo} />
  </div>
);
}

export default App;
