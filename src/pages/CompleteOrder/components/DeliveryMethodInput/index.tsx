import { DeliveryMethodContainer, ContentContainer } from './styles'
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

type DeliveryMethodInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: ReactNode
  label: string
}

// eslint-disable-next-line react/display-name
export const DeliveryMethodInput = forwardRef<
  HTMLInputElement,
  DeliveryMethodInputProps
>(({ id, icon, label, ...props }, ref) => {
  return (
    <DeliveryMethodContainer>
      <input id={id} type="radio" {...props} name="deliveryMethod" ref={ref} />
      <label htmlFor={id}>
        <ContentContainer>
          {icon}
          {label}
        </ContentContainer>
      </label>
    </DeliveryMethodContainer>
  )
})
