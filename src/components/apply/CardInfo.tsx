import Button from '@shared/Button'
import Spacing from '@shared/Spacing'

import { useCallback, useState, MouseEvent } from 'react'
import { ApplyValues } from '@models/apply'
import FixedBottomButton from '@shared/FixedBottomButton'

type CardInfoValues = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>

function CardInfo({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void
}) {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isHipass: false,
    isMaster: false,
    isRf: false,
  })

  const { isHipass, isMaster, isRf } = cardInfoValues

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLSelectElement

    console.log($button.name)
    // dataset -> value
    console.log($button.dataset)

    setCardInfoValues((prev) => ({
      ...prev,
      // 실제로 DOMStringMap { value: 'false' } -> false;
      [$button.name]: JSON.parse($button.dataset.value as string),
    }))
  }, [])

  return (
    <div>
      <Button.Group title="해외결제">
        <Button
          //  클릭 된 대상이 누군지 알게 함
          name="isMaster"
          weak={!isMaster}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          weak={isMaster}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          국내 전용
        </Button>
      </Button.Group>

      <Spacing size={12} />

      <Button.Group title="후불교통기능">
        <Button
          name="isRf"
          weak={isRf}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isRf"
          weak={!isRf}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <Spacing size={12} />

      <Button.Group title="후불하이패스카드">
        <Button
          name="isHipass"
          weak={isHipass}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isHipass"
          weak={!isHipass}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>
      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(cardInfoValues)
        }}
      />
    </div>
  )
}
export default CardInfo
