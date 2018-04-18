import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('authStore') @observer
export default class AuthVisible extends React.Component {
  render () {
    const { authStore, children, requireBattleNet } = this.props
    const token = authStore.token
    const battlenet = authStore.user && authStore.user.battlenet && authStore.user.battlenet.length
    let check = !!token
    if (requireBattleNet) check = check && battlenet
    return check ? children : null
  }
}
