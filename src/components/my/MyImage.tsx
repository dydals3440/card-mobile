import { ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { getAuth, updateProfile } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { useSetRecoilState } from 'recoil'

import { app, storage, store } from '@remote/firebase'
import useUser from '@hooks/auth/useUser'
import { COLLECTIONS } from '@constants'
import { userAtom } from '@atoms/user'

function MyImage({
  size = 40,
  mode = 'default',
}: {
  size?: number
  mode?: 'default' | 'upload'
}) {
  const user = useUser()
  const setUser = useSetRecoilState(userAtom)

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    // DB랑 Firebase랑 상호작용할려면, 로그인 한 유저 정보를 가져와야함.
    const currentUser = getAuth(app).currentUser

    if (files == null || user == null || currentUser == null) {
      return
    }

    const fileName = files[0].name
    // 폴더 생성 (아래 파일 네임으로 저장) -> 저장 위해서는 파이어베이스 스토리지
    const storageRef = ref(storage, `users/${user.uid}/${fileName}`)
    // 실제 업로드 (firabase/storage -> uploadBytes)
    const uploaded = await uploadBytes(storageRef, files[0])

    // url을 가져옴.
    const downloadUrl = await getDownloadURL(uploaded.ref)
    // 유저 정보 업데이트 (Authentication User)
    await updateProfile(currentUser, {
      photoURL: downloadUrl,
    })
    // Firebase Store의 User 정보에도 업데이트해주어야함. (싱크를 맞춰야함) -> Collection 접근
    await updateDoc(doc(collection(store, COLLECTIONS.USER), currentUser.uid), {
      photoURL: downloadUrl,
    })

    console.log(downloadUrl)
    setUser({
      ...user,
      photoURL: downloadUrl,
    })
  }

  return (
    <Container>
      <img
        width={size}
        height={size}
        src={
          user?.photoURL ||
          'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-64.png'
        }
        alt="유저의 이미지"
      />
      {mode === 'upload' ? (
        <input type={'file'} accept={'image/*'} onChange={handleUploadImage} />
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`

export default MyImage
