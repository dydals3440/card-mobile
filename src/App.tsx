import React from 'react'
import './App.css'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Input from '@shared/Input'
import TextField from '@shared/TextField'
import { useAlertContext } from '@contexts/AlertContext'

function App() {
  const { open } = useAlertContext()
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
      <Input placeholder="로그인" />
      <Input aria-invalid={true} />
      <TextField label="아이디" />
      <TextField label="Password" />
      {/*<Alert*/}
      {/*  buttonLabel={'hi'}*/}
      {/*  title="알림이 뜸"*/}
      {/*  description="hihi"*/}
      {/*  onButtonClick={() => {}}*/}
      {/*/>*/}
      <Button
        onClick={() => {
          open({
            title: '카드 신청완료',
            description: '내역 페이지에서 확인해주세요.',
            buttonLabel: 'hi',
            onButtonClick: () => {},
          })
        }}
      >
        Alert오픈
      </Button>
    </div>
  )
}

export default App
