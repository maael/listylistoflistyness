import React from 'react'
import { inject, observer } from 'mobx-react'
import Header from './Header'

@inject('authStore')
@observer
class PersonalProfileHeader extends React.Component {
  render () {
    const { authStore, ...props } = this.props
    return <Header user={authStore.user} {...props} />
  }
}

export default PersonalProfileHeader
