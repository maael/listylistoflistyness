import React from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import Paper from 'material-ui/Paper'
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  SearchState
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  Toolbar,
  SearchPanel,
  PagingPanel
} from '@devexpress/dx-react-grid-material-ui'
import debounce from 'lodash.debounce'
import ProgressProvider from './providers/progress'
import createTrackedProvider from './providers/characterTracked'
import TrackedTogglePlugin from './plugins/TrackedToggle'

@inject('collectedStore')
@inject('characterStore')
@inject('authStore')
@inject('characterTrackedStore')
@observer
class MountsTable extends React.Component {
  state = {
    value: '',
    search: '',
    tracked: false
  }

  constructor (props) {
    super(props)

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'standingName', title: 'Standing' },
        { name: 'value', title: 'Progress' },
        { name: 'tracked', title: 'Tracked' }
      ],
      trackedColumns: [ 'tracked' ],
      progressColumns: [ 'value' ],
      defaultSorting: [{ columnName: 'name', direction: 'asc' }]
    }
  }

  search = debounce((search) => {
    this.setState({ search })
  }, 300)

  filterTracked = debounce(({ toggled: tracked }) => {
    this.setState({ tracked })
  }, 300)

  filter = ({ name, id }, trackedItems = []) => {
    const { search, tracked } = this.state
    let include = search ? name.toLowerCase().includes(search.toLowerCase()) : true
    include = include && (tracked ? trackedItems.some(({ details }) => id === details.id) : true)
    return include
  }

  render () {
    const { columns, trackedColumns, progressColumns, defaultSorting, value } = this.state
    const { collectedStore, characterTrackedStore, characterStore } = this.props
    const tracked = collectedStore.reputations && characterStore.selected
      ? toJS(collectedStore.filterCurrentCharacter('reputations', ({ id }, trackedItems) =>
          trackedItems.some(({ details }) => id === details.id)
        ))
      : []
    const TrackedProvider = createTrackedProvider('reputation', characterTrackedStore, tracked)
    const rowData = collectedStore.reputations && characterStore.selected
      ? toJS(collectedStore.filterCurrentCharacter('reputations', this.filter))
      : []

    return (
      <Paper className='reputation-table'>
        <Grid
          rows={rowData}
          columns={columns}
        >
          <TrackedProvider for={trackedColumns} />
          <ProgressProvider for={progressColumns} />

          <SortingState
            defaultSorting={defaultSorting}
          />
          <IntegratedSorting />
          <SearchState value={value} onValueChange={this.search} />
          <PagingState defaultCurrentPage={0} pageSize={10} />
          <IntegratedPaging />
          <Table className='reputation-table' />
          <TableHeaderRow showSortingControls />
          <Toolbar />
          <TrackedTogglePlugin onClick={this.filterTracked} />
          <SearchPanel />
          <PagingPanel />
        </Grid>
      </Paper>
    )
  }
}

export default MountsTable
