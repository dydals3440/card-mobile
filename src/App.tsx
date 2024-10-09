import React from 'react'
import logo from './logo.svg'
import './App.css'
import Text from '@shared/Text'
import Button from '@shared/Button'

function App() {
  return (
    <div>
      <Text typography="t1" display="block" color="red">
        T5
      </Text>
      <Text typography="t2">T5</Text>
      <Text typography="t3">T5</Text>
      <Text typography="t4">T5</Text>
      <Text typography="t5">T5</Text>
      <div style={{ height: 10, width: '100%', backgroundColor: 'red' }} />
      <Button>클릭해주세요</Button>
      <Button color="error">클릭해주세요</Button>
      <Button color="success">클릭해주세요</Button>
      <Button color="primary" weak={true}>
        클릭해주세요
      </Button>
      <Button full disabled>
        클릭해주세요
      </Button>
      <Button full>클릭해주세요</Button>
    </div>
  )
}

export default App
