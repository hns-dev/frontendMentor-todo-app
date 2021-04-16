import React from "react";

export default function FilterList({ onfilterChange }) {
  return (
    <div className="dark-bg row filter">
      <button onClick={() => onfilterChange("All")}>All</button>
      <button onClick={() => onfilterChange("Active")}>Active</button>
      <button onClick={() => onfilterChange("Completed")}>Completed</button>
      {/* <button>All</button>
      <button>Active</button>
      <button>Completed</button> */}
    </div>
  );
}
