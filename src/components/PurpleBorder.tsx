import React from 'react'

interface CNodes {
  readonly children?: React.ReactNode | readonly React.ReactNode[]
}

export const PurpleBorder = ({ children }: CNodes) => (
  <div style={{ border: '3px solid rebeccapurple' }}> haha </div>
)
