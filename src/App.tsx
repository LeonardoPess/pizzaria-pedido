import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CartContextProvider } from './contexts/CartContext'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { DeliveryContextProvider } from './contexts/DeliveryContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <BrowserRouter basename="/">
        <DeliveryContextProvider>
          <CartContextProvider>
            <Router />
          </CartContextProvider>
        </DeliveryContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
