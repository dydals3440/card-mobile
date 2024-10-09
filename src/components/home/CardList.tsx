import ListRow from '@shared/ListRow'
import { useQuery } from '@tanstack/react-query'
import { getCards } from '@remote/card'
import Badge from '@shared/Badge'
import { useNavigate } from 'react-router-dom'

function CardList() {
  const { data } = useQuery({
    queryKey: ['cards'],
    queryFn: () => getCards(),
  })
  const navigate = useNavigate()

  if (data == null) {
    return null
  }

  return (
    <div>
      <ul>
        {data.items?.map((card, index) => {
          return (
            <ListRow
              onClick={() => navigate(`/card/${card.id}`)}
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow={true}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default CardList
