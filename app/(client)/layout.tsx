import '@/styles/tailwind.css'
import { RootLayout } from '@/components/RootLayout'

export const metadata = {
  title: {
    template: '%s - Justin Bui',
    default: 'Justin Bui - Mirae Asset Company',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>
}
