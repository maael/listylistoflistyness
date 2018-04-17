import React from 'react'
import { DataTypeProvider } from '@devexpress/dx-react-grid'

export default function createProvider (type) {
  const IdLinkFormatter = ({ value }) =>
    <a data-wowhead={`${type}=${value}`} href={`http://www.wowhead.com/${type}=${value}`}>Wowhead</a>

  const IdLinkTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={IdLinkFormatter}
      {...props}
    />
  )

  return IdLinkTypeProvider
}
