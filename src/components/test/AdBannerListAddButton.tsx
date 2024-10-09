import Button from '@shared/Button'
// collection -> 큰 주머니에 접근
// doc -> 문서에 접근하기 위함.
// writeBatch -> 여러개의 데이터를, 하나씩 집어넣으면 오래걸리기에, 한번에 처리할 수 있는 Firebase 지원 함수.
import { collection, doc, writeBatch } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { adBanners } from '@/mock/data'
import { COLLECTIONS } from '@/constants'

function AdBannerListAddButton() {
  const handleButtonClick = async () => {
    // 1. 먼저 App에 대한 정보를 알려줌.
    const batch = writeBatch(store)
    // 2. cardlist를 루프를돌면서 배치에 값을 넣어줌
    adBanners.forEach((banner) => {
      // 문서를 쌓을꺼기에 doc함수에 감싸주면됨.
      const docRef = doc(collection(store, COLLECTIONS.ADBANNER))

      // 우리가 쌓을 데이터랑 docRef랑 매칭시켜줌
      batch.set(docRef, banner)
    })
    // 이렇게해서 저장이되는게 아닌 commit을 해주어야 값이 반영됨 (commit은 비동기)
    await batch.commit()

    alert('배너 리스트 추가 완료!')
  }
  return <Button onClick={handleButtonClick}>배너 리스트 추가하기</Button>
}

export default AdBannerListAddButton
