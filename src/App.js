import logo from './logo.svg';
import './App.css';

import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm'; 
import TodoList from './components/TodoList';
import { useState, useEffect } from 'react';

function App() {

  const [filtreActif ,setFiltreActif] = useState('tous');
  // pour stocker la liste
  const [tache, setache] = useState([]); // tab vide

  // ranger la tache dans localstorage
  useEffect(() => {
    localStorage.setItem("tache", JSON.stringify(tache));
  }, [tache]);

  // prendre la tache depuis localstorage et le mettre dans settache
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tache"));
    setache(saved);
  },[]);


   const onAdd = (todo) => {
     // cree objet  et l'ajouter tableau
    const nouvelletache = {
      id: Date.now(),
      text: todo,
      completed: false,
    }
    setache([...tache,nouvelletache]);
   }

   const onChecked = (id) => {
   setache(tache.map((todo) => {
    if (todo.id === id) {
          // Retourner une COPIE modifiée
      return { ...todo, completed: !todo.completed };
    }
    return todo;
   }));
   }

const onDelete = (id) => {
  setache(tache.filter((todo) => todo.id !== id));
}


const tachesFiltrees =  tache.filter((todo) => {
  if (filtreActif === 'actifs') return todo.completed === false;
  if (filtreActif === 'termines') return todo.completed === true;
  return true;
        })



  return(
  <div className="todo-container">
    <TodoForm onAction={onAdd} />
    <div className="filter-buttons">
      <button onClick={() => setFiltreActif('tous')}>Tous</button>
      <button onClick={() => setFiltreActif('actifs')}>Actifs</button>
      <button onClick={() => setFiltreActif('termines')}>Terminés</button>
    </div>
    <TodoList tache={tachesFiltrees} onChecked={onChecked} onDelete={onDelete} />
  </div>
);
}

export default App;
