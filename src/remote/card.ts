import {
  collection,
  getDocs,
  QuerySnapshot,
  query,
  startAfter,
  limit,
  doc,
  getDoc,
} from 'firebase/firestore'
// getDocs를 통해 전체 문서를 가져올 수 있음.
// 우리 서비스의 store도 가져옴
import { store } from '@remote/firebase'

import { COLLECTIONS } from '@/constants'
import { Card } from '@models/card'

// async function getCards() {
//   // 이 컬렉션에 있는 전체 문서를 가져오니 getDocs 비동기 활용
//   const cardSnapshot = await getDocs(collection(store, COLLECTIONS.CARD))
//   // 가공해야함 쓰기 좋은 형태로
//   return cardSnapshot.docs.map((doc) => ({
//     // 실제로 아이디가 없어서, noSQL 아이디 선언
//     id: doc.id,
//     ...(doc.data() as Card),
//   }))
// }

// 무한스크롤 버전
// QuerySnapshot은 pageparam 지금 보이는 맨 마지막 요소를 스냅샷함. 타입은 카드
// 조건을 넣기 위해서는 query를 활용
async function getCards(pageParam?: QuerySnapshot<Card>) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(10))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(10),
        )

  const cardSnapshot = await getDocs(cardQuery)

  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}

async function getCard(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.CARD, id))

  return {
    id,
    ...(snapshot.data() as Card),
  }
}

export { getCards, getCard }
