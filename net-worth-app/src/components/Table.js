import React, { Component } from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import TableToolbar from '../components/TableToolbar';
import TextField from '@material-ui/core/TextField';

const columns = [
  { title: 'Name', field: 'name',
  editComponent: props => (
    <TextField
      id="standard-name"
      label="Name"
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      margin="normal"
    /> )},
  { title: 'Category', field: 'category', defaultGroupOrder: 0 },
  { title: 'Amount', field: 'amount', type: 'numeric',
    render: props => (
      <p>
        {props.display_amount}
      </p>
    ),
    editComponent: props => (
      <TextField
        id="standard-name"
        label="USD Amount"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        margin="normal"
        type="number"
        InputProps={{ inputProps: { min: 0, max: Number.MAX_SAFE_INTEGER } }}
      />
    )
  }
]

const entries_url = 'http://localhost:5000/entry';

class Table extends Component {
  constructor() {
    super();
    this.postEntry = this.postEntry.bind(this);
    this.state = {
      sum: 0
    }
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
        var sum = this.sumEntries(data);
        this.setState({ entries: data, sum: sum }, 
                      () => resolve());
      })
      .catch(error => {
        // mnaylor TODO: something about the error
        console.log(error);
        reject();
      })
    })
  }

  updateEntry = (newData, oldData) => {
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
        response.data.display_amount = this.props.exchange_rate * newData.amount;
        const location = data.findIndex(entry =>
          entry['entry_id'] === response.data['entry_id']
        );
        data[location] = response.data;
        const sum = this.sumEntries(data);
        this.setState({ entries: data, sum: sum }, 
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
        var sum = this.sumEntries(data);
        this.setState({ entries: data, sum: sum }, 
        () => resolve());
      })
      .catch(error => {
        // mnaylor TODO: something about the error
        console.log(error);
        reject();
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.entries !== prevProps.entries) {
      this.setState({sum: this.sumEntries(this.props.entries)});
    }
  }

  sumEntries = entries => {
    var sum = 0;
    if (entries) {
      sum = entries.reduce(
        function (accumulator, currentValue) 
        {
          return accumulator + currentValue.display_amount;
        }, 0);
    }
    return sum;
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
             <TableToolbar is_asset={props.is_asset} postEntry={this.postEntry} 
                           sum={this.state.sum} />
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