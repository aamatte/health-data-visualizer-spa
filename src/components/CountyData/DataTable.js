import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

const DataTable = ({ countyData, handleRowSelected, selectedRow }) => {
  const { years, labels, data } = countyData;
  const tableBody = labels.map((label, index) => (
    <tr
      style={selectedRow === index ? styles.selectedTableRow : styles.tableRow}
      onClick={() => handleRowSelected(index)}
    >
      <td> {label} </td>
      {years.map(year => <td> {data[0][year][index]}</td>)}
    </tr>
  ));

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th />
          {countyData.years.map(year => <th key={year}>{year}</th>)}
        </tr>
      </thead>
      <tbody>
        {tableBody}
      </tbody>
    </Table>
  );
};

DataTable.protoTypes = {
  countyData: PropTypes.any,
  handleRowSelected: PropTypes.func,
  selectedRow: PropTypes.number,
};

DataTable.defaultProps = {
  countyData: { years: [], labels: [], data: [] },
  handleRowSelected: () => {},
  selectedRow: 0,
};

const styles = {
  tableRow: {
    cursor: 'pointer',
  },
  selectedTableRow: {
    cursor: 'pointer',
    backgroundColor: 'lightgray',
  },
};

export default DataTable;
