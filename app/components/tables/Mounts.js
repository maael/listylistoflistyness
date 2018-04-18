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
import iconFormatter from '../../lib/iconFormatter'
import CollectedProvider from './providers/collected'
import createTrackedProvider from './providers/tracked'
import createIdLinkProvider from './providers/idLink'
import CollectedTogglePlugin from './plugins/CollectedToggle'
import TrackedTogglePlugin from './plugins/TrackedToggle'

const IconFormatter = ({ value }) => <img src={iconFormatter(value)} />

const IconTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={IconFormatter}
    {...props}
  />
)

const IdLinkTypeProvider = createIdLinkProvider('item')

@inject('mountStore')
@inject('trackedStore')
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
        { name: 'icon', title: '' },
        { name: 'name', title: 'Name' },
        { name: 'itemId', title: 'Link' },
        { name: 'collected', title: 'Collected' },
        { name: 'tracked', title: 'Tracked' }
      ],
      iconColumns: [ 'icon' ],
      idLinkColumns: [ 'itemId' ],
      collectedColumns: [ 'collected' ],
      trackedColumns: [ 'tracked' ],
      defaultSorting: [{ columnName: 'name', direction: 'asc' }],
      sortingStateColumnExtensions: [{ columnName: 'icon', sortingEnabled: false }],
      rows: []
    }
  }

  search = debounce((search) => {
    const { mountStore } = this.props
    mountStore.filter({ search })
  }, 300)

  filterCollected = debounce(({ toggled: collected }) => {
    const { mountStore } = this.props
    mountStore.filter({ collected })
  }, 300)

  filterTracked = debounce(({ toggled: tracked }) => {
    const { mountStore } = this.props
    mountStore.filter({ tracked })
  }, 300)

  render () {
    const { rows, columns, iconColumns, idLinkColumns, collectedColumns, trackedColumns, defaultSorting, sortingStateColumnExtensions, value } = this.state
    const { mountStore, trackedStore, trackable } = this.props
    const TrackedProvider = createTrackedProvider('mount', trackedStore)
    return (
      <Paper className='mount-table'>
        <style jsx global>{`
          .mount-table th:first-child,
          .mount-table tr:first-child {
            width: 95px;
          }
          .mount-table th:first-child {
            text-indent: -999px;
          }
        `}</style>
        <Grid
          rows={toJS(mountStore.filtered)}
          columns={columns}
        >
          <IconTypeProvider for={iconColumns} />
          <IdLinkTypeProvider for={idLinkColumns} />
          <CollectedProvider for={collectedColumns} />
          <TrackedProvider for={trackedColumns} />

          <SortingState
            defaultSorting={defaultSorting}
            columnExtensions={sortingStateColumnExtensions}
          />
          <IntegratedSorting />
          <SearchState value={value} onValueChange={this.search} />
          <PagingState defaultCurrentPage={0} pageSize={mountStore.pageSize} />
          <IntegratedPaging />
          <Table className='mount-table' />
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
