import React, { Component } from 'react';
import MaterialTable from "material-table"
import axios from 'axios'

const columns = [
  { title: 'Name', field: 'name' },
  { title: 'Category', field: 'category' },
  { title: 'Amount', field: 'amount', type: 'numeric' }
]

const entries_url = 'http://localhost:5000/entry';

class Table extends Component {
  constructor() {
    super();
    console.log(this.state);
  }

  render() {
    return (
      <MaterialTable
        title={this.props.is_asset ? 'Assets': 'Liabilities'}
        columns={columns}
        data={this.props.entries}
        options={{
          filtering: false,
          search: false,
          sorting: false,
          pageSize: 10
        }}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              newData['is_asset'] = this.props.is_asset;
              try {
                newData['amount'] = Number(newData['amount']);
              }
              catch(error) {
                reject();
              }

              axios.post(entries_url, newData)
              .then(response => {
                const data = this.props.entries;
                data.push(response.data);
                this.setState({ entries: data }, () => resolve());
                resolve();
              })
              .catch(error => {
                // mnaylor TODO: something about the error
                console.log(error);
                reject();
              })
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

}

export default Table;