import React from 'react'
import { DataTypeProvider } from '@devexpress/dx-react-grid'
import Progress from '../../display/Progress'

const ProgressFormatter = ({ value, row }) =>
  <Progress value={value} max={row.max} color={row.standingName} />

const ProgressProvider = props => (
  <DataTypeProvider
    formatterComponent={ProgressFormatter}
    {...props}
  />
)

export default ProgressProvider
