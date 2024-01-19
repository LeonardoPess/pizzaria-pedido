import { AddressFormContainer } from './styles'
import { useFormContext, useWatch } from 'react-hook-form'
import { Input } from '../../../../components/Input'
import { useCallback, useEffect, useState } from 'react'
import { useDelivery } from '../../../../hooks/useDelivery'

interface ErrorsType {
  errors: {
    [key: string]: {
      message: string
    }
  }
}

interface Customer {
  id: number
  name: string
  phone: string
  street: string
  number: string
  district: string
  complement: string
}

interface AddressFormProps {
  customer: Customer
}

export function AddressForm({ customer }: AddressFormProps) {
  const { setDeliveryPrice, deliveryPrice } = useDelivery()
  const { register, formState, control, setValue } = useFormContext()

  const { errors } = formState as unknown as ErrorsType

  const districtInputValue = useWatch({control, name: 'district'})
  const deliveryPriceInputValue = useWatch({control, name: 'deliveryPrice'})

  const getDeliveryPrice = useCallback(async () => {
    if(deliveryPriceInputValue) return setDeliveryPrice(Number(deliveryPriceInputValue))

    try {
      const response = await fetch(`https://pizzaria-back.pessoa.tech/api-get-delivery-data?origem=R. Roberto Gáspari, 11 - Fazenda Grande, Jundiaí - SP, 13212-405&destino=${districtInputValue}, Jundiaí - SP`);
      const { distance } = await response.json();
      const distanceNumberFormatted = Number(distance.replace(' km', '').replace(',', '.'));

      setDeliveryPrice(Math.round(distanceNumberFormatted * 1.5))
    } catch {
      console.log('erro ao calcular o frete');
    }
  }, [districtInputValue, deliveryPriceInputValue])

  useEffect(() => {
    getDeliveryPrice()
  }, [getDeliveryPrice])

  const updateAdress = useCallback(async () => {
    if(customer) {
      const { street, number, district, complement } = customer;
      street && setValue('street', street)
      number && setValue('number', number)
      district && setValue('district', district)
      complement && setValue('complement', complement)
    }
  }, [customer, setValue])

  useEffect(() => {
    updateAdress()
  }, [updateAdress])

  return (
    <AddressFormContainer>
      <div className="row">
        <Input
          placeholder="Rua"
          className="street"
          {...register('street')}
          error={errors.street?.message}
        />
        <Input
          type="number"
          placeholder="Número"
          {...register('number')}
          error={errors.number?.message}
        />
      </div>
      <div className="row">
        <Input
          placeholder="Bairro"
          {...register('district')}
          error={errors.district?.message}
        />
        <Input
          placeholder="Complemento"
          className="complement"
          {...register('complement')}
          error={errors.complement?.message}
          rightText="Opcional"
        />
      </div>
      <div className="row">
        <Input
          placeholder={String(deliveryPrice)}
          {...register('deliveryPrice')}
          error={errors.deliveryPrice?.message}
        />
      </div>
    </AddressFormContainer>
  )
}
