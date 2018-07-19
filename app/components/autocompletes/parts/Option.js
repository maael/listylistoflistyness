import React from 'react'
import { MenuItem } from 'material-ui/Menu'
import { ListItemIcon, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

export default class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event)
  };

  render () {
    const { children, isFocused, isSelected, onFocus, option } = this.props
    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component='div'
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        { option.src ? <ListItemIcon><Avatar src={option.src} /></ListItemIcon> : null }
        <ListItemText>{children}</ListItemText>
      </MenuItem>
    )
  }
}
