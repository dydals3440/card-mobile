import { collection, getDocs } from 'firebase/firestore'
// getDocs를 통해 전체 문서를 가져올 수 있음.
// 우리 서비스의 store도 가져옴
import { store } from '@remote/firebase'

import { COLLECTIONS } from '@/constants'
import { AdBanner } from '@models/card'

async function getAdBanners() {
  // 이 컬렉션에 있는 전체 문서를 가져오니 getDocs 비동기 활용
  const adBannerSnapshot = await getDocs(
    collection(store, COLLECTIONS.ADBANNER),
  )
  console.log('cardSnapshot', adBannerSnapshot)
  // 가공해야함 쓰기 좋은 형태로
  return adBannerSnapshot.docs.map((doc) => ({
    // 실제로 아이디가 없어서, noSQL 아이디 선언
    id: doc.id,
    ...(doc.data() as AdBanner),
  }))
}

export { getAdBanners }
