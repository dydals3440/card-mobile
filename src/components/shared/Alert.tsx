import styled from '@emotion/styled'
import React from 'react'
import Dimmed from '@shared/Dimmed'
import { colors } from '@styles/colorPalette'
import Text from '@shared/Text'

import Flex from '@shared/Flex'
import Button from '@shared/Button'

interface AlertProps {
  open?: boolean
  title: React.ReactNode
  description?: React.ReactNode
  buttonLabel?: string
  onButtonClick: () => void
}

function Alert({
  open,
  title,
  buttonLabel,
  onButtonClick,
  description,
}: AlertProps) {
  if (open === false) {
    return null
  }

  return (
    <Dimmed>
      <AlertContainer>
        <Text typography="t4" bold display="block" style={{ marginBottom: 6 }}>
          {title}
        </Text>
        {description ? <Text typography="t7">{description}</Text> : null}
        <Flex justify="flex-end">
          <Button
            onClick={onButtonClick}
            weak
            style={{ marginTop: 12, border: 'none' }}
          >
            {buttonLabel}
          </Button>
        </Flex>
      </AlertContainer>
    </Dimmed>
  )
}

const AlertContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  // 자기의 50만큼만 가져오게함.
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 8px;
  overflow: hidden;
  z-index: var(--alert-zindex);
  width: 320px;
  padding: 24px;
  box-sizing: border-box;
`

export default Alert
