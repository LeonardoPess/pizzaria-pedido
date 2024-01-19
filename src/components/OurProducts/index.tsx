import { ProductCard } from '../ProductCard'
import { TitleText } from '../Typography'
import { ProductList, OurProductsContainer } from './styles'

import { productsMock } from '../../mock/products'
import { Input } from '../Input'
import { useEffect, useState } from 'react'
import { Button } from '../Button'

interface Product {
  id: number,
  tags: string,
  name: string,
  description: string,
  img: string,
  price: number,
}

export function OurProducts() {
  const [nameSearch, setNameSearch] = useState('');
  const [tagSearch, setTagSearch] = useState('all');
  const [products, setProducts] = useState<Product[]>(productsMock);
  const [isHalf, setIsHalf] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('https://pizzaria-back.pessoa.tech/api-stock')
      const productsApi = await response.json();
      setProducts(productsApi)
   }
 
   fetchProducts()
  }, [])

  return (
    <OurProductsContainer className="container">

      <div className='topWrapper'>
        <TitleText size="l" color="subtitle">
          Nossas Pizzas e bebidas
        </TitleText>

        <div>
          <Button
            text={'Metade'}
            style={{margin: '0', background: isHalf ? '#4B2995' : '#D7D5D5', color: isHalf ? '#FFFFFF' : '#4B2995'}}
            onClick={() => setIsHalf(!isHalf)}
          />
          <Input
            placeholder="Pesquisar"
            type="search"
            value={nameSearch}
            onChange={(e) => {setNameSearch(e.target.value)}}
          />

          <select name="tags" id="tags" onChange={(e) => setTagSearch(e.target.value)}>
            <option value="all">Todos</option>
            <option value="pizza">Pizzas</option>
            <option value="promoção">Promoção</option>
            <option value="doce">Doces</option>
            <option value="meio a meio">Meio a meio</option>
            <option value="tradicional">Tradicional</option>
            <option value="gourmet">Gourmet</option>
            <option value="borda">Bordas</option>
            <option value="bebida">Bebidas</option>
          </select>
        </div>
      </div>

      <ProductList>
        {products.map((product) => (
          nameSearch == '' ? (
            (tagSearch != 'all') ? (
              product.tags.split(",").map((tag) => 
                (tagSearch == tag.trim()) && <ProductCard key={product.id} product={product} isHalf={isHalf} />
              )
            ) : (
              <ProductCard key={product.id} product={product} isHalf={isHalf} />
            )
          ) : (
            (tagSearch != 'all') ? (
              product.tags.split(",").map((tag) => 
                (tagSearch == tag.trim() && product.name.toLowerCase().includes(nameSearch.toLowerCase())) && <ProductCard key={product.id} product={product} isHalf={isHalf} />
              )
            ) : (
              product.name.toLowerCase().includes(nameSearch.toLowerCase()) && <ProductCard key={product.id} product={product} isHalf={isHalf} />
            )
            )
        ))}
      </ProductList>
    </OurProductsContainer>
  )
}

