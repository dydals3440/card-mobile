import { useCallback } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import Form from '@components/signin/Form'
import { FormValues } from '@models/signin'
import { auth } from '@remote/firebase'
import { useAlertContext } from '@contexts/AlertContext'
import { FirebaseError } from 'firebase/app'

function SigninPage() {
  const { open } = useAlertContext()
  const navigate = useNavigate()
  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      // // formValues
      // console.log(formValues)

      const { email, password } = formValues
      try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
      } catch (e) {
        // Firebase Error
        if (e instanceof FirebaseError) {
          if (e.code === 'auth/wrong-password') {
            open({
              title: '계정의 정보를 다시확인해주세요.',
              buttonLabel: '확인',
              onButtonClick: () => {},
            })
          }
        }
        // general error
        open({
          title: '잠시 후 다시 시도해주세요.',
          buttonLabel: '확인',
          onButtonClick: () => {},
        })
      }
    },
    [open],
  )

  return (
    // 너가 준비되면 이 함수의 값을 넘겨
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SigninPage
