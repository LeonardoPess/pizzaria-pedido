import { useCart } from '../../../hooks/useCart'
import { formatMoney } from '../../../utils/formatMoney'
import { OrderData } from '../../CompleteOrder'
import { paymentMethods } from '../../CompleteOrder/components/CompleteOrderForm/PaymentMethodOptions'
import { useDelivery } from '../../../hooks/useDelivery'
import { useEffect, useState } from 'react'
import { ProductCartPrintContainer } from './styles'


interface LocationType {
  state: OrderData
}

const ORDER_NUMBER_STORAGE_KEY = 'ProductDelivery:orderNumber'

export function ProductCartPrint({ state }: LocationType) {
  const [orderNumber, setOrderNumber] = useState(() => {
    const storedOrderNumber = localStorage.getItem(ORDER_NUMBER_STORAGE_KEY)

    if (storedOrderNumber) {
      return JSON.parse(storedOrderNumber)
    }

    return 0;
  })

  useEffect(() => {
    localStorage.setItem(ORDER_NUMBER_STORAGE_KEY, JSON.stringify(orderNumber + 1))
  }, [orderNumber])

  const { cartItemsTotal, cartItems } = useCart()
  const { deliveryPrice } = useDelivery()

  const formattedCartTotal = formatMoney(cartItemsTotal)

  const d = new Date
  const dformat = [
        String(d.getDate()).padStart(2, '0'),
        String(d.getMonth()+1).padStart(2, '0'),
        d.getFullYear()].join('/')+' '+
        [String(d.getHours()).padStart(2, '0'),
        String(d.getMinutes()).padStart(2, '0')].join(':');  

  return (
    <ProductCartPrintContainer>
      <p>{dformat}</p>
      <strong>Pizzaria manah</strong>
      <br />
      <br />
      <hr />
      <p style={{fontSize: '1.5rem', textAlign: 'center'}}>PEDIDO {orderNumber}</p>
      <hr />
      <br />
      <p>
        Cliente: {' '}
        <strong>
          {state.name}
        </strong>
      </p>
      {state.deliveryMethod == 'comeGet' ? (
          <p><strong>Vem buscar</strong></p>
        ) : (
          <p>
            Endereço: {' '}
            <strong>
              {state.district}, {state.street}, {state.number}
            </strong>
          </p>
        )}
      <p>
        Telefone: {' '}
        <strong>
          {state.phone}
        </strong>
      </p>
      <br />

      {state.observation && (
        <>
        <hr />
        <br />
        <p style={{fontSize: '1.2rem', textAlign: 'center'}}>Observação:</p>
        <br />
        <hr />
        <br />
        <p>
          <strong>
            {state.observation}
          </strong>
        </p>
        <br />
        </>
      )}
      
      <hr />
      <br />
      <table style={{width: '100%',textAlign:'left'}}>
        <thead>
          <td>Pedido</td>
          <td>Qtd.</td>
          <td>valor</td>
        </thead>
        <tbody>
          {cartItems.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{formatMoney(product.price * product.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <hr />
      <br />
      <p>
        Sub total: {' '}
        <strong>
          R$ {formattedCartTotal}
        </strong>
      </p>
      {state.deliveryMethod != 'comeGet' && (
        <p>
          Taxa da entrega: {' '}
          <strong>
            R$ {formatMoney(deliveryPrice)}
          </strong>
        </p>
      )}

      <p>
        Total: {' '}
        <strong>
          R$ {formatMoney(cartItemsTotal + deliveryPrice)}
        </strong>
      </p>
      <p>
        Forma de pagamento: {' '}
        <strong>
          {paymentMethods[state.paymentMethod].label}
        </strong>
      </p>
      <br />
      <br />
    </ProductCartPrintContainer>
  )
}
