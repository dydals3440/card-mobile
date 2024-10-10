import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCard } from '@remote/card'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import Top from '@shared/Top'
import ListRow from '@shared/ListRow'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import { useCallback } from 'react'
import useUser from '@hooks/auth/useUser'
import { useAlertContext } from '@contexts/AlertContext'

function CardPage() {
  const { id = '' } = useParams()
  const user = useUser()
  const { open } = useAlertContext()

  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id),
    // id가 없을 수 있으니.
    // id가 빈값이 아니면 호출하겠다는 의미.
    enabled: id !== '',
  })

  const moveToApply = useCallback(() => {
    if (user == null) {
      open({
        buttonLabel: '확인',
        title: '로그인이 필요한 기능입니다.',
        onButtonClick: () => {
          navigate('/signin')
        },
      })

      return
    }

    navigate(`/apply/${id}`)
  }, [user, id, open, navigate])

  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(', ')
  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />
      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              initial={{ opacity: 0, translateX: -90 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              // animate={{ opacity: 1, translateX: 0 }}
              transition={{
                duration: 1.5,
                ease: [0.25, 0.1, 0.25, 0.1],
                delay: index * 0.1,
              }}
            >
              <ListRow
                as="div"
                left={<IconCheck />}
                key={text}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>
      {promotion != null ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}
      <FixedBottomButton label="신청하기" onClick={moveToApply} />
    </div>
  )
}

function removeHtmlTags(text: string) {
  let output = ''
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j += 1) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      output += text[i]
    }
  }
  return output
}

function IconCheck() {
  return (
    <svg
      fill="blue"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M10,13.5857864 L15.2928932,8.29289322 L16.7071068,9.70710678 L10,16.4142136 L6.29289322,12.7071068 L7.70710678,11.2928932 L10,13.5857864 Z"
        fill-rule="evenodd"
      />
    </svg>
  )
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`

export default CardPage
