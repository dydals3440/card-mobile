import Top from '@shared/Top'
import AdBanners from '@components/home/AdBanners'

function HomePage() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드를 준비했습니다."
      />
      <AdBanners />
    </div>
  )
}

export default HomePage
