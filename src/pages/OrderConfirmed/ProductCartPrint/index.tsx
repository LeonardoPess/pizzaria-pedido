import { RegularText } from '../../../components/Typography'
import { useCart } from '../../../hooks/useCart'
import { formatMoney } from '../../../utils/formatMoney'
import { OrderData } from '../../CompleteOrder'

interface LocationType {
  state: OrderData
}

const DELIVERY_PRICE = 3.5

export function ProductCartPrint({ state }: LocationType) {
  const { cartItemsTotal, cartQuantity, cartItems } = useCart()

  const cartTotal = DELIVERY_PRICE + cartItemsTotal

  const formattedDeliveryPrice = formatMoney(DELIVERY_PRICE)
  const formattedCartTotal = formatMoney(cartTotal)

  const d = new Date
  const dformat = [
        d.getDate(),
        d.getMonth()+1,
        d.getFullYear()].join('/')+' '+
        [d.getHours(),
        d.getMinutes(),
        d.getSeconds()].join(':');  

  return (
    <>
      <RegularText>{dformat}</RegularText>
      <strong>Pizzaria manah</strong>
      <br />
      <br />
      <hr />
      <p style={{fontSize: '1.5rem', textAlign: 'center'}}>ENTREGA: 187</p>
      <hr />
      <br />
      <RegularText>
        Cliente: {' '}
        <strong>
          {state.name}
        </strong>
      </RegularText>
      {state.deliveryMethod == 'comeGet' ? (
          <RegularText><strong>Vem buscar</strong></RegularText>
        ) : (
          <RegularText>
            Endereço: {' '}
            <strong>
              {state.district}, {state.street}, {state.number}
            </strong>
          </RegularText>
        )}
      <RegularText>
        Telefone: {' '}
        <strong>
          {state.phone}
        </strong>
      </RegularText>
      <br />
      <hr />
      <br />
      <table style={{width: '100%',textAlign:'left'}}>
        <thead>
          <th>Pedido</th>
          <th>Qtd.</th>
          <th>valor</th>
        </thead>
        <tbody>
          {cartItems.map((product) => (
            <tr>
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
      <p style={{fontSize: '1.2rem', textAlign: 'center'}}>Observação:</p>
      <RegularText>
        <strong>
          {state.observation}
        </strong>
      </RegularText>
      <br />
      <hr />
      <br />
      <RegularText>
        Sub total: {' '}
        <strong>
          {formattedCartTotal}
        </strong>
      </RegularText>
      <RegularText>
        Taxa da entrega: {' '}
        <strong>
          {formattedDeliveryPrice}
        </strong>
      </RegularText>
      <RegularText>
        Total: {' '}
        <strong>
          {formatMoney(cartTotal + DELIVERY_PRICE)}
        </strong>
      </RegularText>
      <RegularText>
        Forma de pagamento: {' '}
        <strong>
          {state.paymentMethod}
        </strong>
      </RegularText>
    </>
  )
}
