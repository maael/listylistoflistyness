import React from 'react'

export default function iconFormatter (value) {
  return `/api/llol/imgcache/zamimg?url=${value}.jpg`
}
