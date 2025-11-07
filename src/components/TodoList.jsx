// representre la liste des taches

import TodoItem from "./TodoItem";

function TodoList({ tache, onChecked, onDelete }) {
  return (
    <div>
      <ul>
        {tache.map((matache) => (
          <li key={matache.id}>
            <TodoItem
              tache={matache}
              onCheked={onChecked}
              onDelete={onDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
