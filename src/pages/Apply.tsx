import { useState } from 'react'

import Apply from '@components/apply'

function ApplyPage() {
  const [step, setStep] = useState(2)

  // 데이터를 신청하는 쪽으로 관심사 분리
  const handleSubmit = () => {
    // TODO 카드 신청
  }

  // 데이터를 가져오는 쪽으로 관심사 분리
  return <Apply step={step} onSubmit={handleSubmit} />
}
export default ApplyPage
