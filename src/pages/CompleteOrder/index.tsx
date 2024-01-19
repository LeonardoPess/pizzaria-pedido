/* eslint-disable no-unused-vars */
import { CompleteOrderForm } from './components/CompleteOrderForm'
import { SelectedProducts } from './components/SelectedProducts'
import { CompleteOrderContainer } from './styles'
import { useForm, FormProvider } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDelivery } from '../../hooks/useDelivery'
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
  deliveryPrice: zod.string().min(0, 'Informe o Frete'),
  paymentMethod: zod.nativeEnum(PaymentMethods, {
    errorMap: () => {
      return { message: 'Informe o método de pagamento' }
    },
  }),
})

export type OrderData = zod.infer<typeof confirmOrderFormValidationSchema>

type ConfirmOrderFormData = OrderData

export function CompleteOrderPage() {
  const { cartItems, cartItemsTotal } = useCart()
  const { isDelivery }  = useDelivery();
  const confirmOrderForm = useForm<ConfirmOrderFormData>({
    resolver: zodResolver(confirmOrderFormValidationSchema),
    defaultValues: {
      paymentMethod: undefined,
      deliveryMethod: 'delivery',
    },
  })

  const { handleSubmit } = confirmOrderForm

  const navigate = useNavigate()
  const ORDER_NUMBER_STORAGE_KEY = 'ProductDelivery:orderNumber'

  function handleConfirmOrder(data: ConfirmOrderFormData) {
    function createCustomer() {
      if(isDelivery) {
        axios.post("https://pizzaria-back.pessoa.tech/api-create-customer", {
          ...data
        })
        .then(() => {
          navigate('/orderConfirmed', {
            state: data,
          })
        })
        .then((error) => console.log(error));
      } else {
        navigate('/orderConfirmed', {
          state: data,
        })
      }
    }

    function createOrder() {
      const d = new Date();
      const hoursAndMinutes = d.getHours()+":"+d.getMinutes();
      const storedOrderNumber = localStorage.getItem(ORDER_NUMBER_STORAGE_KEY)
      const orderNumber = storedOrderNumber ? JSON.parse(storedOrderNumber) : 0
      const date = new Date().toLocaleDateString('en-GB') + " " + hoursAndMinutes
      const customer = JSON.stringify(data)
      const products = JSON.stringify(cartItems)
      const cartItemsTotalPrice = JSON.stringify(cartItemsTotal)
      const state = 'pending'
  
      axios.post("https://pizzaria-back.pessoa.tech/api-create-order", {
        date,
        orderNumber,
        customer,
        products,
        cartItemsTotalPrice,
        state
      })
      .then(() => createCustomer())
      // .then((error) => console.log(error));
    }

    createOrder()
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
