import clsx from 'clsx'

function Office({ name, children, invert = false }) {
  return (
    <address
      className={clsx('text-sm not-italic', invert ? 'text-neutral-300' : 'text-neutral-600')}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>{name}</strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({ invert = false, ...props }) {
  return (
    <ul role='list' {...props}>
      <li>
        <Office name='Ha Noi' invert={invert}>
          HCO Building
          <br />
          44B Ly Thuong Kiet, Hoan Kiem
        </Office>
      </li>
      <li>
        <Office name='Ho Chi Minh' invert={invert}>
          91 Pasteur
          <br />
          Ben Nghe, Quan 1
        </Office>
      </li>
    </ul>
  )
}
