import { CustomerFormContainer } from './styles'
import { useFormContext } from 'react-hook-form'
import { Input } from '../../../../components/Input'

interface ErrorsType {
  errors: {
    [key: string]: {
      message: string
    }
  }
}

export function CustomerForm() {
  const { register, formState } = useFormContext()

  const { errors } = formState as unknown as ErrorsType

  return (
    <CustomerFormContainer>
      <div className="row">
        <Input
          type="text"
          placeholder="Nome"
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
