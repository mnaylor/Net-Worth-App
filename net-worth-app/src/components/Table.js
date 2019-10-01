import React, { Component } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import TableToolbar from '../components/TableToolbar';
import EntryDialog from '../components/EntryDialog';

const columns = [
    {
        title: 'Name',
        field: 'name'
    },
    {
        title: 'Category',
        field: 'category',
        defaultGroupOrder: 0
    },
    {
        title: 'Amount',
        field: 'amount',
        type: 'numeric',
        render: props => (
            <p>
              {props.display_amount}
            </p>
        )
    }]

const entries_url = 'http://localhost:5000/entry';

class Table extends Component {
  constructor() {
    super();
    this.postEntry = this.postEntry.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.state = {
      open: false,
      sum: 0,
      error: null
    }
  }

  postEntry = (newData) => {
    return new Promise((resolve, reject) => {
      newData['is_asset'] = this.props.isAsset;
      try {
        newData['amount'] = Number(newData['amount']);
      }
      catch(error) {
        reject();
      }

      axios.post(entries_url, newData)
      .then(response => {
        const data = this.props.entries;
        response.data.display_amount = this.formatAmount(response.data.amount);
        data.push(response.data);
        var sum = this.sumEntries(data);
        this.props.updateSum(sum, this.props.isAsset)
        this.setState({ entries: data, sum: this.formatAmount(sum) },
                      () => resolve());
      })
      .catch(error => {
        this.props.setError('Failed to insert entry.');
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
        response.data.display_amount = this.formatAmount(response.data.amount);
        const location = data.findIndex(entry =>
          entry['entry_id'] === response.data['entry_id']
        );
        data[location] = response.data;
        const sum = this.sumEntries(data);
        this.props.updateSum(sum, this.props.isAsset)
        this.setState({ entries: data, sum: this.formatAmount(sum) },
                      () => resolve());
      })
      .catch(error => {
        this.props.setError('Failed to update entry.');
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
        this.props.updateSum(sum, this.props.isAsset)
        this.setState({ entries: data, sum: this.formatAmount(sum) },
        () => resolve());
      })
      .catch(error => {
        this.props.setError('Failed to delete entry.');
        console.log(error);
        reject();
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.entries !== prevProps.entries) {
      const sum = this.sumEntries(this.props.entries);
      this.setState({sum: this.formatAmount(sum)});
    }
  }

  formatAmount = amount => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.props.exchange_rate.name
    }).format(amount * this.props.exchange_rate.rate);
  }

  sumEntries = entries => {
    var sum = 0;
    if (entries) {
      sum = entries.reduce(
        function (accumulator, currentValue)
        {
          return accumulator + currentValue.amount;
        }, 0);
    }
    return sum;
  }

  openDialog = (event, rowData) => {
    this.setState({open: true, rowData: rowData});
  }

  closeDialog = () => {
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        <EntryDialog open={this.state.open}
              handleInput={this.updateEntry}
              closeDialog={this.closeDialog}
              isAsset={this.props.isAsset}
              data={this.state.rowData}
              title={'Update ' + (this.props.isAsset ? 'Asset': 'Liability')}
        />
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
          onRowDelete: this.deleteEntry
        }}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: this.openDialog
          }]}
        components={{
          Groupbar: GroupBar,
          Toolbar: props => (
            <div>
             <TableToolbar isAsset={this.props.isAsset} postEntry={this.postEntry}
                           sum={this.state.sum} />
            </div>
          )
        }}
        />
      </div>

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