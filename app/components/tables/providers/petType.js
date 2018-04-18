import React from 'react'
import { DataTypeProvider } from '@devexpress/dx-react-grid'

const PetTypeFormatter = ({ value }) =>
  <img src={`/public/imgs/pet_icons/${value}.png`} />

const PetTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={PetTypeFormatter}
    {...props}
  />
)

export default PetTypeProvider
