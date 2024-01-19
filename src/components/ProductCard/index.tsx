import { QuantityInput } from '../QuantityInput'
import { RegularText, TitleText } from '../Typography'
import {
  ProductCardContainer,
  Tags,
  Name,
  Description,
  CardFooter,
  AddCartWrapper,
} from './styles'
import { ShoppingCart } from 'phosphor-react'
import { useCart } from '../../hooks/useCart'
import { useState } from 'react'
import { formatMoney } from '../../utils/formatMoney'

export interface Product {
  id: number
  tags: string
  name: string
  description: string
  img: string
  price: number
}

interface ProductProps {
  product: Product
  isHalf: boolean
}

export function ProductCard({ product, isHalf }: ProductProps) {
  const { addProductToCart } = useCart()

  const [quantity, setQuantity] = useState(1)

  function handleIncrease() {
    setQuantity((state) => state + 1)
  }

  function handleDecrease() {
    setQuantity((state) => state - 1)
  }

  if (!product.tags.includes("pizza")) isHalf = false;

  function handleAddToCart() {
    const productToAdd = {
      ...product,
      name: isHalf ? product.name + ' 1/2' : product.name,
      price: isHalf ? Number((product.price / 2).toFixed(2)) : product.price,
      quantity,
    }

    addProductToCart(productToAdd)

    setQuantity(1)
  }

  const formattedPrice = isHalf ? formatMoney(Number((product.price / 2).toFixed(2))) : formatMoney(Number(product.price))

  return (
    <ProductCardContainer>
      <img src={product.img} alt="" />

      <Tags>
        {product.tags.split(",").map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </Tags>

      <Name>{product.name} {isHalf && "1/2"}</Name>
      <Description>{product.description}</Description>

      <CardFooter>
        <div>
          <RegularText size="s">R$</RegularText>
          <TitleText size="m" color="text" as="strong">
            {formattedPrice}
          </TitleText>
        </div>

        <AddCartWrapper>
          <QuantityInput
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            quantity={quantity}
          />
          <button onClick={handleAddToCart}>
            <ShoppingCart weight="fill" size={22} />
          </button>
        </AddCartWrapper>
      </CardFooter>
    </ProductCardContainer>
  )
}
