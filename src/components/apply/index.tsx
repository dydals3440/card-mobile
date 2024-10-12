import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'

import { APPLY_STATUS, ApplyValues } from '@models/apply'
import { useState, useEffect } from 'react'
import useUser from '@hooks/auth/useUser'
import { useParams } from 'react-router-dom'

function Apply({ onSubmit }: { onSubmit: (applyValues: ApplyValues) => void }) {
  const user = useUser()
  const { id } = useParams()
  const [step, setStep] = useState(0)

  // 데이터를 모음
  // userId + cardId 랑 나머지 스프레드 연산자로 데이터를 받음.
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    userId: user?.uid,
    cardId: id,
  })

  useEffect(() => {
    // 값들이 다 채워졌음을 인지
    // onSubmit시, 완성도니 데이터를 넘겨주어야함.
    // Partial로 되어있기에 타입에러가 발생하는데 완성된 데이터라고 알려주어야함.
    if (step === 3) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    }
  }, [applyValues, step, onSubmit])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    console.log(terms)
    // terms {0: '01', 1:'02'}
    // ...terms ['01', '02']
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
    }))

    setStep((prevStep) => prevStep + 1)
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'payDate' | 'creditScore'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...infoValues,
    }))

    setStep((prevStep) => prevStep + 1)
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
    }))

    // 완료가 되었다는 것을 캐치해야하기에 useEffect를 사용.
    setStep((prevStep) => prevStep + 1)
  }

  return (
    <div>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo onNext={handleCardInfoChange} /> : null}
    </div>
  )
}
export default Apply
