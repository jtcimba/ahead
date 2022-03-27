import React from "react";
import { InvestmentsDataItem, Categories } from "../../dataUtilities";
import styles from "./index.module.scss";

interface Props {
  data: Array<InvestmentsDataItem>;
  categories: Array<Categories>;
}

const Table = (props: Props) => {
  const maxRows = 15;
  // regular table
  const headers = props.categories.map((category, index) => (
    <th key={index} className={styles.headerField}>
      {category.title}
    </th>
  ));

  const rows = props.data
    .map((item: InvestmentsDataItem | any, index) => (
      <tr key={index} className={styles.dataRows}>
        {props.categories.map((category: Categories, index) => (
          <td key={index} className={styles.dataField}>
            {item[category.field]}
          </td>
        ))}
      </tr>
    ))
    .slice(0, maxRows);

  return (
    <table className={styles.dataTable}>
      <thead className={styles.header}>
        <tr className={styles.headerRow}>{headers}</tr>
      </thead>
      <tbody className={styles.body}>{rows}</tbody>
    </table>
  );
};

Table.displayName = "Table";

export default Table;
