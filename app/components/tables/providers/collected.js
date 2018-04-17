import React from 'react'
import { DataTypeProvider } from '@devexpress/dx-react-grid'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import CheckIcon from '@material-ui/icons/Check'

const CollectedFormatter = ({ value }) =>
  value ? (
    <Chip
      avatar={
        <Avatar>
          <CheckIcon />
        </Avatar>
      }
      label='Collected'
    />
  ) : ''

const CollectedProvider = props => (
  <DataTypeProvider
    formatterComponent={CollectedFormatter}
    {...props}
  />
)

export default CollectedProvider
