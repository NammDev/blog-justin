import '@/styles/tailwind.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='h-full bg-neutral-950 text-base antialiased'>
      <body className='flex min-h-full flex-col'>{children}</body>
    </html>
  )
}
