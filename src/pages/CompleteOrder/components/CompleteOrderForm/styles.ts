import styled from 'styled-components'
import { SectionBaseStyle } from '../../styles'

export const CompleteOrderFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`

export const FormSectionContainer = styled(SectionBaseStyle)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const CustomerFormContainer = styled.div`
  width: 100%;

  .row {
    display: flex;
    flex-direction: row;
    gap: 1rem;

    > div {
      flex: 1;
    }
    + .row {
      margin-top: 1rem;
    }

  }

  @media (max-width: 500px) {
    .row {
      flex-direction: column;
    }
  }
`

export const ObservationFormContainer = styled.div`
  width: 100%;

  .row {
    display: flex;
    flex-direction: row;
    gap: 1rem;

    > div {
      flex: 1;
    }
    + .row {
      margin-top: 1rem;
    }
  }
  @media (max-width: 500px) {
    .row {
      flex-direction: column;
    }
  }
`

export const AddressFormContainer = styled.div`
  width: 100%;

  .row {
    display: flex;
    flex-direction: row;
    gap: 1rem;

    > div {
      flex: 1;
    }
    + .row {
      margin-top: 1rem;
    }

    .street {
      flex: 4;
    }

    .complement {
      flex: 2;
    }
  }
  @media (max-width: 500px) {
    .row {
      flex-direction: column;
    }
  }
`

export const PaymentMethodOptionsContainer = styled.div`
  display: flex;
  gap: 0.75rem;

  > p {
    color: ${({ theme }) => theme.colors['base-error']};
  }

  @media (max-width: 620px) {
    flex-direction: column;
    gap: 0;
  }
`

export const DeliveryMethodOptionsContainer = styled.div`
  display: flex;
  gap: 0.75rem;

  > p {
    color: ${({ theme }) => theme.colors['base-error']};
  }

  @media (max-width: 620px) {
    flex-direction: column;
    gap: 0;
  }
`
