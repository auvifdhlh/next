// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

import '@/styles/globals.css'
import '@/styles/form.css'

export default function MyApp({Component,pageProps}) {
  return <Component {...pageProps}/>
  }