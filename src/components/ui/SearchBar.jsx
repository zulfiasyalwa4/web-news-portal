import React from "react";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
