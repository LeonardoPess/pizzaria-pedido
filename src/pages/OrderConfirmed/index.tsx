import { RegularText, TitleText } from '../../components/Typography'
import { OrderConfirmedContainer, OrderDetailsContainer } from './styles'

import confirmedOrderIllustration from '../../assets/confirmed-order.svg'
import { InfoWithIcon } from '../../components/InfoWithIcon'

import ReactToPrint from "react-to-print";
import { MapPin, Clock, CurrencyDollar, IdentificationCard } from 'phosphor-react'
import { useTheme } from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { OrderData } from '../CompleteOrder'
import { paymentMethods } from '../CompleteOrder/components/CompleteOrderForm/PaymentMethodOptions'
import { useEffect, useRef } from 'react'
import { Button } from '../../components/Button'
import { ProductCartPrint } from './ProductCartPrint';

interface LocationType {
  state: OrderData
}

export function OrderConfirmedPage() {
  const { colors } = useTheme()

  const { state } = useLocation() as LocationType

  const navigate = useNavigate()

  const ref = useRef<any>();

  useEffect(() => {
    if (!state) {
      navigate('/')
    }
  }, [])

  if (!state) return <></>

  return (
    <OrderConfirmedContainer className="container">
      <div>
        <TitleText size="l">Uhu! Pedido confirmado</TitleText>
        <RegularText size="l" color="subtitle">
          Agora é só aguardar que logo sua pizza chegará até você
        </RegularText>
      </div>

      <section>
        <OrderDetailsContainer>
          <InfoWithIcon
            icon={<IdentificationCard weight="fill" />}
            iconColor={colors['brand-purple-dark']}
            text={
              <RegularText>
                Pedido para {' '}
                <strong>
                  {state.name} - {state.phone}
                </strong>
              </RegularText>
            }
          />
  
          <InfoWithIcon
            icon={<MapPin weight="fill" />}
            iconColor={colors['brand-purple']}
            text={
              state.deliveryMethod == 'comeGet' ? (
                <RegularText><strong>Vem buscar</strong></RegularText>
              ) : (
                <RegularText>
                  Entrega em {' '}
                  <strong>
                    {state.district}, {state.street}, {state.number}
                  </strong>
                </RegularText>
              )
            }
          />

          <InfoWithIcon
            icon={<Clock weight="fill" />}
            iconColor={colors['brand-yellow']}
            text={
              <RegularText>
                Previsão de entrega
                <br />
                <strong>20 min - 30 min</strong>
              </RegularText>
            }
          />

          <InfoWithIcon
            icon={<CurrencyDollar weight="fill" />}
            iconColor={colors['brand-yellow-dark']}
            text={
              <RegularText>
                Pagamento na entrega
                <br />
                <strong>{paymentMethods[state.paymentMethod].label}</strong>
              </RegularText>
            }
          />

          <ReactToPrint
            bodyClass="print-agreement"
            content={() => ref.current}
            trigger={() => (
              <Button type="button" text="Imprimir pedido"/>
            )}
          />

          <div ref={ref} style={{padding: '1rem'}}>
            <ProductCartPrint state={state} />
          </div>
        </OrderDetailsContainer>

        <img src={confirmedOrderIllustration} alt="" />
      </section>
    </OrderConfirmedContainer>
  )
}
