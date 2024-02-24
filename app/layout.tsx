import { Inter } from 'next/font/google'
import '@/styles/tailwind.css'
import { RootLayout } from '@/components/RootLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    template: '%s - Studio',
    default: 'Studio - Award winning developer studio based in Denmark',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='h-full bg-neutral-950 text-base antialiased'>
      <body className='flex min-h-full flex-col'>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
