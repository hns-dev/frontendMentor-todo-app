import React from "react";

export default function FilterList({ onfilterChange, filterOption }) {
  return (
    <div className="dark-bg row filter">
      <button
        className={`${filterOption === "All" ? "active-btn" : ""}`}
        onClick={() => onfilterChange("All")}
      >
        All
      </button>
      <button
        className={`${filterOption === "Active" ? "active-btn" : ""}`}
        onClick={() => onfilterChange("Active")}
      >
        Active
      </button>
      <button
        className={`${filterOption === "Completed" ? "active-btn" : ""}`}
        onClick={() => onfilterChange("Completed")}
      >
        Completed
      </button>
    </div>
  );
}
