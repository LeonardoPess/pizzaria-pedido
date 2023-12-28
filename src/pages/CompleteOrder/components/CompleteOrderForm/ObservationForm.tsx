import { ObservationFormContainer } from './styles'
import { useFormContext } from 'react-hook-form'
import { Input } from '../../../../components/Input'

interface ErrorsType {
  errors: {
    [key: string]: {
      message: string
    }
  }
}

export function ObservationForm() {
  const { register, formState } = useFormContext()

  const { errors } = formState as unknown as ErrorsType

  return (
    <ObservationFormContainer>
      <div>
        <Input
          placeholder="Observações"
          type="text"
          {...register('observation')}
          error={errors.observation?.message}
        />
      </div>
    </ObservationFormContainer>
  )
}
