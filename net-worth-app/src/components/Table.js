import React from "react";
import MaterialTable from "material-table"

function Table(props) {
  console.log(props)

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Category', field: 'category' },
    { title: 'Amount', field: 'amount', type: 'numeric' }
  ]
  return (
      <MaterialTable
        title={props.is_asset ? 'Assets': 'Liabilities'}
        columns={columns}
        data={props.entries}
        options={{
          filtering: false,
          search: false,
          sorting: false
        }}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = props.entries;
                  data.push(newData);
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let data = this.state.data;
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
        }}
      />
    )
}

export default Table;