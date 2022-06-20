import { useState, useEffect } from "react";

export default function useDarkMode(element) {
  // Define dark mode state and use the current value in the local storage as the initial vlaue
  const darkModePrefrence = localStorage.getItem("darkMode");
  const [darkMode, setDarkMode] = useState(JSON.parse(darkModePrefrence));

  // On first page load and whenever the darkMode state changes, update the dark mode value in localStorage and toggle the "dark" class in the html element
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    const ele = document.querySelector(element);
    darkMode ? ele.classList.add("dark") : ele.classList.remove("dark");
  }, [darkMode, element]);

  return { darkMode, setDarkMode };
}
