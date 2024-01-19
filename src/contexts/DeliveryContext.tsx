import { createContext, ReactNode, useState } from 'react'

interface DeliveryContextType {
  isDelivery: boolean
  hasDelivery: (hasDelivery: boolean) => void
  deliveryPrice: number
  setDeliveryPrice: (deliveryPrice: number) => void
}

interface DeliveryContextProviderProps {
  children: ReactNode
}

export const DeliveryContext = createContext({} as DeliveryContextType)

export function DeliveryContextProvider({ children }: DeliveryContextProviderProps) {
  const [ isDelivery, setIsDelivery ] = useState(true);
  const [ deliveryPrice, setDeliveryPrice ] = useState(0)

  function hasDelivery(hasDelivery: boolean) {
    if(hasDelivery) {
      setIsDelivery(true)
    } else {
      setIsDelivery(false)
      setDeliveryPrice(0)
    }
  }



  return (
    <DeliveryContext.Provider
      value={{
        isDelivery,
        hasDelivery,
        deliveryPrice,
        setDeliveryPrice,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  )
}
