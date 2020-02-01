import React from 'react'

interface Props {
  name: string
}

const Hello: React.FunctionComponent<Props> = (props: Props) => {
  return <h1>Alohaha {props.name}!</h1>
}

export default Hello
