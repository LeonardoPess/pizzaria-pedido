/* eslint-disable no-unused-vars */
import { CompleteOrderForm } from './components/CompleteOrderForm'
import { SelectedProducts } from './components/SelectedProducts'
import { CompleteOrderContainer } from './styles'
import { useForm, FormProvider } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

enum PaymentMethods {
  card = 'card',
  pix = 'pix',
  money = 'money',
}

const confirmOrderFormValidationSchema = zod.object({
  name: zod.string().min(3, 'Informe o nome do cliente'),
  phone: zod.string().min(0, 'Informe o telefone do cliente'),
  deliveryMethod: zod.string().min(1, 'Informe o método de entrega'),
  street: zod.string().min(0, 'Informe o Rua'),
  number: zod.string().min(0, 'Informe o Número'),
  complement: zod.string(),
  district: zod.string().min(0, 'Informe o Bairro'),
  observation: zod.string(),
  paymentMethod: zod.nativeEnum(PaymentMethods, {
    errorMap: () => {
      return { message: 'Informe o método de pagamento' }
    },
  }),
})

export type OrderData = zod.infer<typeof confirmOrderFormValidationSchema>

type ConfirmOrderFormData = OrderData

export function CompleteOrderPage() {
  const confirmOrderForm = useForm<ConfirmOrderFormData>({
    resolver: zodResolver(confirmOrderFormValidationSchema),
    defaultValues: {
      paymentMethod: undefined,
      deliveryMethod: 'delivery',
    },
  })

  const { handleSubmit } = confirmOrderForm

  const navigate = useNavigate()
  const { cleanCart } = useCart()

  function handleConfirmOrder(data: ConfirmOrderFormData) {
    navigate('/orderConfirmed', {
      state: data,
    })
    // cleanCart()
  }

  return (
    <FormProvider {...confirmOrderForm}>
      <CompleteOrderContainer
        className="container"
        onSubmit={handleSubmit(handleConfirmOrder)}
      >
        <CompleteOrderForm />
        <SelectedProducts />
      </CompleteOrderContainer>
    </FormProvider>
  )
}
