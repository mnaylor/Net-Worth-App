import React, { Component } from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import TableToolbar from '../components/TableToolbar';

const columns = [
  { title: 'Name', field: 'name' },
  { title: 'Category', field: 'category', defaultGroupOrder: 0 },
  { title: 'Amount', field: 'display_amount', type: 'currency' }
]

const entries_url = 'http://localhost:5000/entry';

class Table extends Component {
  constructor() {
    super();
    this.postEntry = this.postEntry.bind(this)
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
        this.setState({ entries: data }, 
                      () => resolve());
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
        this.setState({ entries: data }, 
                      () => resolve());
      })
      .catch(error => {
        // mnaylor TODO: something about the error
        console.log(error);
        reject();
      })
    })
  }

  deleteEntry = (oldData) => {
    return new Promise((resolve, reject) => {
      axios.delete(entries_url + '/' + oldData['entry_id'])
      .then(response => {
        const data = this.props.entries;
        const location = data.findIndex(entry =>
          entry['entry_id'] === oldData['entry_id']
        );
        data.splice(location, 1);
        this.setState({ entries: data }, 
        () => resolve());
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
        columns={columns}
        data={this.props.entries}
        options={{
          filtering: false,
          search: false,
          sorting: false,
          pageSize: 5,
          grouping: true
        }}
        editable={{
          onRowUpdate: this.updateEntry,
          onRowDelete: this.deleteEntry
        }}
        components={{
          Groupbar: GroupBar,
          Toolbar: props => (
            <div>
             <TableToolbar is_asset={this.props.is_asset} postEntry={this.postEntry} sum={this.props.sum} />
            </div>
          )
        }}
      />
    )
  }

}

function GroupBar() {
  return (
    <div>
    </div>
  );
}

export default Table;