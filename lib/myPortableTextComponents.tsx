import { Border } from '@/components/Border'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { urlForImage } from '@/sanity/lib/image'
import { getImageDimensions } from '@sanity/asset-utils'
import clsx from 'clsx'

export const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const { width, height } = getImageDimensions(value)
      return (
        <div className='group isolate my-10 overflow-hidden rounded-4xl bg-neutral-100 max-sm:-mx-6'>
          <GrayscaleTransitionImage
            src={urlForImage(value)}
            loading='lazy'
            alt={value.alt || ' '}
            sizes='(min-width: 768px) 42rem, 100vw'
            className='aspect-[16/10] w-full object-cover'
            width={width}
            height={height}
            style={{
              // Avoid jumping around with aspect-ratio CSS property
              aspectRatio: width / height,
            }}
          />
        </div>
      )
    },
  },
  block: {
    blockquote: ({ children }: any) => (
      <Border position='left' className={clsx('my-10 pl-8')}>
        <p className='font-display text-sm font-bold uppercase tracking-widest text-neutral-950'>
          Top tip
        </p>
        <div className='mt-4'>
          <p className='text-[16px] leading-7'>{children}</p>
        </div>
      </Border>
    ),
  },
  table: function Table({ className, ...props }: { className: string }) {
    return (
      <div className={clsx('my-10 max-sm:-mx-6 max-sm:flex max-sm:overflow-x-auto', className)}>
        <div className='max-sm:min-w-full max-sm:flex-none max-sm:px-6'>
          <table {...props} />
        </div>
      </div>
    )
  },
}
