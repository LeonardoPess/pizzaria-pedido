import { ProductCard } from '../ProductCard'
import { TitleText } from '../Typography'
import { ProductList, OurProductsContainer } from './styles'

import { products } from '../../mock/products'
import { Input } from '../Input'
import { useState } from 'react'

export function OurProducts() {
  const [nameSearch, setNameSearch] = useState('');
  const [tagSearch, setTagSearch] = useState('all');

  return (
    <OurProductsContainer className="container">

      <div className='topWrapper'>
        <TitleText size="l" color="subtitle">
          Nossas Pizzas e bebidas
        </TitleText>

        <div>
          <Input
            placeholder="Pesquisar"
            type="search"
            value={nameSearch}
            onChange={(e) => {setNameSearch(e.target.value)}}
          />

          <select name="tags" id="tags" onChange={(e) => setTagSearch(e.target.value)}>
            <option value="all">Todos</option>
            <option value="pizza">Pizzas</option>
            <option value="doce">Doces</option>
            <option value="bebida">Bebidas</option>
          </select>
        </div>
      </div>

      <ProductList>
        {products.map((product) => (
          nameSearch == '' ? (
            (tagSearch != 'all') ? (
              product.tags.map((tag) => 
                (tagSearch == tag) && <ProductCard key={product.id} product={product} />
              )
            ) : (
              <ProductCard key={product.id} product={product} />
            )
          ) : (
            (tagSearch != 'all') ? (
              product.tags.map((tag) => 
                (tagSearch == tag && product.name.toLowerCase().includes(nameSearch.toLowerCase())) && <ProductCard key={product.id} product={product} />
              )
            ) : (
              product.name.toLowerCase().includes(nameSearch.toLowerCase()) && <ProductCard key={product.id} product={product} />
            )
            )
        ))}
      </ProductList>
    </OurProductsContainer>
  )
}

