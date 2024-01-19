import { useContext } from 'react'
import { DeliveryContext } from '../contexts/DeliveryContext'

export function useDelivery() {
  return useContext(DeliveryContext)
}
