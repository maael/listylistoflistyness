import React from 'react'
import { toJS, reaction } from 'mobx'
import { inject, observer } from 'mobx-react'
import Paper from 'material-ui/Paper'
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  DataTypeProvider,
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
import CollectedProvider from './providers/collected'
import ProgressProvider from './providers/progress'
import createTrackedProvider from './providers/tracked'
import CollectedTogglePlugin from './plugins/CollectedToggle'
import TrackedTogglePlugin from './plugins/TrackedToggle'

@inject('collectedStore')
@inject('characterStore')
@inject('authStore')
@observer
class MountsTable extends React.Component {
  state = {
    value: ''
  }

  constructor (props) {
    super(props)

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'standingName', title: 'Standing' },
        { name: 'value', title: 'Progress' },
        { name: 'collected', title: 'Collected' },
        { name: 'tracked', title: 'Tracked' }
      ],
      collectedColumns: [ 'collected' ],
      trackedColumns: [ 'tracked' ],
      progressColumns: [ 'value' ],
      defaultSorting: [{ columnName: 'name', direction: 'asc' }]
    }
  }

  search = debounce((search) => {
    console.log('searching')
  }, 300)

  filterCollected = debounce(({ toggled: collected }) => {
    console.log('filter')
  }, 300)

  filterTracked = debounce(({ toggled: tracked }) => {
    console.log('filter')
  }, 300)

  render () {
    const { columns, collectedColumns, trackedColumns, progressColumns, defaultSorting, value } = this.state
    const { collectedStore, trackedStore, characterStore, trackable } = this.props
    const TrackedProvider = createTrackedProvider('reputation', trackedStore)
    const rowData = collectedStore.characterReputations && characterStore.selected
      ? toJS(collectedStore.characterReputations[characterStore.selected] || [])
      : []

    return (
      <Paper className='reputation-table'>
        <Grid
          rows={rowData}
          columns={columns}
        >
          <CollectedProvider for={collectedColumns} />
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
          <CollectedTogglePlugin onClick={this.filterCollected}/>
          <TrackedTogglePlugin onClick={this.filterTracked}/>
          <SearchPanel />
          <PagingPanel />
        </Grid>
      </Paper>
    )
  }
}

export default MountsTable
