import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { auth, store } from '@remote/firebase'
import { useNavigate } from 'react-router-dom'

import Form from '@components/signup/Form'
import { FormValues } from '@models/signup'
import { COLLECTIONS } from '@/constants'

function SignupPage() {
  const navigate = useNavigate()
  // 완성도니 결과물을 부모한테 넘김.
  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues
    // 인증 유저를 만듬
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    // displayName을 넣어주는 방법
    await updateProfile(user, {
      displayName: name,
    })

    console.log(name)

    // 패스워드는 위의 인증에서 처리
    // 아래는 가지고 사용하는 용도
    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    }

    // 유저 콜렉션에 저장.
    // collection(store, COLLECTIONS.USER)
    // 어떤걸 저장
    // 문서를 저장할 때 카드 저장과 다르게, 내가 직접 user.uid를 넣어줌
    // doc(collection(store, COLLECTIONS.USER), user.uid)
    // setDoc을 통해 문서 저장
    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)

    // 회원가입 잘 완료하면, 홈으로.
    navigate('/')
  }
  return <Form onSubmit={handleSubmit} />
}

export default SignupPage
