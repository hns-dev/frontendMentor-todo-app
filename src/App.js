import Header from "./components/Header";
import useDarkMode from "./hooks/useDarkMode";
import FilterableTodoList from "./components/FilterableTodoList";

function App() {
  const { darkMode, handleDarkModeChange } = useDarkMode("body");

  return (
    <>
      <Header darkMode={darkMode} onDarkModeChange={handleDarkModeChange} />

      <FilterableTodoList />
    </>
  );
}

export default App;
