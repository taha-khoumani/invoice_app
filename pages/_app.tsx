import type { AppProps } from 'next/app'
import Wraper from '@/components/app/Wraper'
import '@/styles/css/globals.css'
import { Provider } from 'react-redux'
import {store} from "@/redux/store"

export default function App({ Component, pageProps }: AppProps) {
  return(
    <Provider store={store} >
      <Wraper>
        <Component {...pageProps} />
      </Wraper>
    </Provider>
  ) 
}
