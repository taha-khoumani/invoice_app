import type { AppProps } from 'next/app'
import Wraper from '@/components/app/Wraper'
import '@/styles/css/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <Wraper>
      <Component {...pageProps} />
    </Wraper>
  ) 
}
