import Flex from '@shared/Flex'
import Text from '@shared/Text'

import useUser from '@hooks/auth/useUser'
import Button from '@shared/Button'
import { auth } from '@remote/firebase'
import { useCallback } from 'react'
import { signOut } from 'firebase/auth'
import MyImage from '@components/my/MyImage'
import Spacing from '@shared/Spacing'

function MyPage() {
  const user = useUser()
  console.log(user)
  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  return (
    <Flex direction={'column'} align={'center'}>
      <Spacing size={40} />
      <MyImage mode={'upload'} />
      <Spacing size={20} />
      <Text bold>{user?.displayName}</Text>
      <Spacing size={20} />
      <Button onClick={handleLogout}>로그아웃</Button>
    </Flex>
  )
}

export default MyPage
