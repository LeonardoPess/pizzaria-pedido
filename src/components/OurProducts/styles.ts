import styled from 'styled-components'

export const OurProductsContainer = styled.section`
  width: 100%;
  margin-top: 2rem;

  .topWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    > div {
      display: flex;
      gap: 1rem;
    }
  }

  select {
    border: none;
    cursor: pointer;
  }
`

export const ProductList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2rem;
  row-gap: 3.5rem;
  margin-top: 3.5rem;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`
