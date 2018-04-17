import React from 'react'
import { toJS } from 'mobx'
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

const IdLinkTypeProvider = createIdLinkProvider('npc')

@inject('petStore') @observer
class PetsTable extends React.Component {
  state = {
    value: ''
  }

  constructor (props) {
    super(props)

    this.state = {
      columns: [
        { name: 'icon', title: '' },
        { name: 'name', title: 'Name' },
        { name: 'family', title: 'Family' },
        { name: 'creatureId', title: 'Link' },
        { name: 'collected', title: 'Collected' }
      ],
      iconColumns: [ 'icon' ],
      idLinkColumns: [ 'creatureId' ],
      collectedColumns: [ 'collected' ],
      defaultSorting: [{ columnName: 'name', direction: 'asc' }],
      sortingStateColumnExtensions: [{ columnName: 'icon', sortingEnabled: false }],
      rows: []
    }
  }

  search = debounce((search) => {
    const { petStore } = this.props
    petStore.filter({ search })
  }, 300)

  filterCollected = debounce(({ toggled: collected }) => {
    const { petStore } = this.props
    petStore.filter({ collected })
  }, 300)

  filterTracked = debounce(({ toggled: tracked }) => {
    const { petStore } = this.props
    petStore.filter({ tracked })
  }, 300)

  render () {
    const { rows, columns, iconColumns, idLinkColumns, collectedColumns, defaultSorting, sortingStateColumnExtensions, value } = this.state
    const { petStore } = this.props

    return (
      <Paper className='pet-table'>
        <style jsx global>{`
          .pet-table th:first-child,
          .pet-table tr:first-child {
            width: 95px;
          }
          .pet-table th:first-child {
            text-indent: -999px;
          }
        `}</style>
        <Grid
          rows={toJS(petStore.filtered)}
          columns={columns}
        >
          <IconTypeProvider
            for={iconColumns}
          />
          <IdLinkTypeProvider
            for={idLinkColumns}
          />
          <CollectedProvider
            for={collectedColumns}
          />
          <SortingState
            defaultSorting={defaultSorting}
            columnExtensions={sortingStateColumnExtensions}
          />
          <IntegratedSorting />
          <SearchState value={value} onValueChange={this.search} />
          <PagingState defaultCurrentPage={0} pageSize={petStore.pageSize} />
          <IntegratedPaging />
          <Table className='pet-table' />
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

export default PetsTable
