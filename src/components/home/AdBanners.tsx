import styled from '@emotion/styled'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import { colors } from '@styles/colorPalette'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAdBanners } from '@remote/adBanner'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

function AdBanners() {
  const { data } = useQuery({
    queryFn: getAdBanners,
    queryKey: ['adBanners'],
  })
  console.log(data)
  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link}>
                <Flex direction="column" css={bannerContainerStyles}>
                  <Text bold>{banner.title}</Text>
                  <Text typography="t7">{banner.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.gray};
  border-radius: 4px;
`

export default AdBanners
