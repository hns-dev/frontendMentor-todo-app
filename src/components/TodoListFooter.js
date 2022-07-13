import ActiveTodosCount from "./ActiveTodosCount";
import ClearCompletedTodos from "./ClearCompletedTodos";
import FilterList from "./FilterList";

export default function TodoListFooter({
  todos,
  onFilterChange,
  filterOption,
}) {
  return (
    <footer className="list-footer flex text-on-surface-dim">
      <div className="content flex">
        <ActiveTodosCount todos={todos} />
        <ClearCompletedTodos />
      </div>
      <FilterList onFilterChange={onFilterChange} filterOption={filterOption} />
    </footer>
  );
}
