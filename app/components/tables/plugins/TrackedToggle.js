import React from 'react'
import PropTypes from 'prop-types'

import {
  Template, TemplatePlaceholder, Plugin, TemplateConnector,
} from '@devexpress/dx-react-core'

import { FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'

class TrackedToggle extends React.Component {
  state = {
    toggled: false
  }

  onClick = () => {
    const { onClick } = this.props
    const { toggled } = this.state
    this.setState({ toggled: !toggled }, () => {
      onClick(this.state)
    })
  }

  render () {
    const { toggled } = this.state
    return (
      <Plugin name='TrackedToggle'>
        <Template name='toolbarContent'>
          <TemplatePlaceholder />
          <TemplateConnector>
            {({}) => (
              <React.Fragment>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ width: '32px' }}
                      checked={toggled}
                      onChange={this.onClick}
                      value='tracked'
                    />
                  }
                  label='Tracked only'
                  style={{ paddingRight: '8px' }}
                />
              </React.Fragment>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    )
  }
}

TrackedToggle.defaultProps = {
  onClick: () => {}
}

export default TrackedToggle
