import { CustomerFormContainer } from './styles'
import { useFormContext } from 'react-hook-form'
import { Input } from '../../../../components/Input'
import { useEffect } from 'react'

interface ErrorsType {
  errors: {
    [key: string]: {
      message: string
    }
  }
}

interface CustomerProps{
  setCustomer: (customer: any) => void
  customer: any
}

export function CustomerForm({ setCustomer, customer }: CustomerProps) {
  const { register, formState, watch, setValue } = useFormContext()

  const { errors } = formState as unknown as ErrorsType

  let customerPhone = watch('phone');

  useEffect(() => {
    async function getDeliveryPrice() {
      try {
        if (customerPhone.length < 8 && customerPhone.length > 15) return;

        const response = await fetch(`https://pizzaria-back.pessoa.tech/api-get-customer?phone=${customerPhone}`);
        customer = await response.json();
        setCustomer(customer);
      } catch {
        console.log('erro ao calcular o frete');
      }
    }

    getDeliveryPrice()
  }, [customerPhone])

  if(customer) {
    const { name } = customer;
    name && setValue('name', name)
  }

  return (
    <CustomerFormContainer>
      <div className="row">
        <Input
          type="text"
          placeholder={customer ? customer.name : 'Nome'}
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          type="number"
          placeholder="Telefone"
          {...register('phone')}
          error={errors.phone?.message}
        />
      </div>
    </CustomerFormContainer>
  )
}
