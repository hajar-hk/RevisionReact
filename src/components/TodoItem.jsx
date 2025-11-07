// represente une tache individuelle

function TodoItem({ tache, onCheked, onDelete }) {
  return (
    <div className={`todo-item tache ${tache.completed ? "terminee" : ""}`}>
      <input
        type="checkbox"
        name="tache"
        checked={tache.completed}
        onChange={() => onCheked(tache.id)}
      />
      <label htmlFor="tache">{tache.text}</label>
      <button onClick={() => onDelete(tache.id)}>supprimer</button>
    </div>
  );
}

export default TodoItem;
