export default function todo({ todo, onDeleteTodo, onCompletedTodo }) {
  return (
    <div className="list-item row">
      {/* Checkbox Button */}
      <button
        className={`checkmark ${todo.completed ? "completed" : ""}`}
        onClick={() => onCompletedTodo(todo.title)}
      >
        {todo.completed ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
            <path
              fill="none"
              stroke="#FFF"
              strokeWidth="2"
              d="M1 4.304L3.696 7l6-6"
            />
          </svg>
        ) : (
          <div className="checkmark-inner"></div>
        )}
        <input type="checkbox" />
      </button>

      {/* Item text*/}
      <p className={`todo-text ${todo.completed ? "completed" : ""}`}>
        {todo.title}
      </p>

      {/* Delete Button */}
      <button
        className="cross-icon push"
        onClick={() => onDeleteTodo(todo.title)}
      >
        <svg
          className="delete-icon"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
        >
          <path
            fill="#494C6B"
            fillRule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </button>
    </div>
  );
}
