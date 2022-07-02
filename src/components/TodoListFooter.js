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
    <footer className="list-footer flex text-on-background">
      <div className="content flex">
        <ActiveTodosCount todos={todos} />
        <ClearCompletedTodos onCleareCompleted={onCleareCompleted} />
      </div>
      <FilterList onFilterChange={onFilterChange} filterOption={filterOption} />
    </footer>
  );
}
