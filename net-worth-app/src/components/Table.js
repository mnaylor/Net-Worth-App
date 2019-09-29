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

  postEntry = (newData) => {
    return new Promise((resolve, reject) => {
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
    })
  }

  updateEntry = (newData) => {
    return new Promise((resolve, reject) => {
      try {
        newData['amount'] = Number(newData['amount']);
      }
      catch(error) {
        reject();
      }

      axios.post(entries_url, newData)
      .then(response => {
        const data = this.props.entries;
        const location = data.findIndex(entry =>
          entry['entry_id'] === response.data['entry_id']
        );
        data[location] = response.data;
        this.setState({ entries: data }, () => resolve());
        resolve();
      })
      .catch(error => {
        // mnaylor TODO: something about the error
        console.log(error);
        reject();
      })
    })
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
          onRowAdd: this.postEntry,
          onRowUpdate: this.updateEntry,
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