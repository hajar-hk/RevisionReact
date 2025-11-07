// represente l'ajout de la tache

import { useRef, useState } from "react";

function TodoForm({ onAction }) {
  const [todo, settodo] = useState("");

  return (
    <div className="todo-form">
      <input
        type="texte"
        value={todo}
        onChange={(e) => settodo(e.target.value)}
      />
      <button
        onClick={() => {
          onAction(todo);
          settodo("");
        }}
      >
        Ajouter
      </button>
    </div>
  );
}

export default TodoForm;
