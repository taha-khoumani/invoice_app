import type { AppProps } from 'next/app'
import Wraper from '@/components/app/Wraper'
import '@/styles/css/globals.css'
import { Provider } from 'react-redux'
import {store} from "@/redux/store"
import { SessionProvider } from 'next-auth/react' 

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return(
    <SessionProvider session={session} >
      <Provider store={store} >
        <Wraper>
          <Component {...pageProps} />
        </Wraper>
      </Provider>
    </SessionProvider>
  ) 
}
