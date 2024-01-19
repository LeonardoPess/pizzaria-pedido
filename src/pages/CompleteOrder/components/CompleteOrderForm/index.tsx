import { MapPinLine, CurrencyDollar, Note, IdentificationCard } from 'phosphor-react'
import { useTheme } from 'styled-components'
import { TitleText } from '../../../../components/Typography'
import { SectionTitle } from '../SectionTitle'
import { AddressForm } from './AddressForm'
import { PaymentMethodOptions } from './PaymentMethodOptions'
import { CompleteOrderFormContainer, FormSectionContainer } from './styles'
import { useState } from 'react'
import { DeliveryMethodOptions } from './DeliveryMethodOptions'
import { ObservationForm } from './ObservationForm'
import { CustomerForm } from './CustomerForm'
import { useDelivery } from '../../../../hooks/useDelivery'

export function CompleteOrderForm() {
  const { isDelivery }  = useDelivery();
  const [customer, setCustomer] = useState<any>();
  const { colors } = useTheme()


  return (
    <CompleteOrderFormContainer>
      <TitleText size="xs" color="subtitle">
        Complete seu pedido
      </TitleText>

      <FormSectionContainer>
        <SectionTitle
          title="Cliente"
          subtitle="Informe os dados do cliente"
          icon={<IdentificationCard color={colors['brand-purple']} size={22} />}
        />

        <CustomerForm customer={customer} setCustomer={setCustomer}/>
      </FormSectionContainer>

      <FormSectionContainer>
        <DeliveryMethodOptions />

        {isDelivery && (
          <>
            <SectionTitle
              title="Endereço de Entrega"
              subtitle="Informe o endereço onde deseja receber seu pedido"
              icon={<MapPinLine color={colors['brand-yellow-dark']} size={22} />}
            />
    
            <AddressForm customer={customer}  />
          </>
        )}

      </FormSectionContainer>

      <FormSectionContainer>
        <SectionTitle
          title="Observações do pedido"
          subtitle="Informe os complementos e detalhes do pedido"
          icon={<Note color={colors['brand-purple']} size={22} />}
        />

        <ObservationForm />
      </FormSectionContainer>

      <FormSectionContainer>
        <SectionTitle
          title="Pagamento"
          subtitle="O pagamento é feito na entrega. Escolha a forma que deseja pagar"
          icon={<CurrencyDollar color={colors['brand-purple']} size={22} />}
        />

        <PaymentMethodOptions />
      </FormSectionContainer>
    </CompleteOrderFormContainer>
  )
}
