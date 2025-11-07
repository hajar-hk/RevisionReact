import logo from './logo.svg';
import './App.css';

import TodoForm from './components/TodoForm'; 
import TodoList from './components/TodoList';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {

  const [filtreActif ,setFiltreActif] = useState('tous');
  // pour stocker la liste
  const [tache, setache] = useState([]); // tab vide

  const [loading, setLoading] = useState(false);  // État chargement
  const [error, setError] = useState(null);  // Etat d'erreur


  // prendre la tache depuis l'api et le mettre dans settache (get)
  useEffect(() => {
    async function gettodo() {
      try{
        const response =  await axios.get('http://localhost:3001/todos');
        setache(response.data);
      } catch (error){
        console.log('Erreur', error);
      }
    }
    gettodo();
  },[]);
    
  // Ajouter une nouvelle tâche (post)
  const addtodo = async (text) => {

    setLoading(true);           //  Début chargement
    setError(null);            //  Reset erreurs
    try {
      const nouvelleTache = {
        text: text,
        completed: false
      };
      const response = await axios.post('http://localhost:3001/todos', nouvelleTache);
      setache([...tache, response.data]);
      setLoading(false); // Fin chargement
    } catch (error) {
      setError("Erreur d'ajout"); //  Stocke l'erreur
      setLoading(false); //  Fin chargement même en erreur
    }
  };
  
  // maj d'une tache (put)
  async function majtodo(id) {
    try{
      // 1. Trouver la tâche à modifier
const tacheAModifier = tache.find(todo => todo.id === id);

// 2. Créer la version modifiée
const tacheModifiee = { ...tacheAModifier, completed: !tacheAModifier.completed };

// 3. Envoyer la version modifiée dans le body
await axios.put(`http://localhost:3001/todos/${id}`, tacheModifiee);
 
      // Mettre à jour le state
      setache(tache.map(todo => 
        todo.id === id ? tacheModifiee : todo
      ));

    }catch(error){
      console.log('erreur', error);
    } 
  }

  // supprimer une tache (delete)
  async function deletetodo(id) {
    try{
      const response = await axios.delete(`http://localhost:3001/todos/${id}`);
      setache(prevTache => prevTache.filter(todo => todo.id !== id));
       }catch(error){
      console.log('erreur', error);
    }  
  }

const tachesFiltrees =  tache.filter((todo) => {
  if (filtreActif === 'actifs') return todo.completed === false;
  if (filtreActif === 'termines') return todo.completed === true;
  return true;
        })



  return(
  <div className="todo-container">
    {loading && <div className="loading">Chargement...</div>}
    {error && <div className="error">Erreur: {error}</div>}
    <TodoForm onAction={addtodo} />
    <div className="filter-buttons">
      <button onClick={() => setFiltreActif('tous')}>Tous</button>
      <button onClick={() => setFiltreActif('actifs')}>Actifs</button>
      <button onClick={() => setFiltreActif('termines')}>Terminés</button>
    </div>
    <TodoList tache={tachesFiltrees} onChecked={majtodo} onDelete={deletetodo} />
  </div>
);
}

export default App;
