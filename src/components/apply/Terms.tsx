import { useCallback, useState, MouseEvent } from 'react'
import Agreement from '@shared/Agreement'
import FixedBottomButton from '@shared/FixedBottomButton'

import { 약관목록 } from '@constants/apply'

function Terms({ onNext }: { onNext: (terms: string[]) => void }) {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  console.log(termsAgreements)

  // ecery를 통해 모두 동의했는지 체크
  const 모든약관이_동의되었는가 = Object.values(termsAgreements).every(
    (동의여부) => 동의여부,
  )

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      console.log('checked', checked)

      setTermsAgreements((prevTerms) => {
        // 01, 02
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )

  return (
    <div>
      <Agreement>
        <Agreement.Title
          onChange={handleAllAgreement}
          checked={모든약관이_동의되었는가}
        >
          약관에 모두 동의
        </Agreement.Title>
        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreements((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={모든약관이_동의되었는가 === false}
        onClick={() => {
          // 내가 동의한 약관들의 key만 뺴옴.
          onNext(Object.keys(termsAgreements))
        }}
      />
    </div>
  )
}

export default Terms
