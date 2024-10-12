import Apply from '@components/apply'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import { useEffect, useState } from 'react'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import { applyCard, updateApplyCard } from '@remote/apply'
import useUser from '@hooks/auth/useUser'
import { useParams } from 'react-router-dom'
import { APPLY_STATUS } from '@models/apply'

function ApplyPage() {
  // 폴링을 위한 플래그
  const [readyToPoll, setReadyToPoll] = useState(false)

  const { data } = usePollApplyStatus({
    enabled: readyToPoll,
  })

  const user = useUser()
  const { id } = useParams() as { id: string }

  const { mutate } = useApplyCardMutation({
    onSuccess: () => {
      // 값이 추가되었을 떄 => 폴링 시작
      setReadyToPoll(true)
      console.log('카드 추가')
    },
    onError: () => {
      // 실패했을 때 => 폴링 시작
      window.history.back()
    },
  })
  // 데이터를 신청하는 쪽으로 관심사 분리
  // const handleSubmit = () => {
  // }

  useEffect(() => {
    if (data) {
      updateApplyCard({
        cardId: id,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
    }
  }, [])

  // 데이터를 가져오는 쪽으로 관심사 분리
  return <Apply onSubmit={mutate} />
}
export default ApplyPage
