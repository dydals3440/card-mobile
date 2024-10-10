// 인증처리
import { PropsWithChildren, useState } from 'react'
import { useSetRecoilState } from 'recoil'

// firebase의 인증상태가 변경되면 인식하는 것.
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@remote/firebase'
import { userAtom } from '@/atoms/user'

function AuthGuard({ children }: PropsWithChildren) {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    console.log('user', user)

    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      })
    } else {
      // 로그인 된 상태가 아닌 경우.
      setUser(null)
    }
    setInitialize(true)
  })

  if (!initialize) {
    // 로딩처리 해주어도됨.
    return <div>로딩중... 인증 처리중..</div>
  }

  // 인증 처리가 되었다. 아래같이 실행.
  return <>{children}</>
}

export default AuthGuard
