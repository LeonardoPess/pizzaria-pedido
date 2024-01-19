import { OurProducts } from '../../components/OurProducts'
import { useDelivery } from '../../hooks/useDelivery'
import { Hero } from './components/Hero'
import { HomeContainer } from './styles'

export function Home() {
  const { hasDelivery } = useDelivery()
  hasDelivery(true)

  return (
    <HomeContainer>
      {/* <Hero /> */}

      <OurProducts />
    </HomeContainer>
  )
}
