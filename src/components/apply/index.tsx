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
  // const [step, setStep] = useState(0)

  // 로컬키값
  const storageKey = `applied=${user?.uid}-${id}`

  // 데이터를 모음
  // userId + cardId 랑 나머지 스프레드 연산자로 데이터를 받음.
  // const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
  //   userId: user?.uid,
  //   cardId: id,
  //   step: 0,
  // })

  // 리액트는 state가 바뀌면 리렌더링 불필요하게 useState(localStorage.getItem)이라는 함수를 계속 실행.
  // 좋지 않으니, () => {} 이런식으로 함수를 인자로 넘김. 리렌더링이 되더라도, 최초에 단 한번만 실행이 되는 함수가 됨.
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey)
    if (applied === null) {
      return {
        userId: user?.uid,
        cardId: id,
        step: 0,
      }
    }
    // 저장할 때 string으로 저장했으니 다시 객체로 보냄.
    return JSON.parse(applied)
  })

  useEffect(() => {
    // 값들이 다 채워졌음을 인지
    // onSubmit시, 완성도니 데이터를 넘겨주어야함.
    // Partial로 되어있기에 타입에러가 발생하는데 완성된 데이터라고 알려주어야함.
    if (applyValues.step === 3) {
      // 서버에 값이 있을테니 이 떄 날림.
      localStorage.removeItem(storageKey)
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    } else {
      console.log('저장', applyValues)
      localStorage.setItem(storageKey, JSON.stringify(applyValues))
    }
  }, [applyValues, onSubmit, storageKey])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    console.log(terms)
    // terms {0: '01', 1:'02'}
    // ...terms ['01', '02']
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'payDate' | 'creditScore'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...infoValues,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
      step: (prevValues.step as number) + 1,
    }))
  }

  return (
    <div>
      {applyValues.step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {applyValues.step === 1 ? (
        <BasicInfo onNext={handleBasicInfoChange} />
      ) : null}
      {applyValues.step === 2 ? (
        <CardInfo onNext={handleCardInfoChange} />
      ) : null}
    </div>
  )
}
export default Apply
