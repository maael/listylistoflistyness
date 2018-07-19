import React from 'react'
import Select from 'react-virtualized-select'
import Typography from 'material-ui/Typography'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ClearIcon from '@material-ui/icons/Clear'
import Option from './Option'

export default function SelectWrapped (props) {
  const { classes, ...other } = props

  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { children } = valueProps
        return <div className='Select-value'>{children}</div>
      }}
      {...other}
    />
  )
}
