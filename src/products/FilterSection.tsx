import React, { ReactElement } from "react";

export interface IFilter {
  category: string;
  perpage: number;
  sortOrder: string;
}

export interface IFilterSection {
  handleSelct: (key: string, value: string) => void;
  categories: string[];
  filter: IFilter;
}

export const FilterSection: React.FC<IFilterSection> = ({
  handleSelct,
  categories,
  filter,
}): ReactElement => {
  console.log("rerendered");

  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <div>
        <select
          onChange={(event) => {
            handleSelct("category", event.target.value);
          }}
        >
          {categories.map((category) => {
            return <option value={category}>{category}</option>;
          })}
        </select>
      </div>
      <div>
        <select
          value={filter.perpage}
          onChange={(event) => {
            handleSelct("perpage", event.target.value);
          }}
        >
          <option value={"5"}>5</option>
          <option value={"10"}>10</option>
          <option value={"15"}>15</option>
        </select>
      </div>
      <div>
        <select
          onChange={(event) => {
            handleSelct("sortOrder", event.target.value);
          }}
        >
          <option value={"asc"}>Ascending</option>
          <option value={"desc"}>Desceding</option>
        </select>
      </div>
    </div>
  );
};

export default React.memo(FilterSection);
