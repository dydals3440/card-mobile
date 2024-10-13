import Apply from '@components/apply'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import { useEffect, useState } from 'react'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import { updateApplyCard } from '@remote/apply'
import useUser from '@hooks/auth/useUser'
import { useParams, useNavigate } from 'react-router-dom'
import { APPLY_STATUS } from '@models/apply'

function ApplyPage() {
  const navigate = useNavigate()
  // 폴링을 위한 플래그
  const [readyToPoll, setReadyToPoll] = useState(false)

  const { data } = usePollApplyStatus({
    enabled: readyToPoll,
  })

  const user = useUser()
  const { id } = useParams() as { id: string }

  const { mutate, isPending: 카드를신청중인가 } = useApplyCardMutation({
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
    console.log(data)
    if (data) {
      updateApplyCard({
        cardId: id,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=true', {
        replace: true,
      })
    }
  }, [data])

  // polling or
  if (readyToPoll || 카드를신청중인가) {
    return <div>Loading...</div>
  }

  // 데이터를 가져오는 쪽으로 관심사 분리
  return <Apply onSubmit={mutate} />
}
export default ApplyPage
