import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from 'firebase/firestore'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants'
import { ApplyValues } from '@models/apply'

export async function applyCard(applyValues: ApplyValues) {
  return addDoc(collection(store, COLLECTIONS.CARD_APPLY), applyValues)
}

export async function updateApplyCard({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string
  userId: string
  applyValues: Partial<ApplyValues>
}) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )
  const [applied] = snapshot.docs

  updateDoc(applied.ref, applyValues)
}

// 유저가 갖고있는 카드를 반환해주는 함수.
export async function getAppliedCard({
  userId,
  cardId,
}: {
  cardId: string
  userId: string
}) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  // 카드발급에 신청하지 않음. 데이터가 없으면 (가져온)
  if (snapshot.docs.length === 0) {
    return null
  }

  // 데이터가 있다.
  const [applied] = snapshot.docs

  return applied.data() as ApplyValues
}
