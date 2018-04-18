import React from 'react'
import { DataTypeProvider } from '@devexpress/dx-react-grid'
import IconButton from 'material-ui/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'

export default function createProvider (type, store) {
  const TrackedFormatter = ({ value, row }) => {
    return <IconButton onClick={() => { store.track(type, row, !!!value) } }>{value ? <StarIcon /> : <StarBorderIcon />}</IconButton>
  }

  const TrackedProvider = props => (
    <DataTypeProvider
      formatterComponent={TrackedFormatter}
      {...props}
    />
  )

  return TrackedProvider
}
