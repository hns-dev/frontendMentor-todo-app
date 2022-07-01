import React from "react";

export default function FilterList({ onFilterChange, filterOption }) {
  return (
    <div className="filter-list flex surface-color padding-y">
      <button
        className={`btn ${filterOption === "All" ? "active-btn" : ""}`}
        onClick={() => onFilterChange("All")}
      >
        All
      </button>
      <button
        className={`btn ${filterOption === "Active" ? "active-btn" : ""}`}
        onClick={() => onFilterChange("Active")}
      >
        Active
      </button>
      <button
        className={`btn ${filterOption === "Completed" ? "active-btn" : ""}`}
        onClick={() => onFilterChange("Completed")}
      >
        Completed
      </button>
    </div>
  );
}
