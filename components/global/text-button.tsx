import { type ComponentProps, type FC } from "react"

interface TextButtonProps extends ComponentProps<'button'> {
  active?: boolean
}

export const TextButton: FC<TextButtonProps> = (props) => {
  const { className = '', children, active, ...rest } = props
  return (
    <button
      className={`
        ${className}
        ${active ? 
          'text-royal-blue dark:text-royal-blue-dark' : 
          'text-black dark:text-off-white hover:text-royal-blue active:text-royal-blue dark:hover:text-royal-blue-dark dark:active:text-royal-blue-dark'}
        transition-colors duration-300 ease
      `} 
      {...rest}
    >
      {children}
    </button>
  )
}