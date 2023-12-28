import { Car, PersonSimpleWalk } from 'phosphor-react'
import { DeliveryMethodOptionsContainer } from './styles'
import { useFormContext } from 'react-hook-form'
import { DeliveryMethodInput } from '../DeliveryMethodInput'

interface DeliveryMethodOptionsProps{
  setIsDelivery: (isDelivery: boolean) => void
}

const deliveryOptions = {
  delivery: {
    label: 'Delivery',
    icon: <Car size={16} />,
  },
  comeGet: {
    label: 'Vem buscar',
    icon: <PersonSimpleWalk size={16} />,
  }
}

export function DeliveryMethodOptions({ setIsDelivery }: DeliveryMethodOptionsProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()


  return (
    <DeliveryMethodOptionsContainer>
      {Object.entries(deliveryOptions).map(([key, { label, icon }]) => (
        <DeliveryMethodInput
          key={label}
          id={key}
          icon={icon}
          label={label}
          value={key}
          onClick={() => setIsDelivery(label == 'Delivery' ? true : false)}
          {...register('deliveryMethod')}
        />
      ))}
    </DeliveryMethodOptionsContainer>
  )
}
