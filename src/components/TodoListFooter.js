import ActiveTodosCount from "./ActiveTodosCount";
import ClearCompletedTodos from "./ClearCompletedTodos";
import FilterList from "./FilterList";

export default function TodoListFooter({
  todos,
  onFilterChange,
  filterOption,
  onCleareCompleted,
}) {
  return (
    <footer className="list-footer grid text-on-background">
      <ActiveTodosCount todos={todos} />
      <FilterList onFilterChange={onFilterChange} filterOption={filterOption} />
      <ClearCompletedTodos onCleareCompleted={onCleareCompleted} />
    </footer>
  );
}
