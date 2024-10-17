import Apply from '@components/apply'
import { useState } from 'react'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import { updateApplyCard } from '@remote/apply'
import useUser from '@hooks/auth/useUser'
import { useParams, useNavigate } from 'react-router-dom'
import { APPLY_STATUS } from '@models/apply'
import useAppliedCard from '@components/apply/hooks/useAppliedCard'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import { useAlertContext } from '@contexts/AlertContext'

function ApplyPage() {
  const navigate = useNavigate()
  // 폴링을 위한 플래그
  const [readyToPoll, setReadyToPoll] = useState(false)
  const { open } = useAlertContext()

  const user = useUser()
  const { id } = useParams() as { id: string }

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          return
        }

        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다',
            onButtonClick: () => {
              window.history.back()
            },
          })

          return
        }

        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  const { data: status } = usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', {
        replace: true,
      })
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=false', {
        replace: true,
      })
    },
    enabled: readyToPoll,
  })

  console.log(readyToPoll)

  const { mutate, isLoading: 카드를신청중인가 } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true)
    },
    onError: () => {
      window.history.back()
    },
  })

  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null
  }

  // polling or
  if (readyToPoll || 카드를신청중인가) {
    return <div>Loading...</div>
  }

  // 데이터를 가져오는 쪽으로 관심사 분리
  return <Apply onSubmit={mutate} />
}
export default ApplyPage
