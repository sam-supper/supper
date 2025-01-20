export const IconArrowDiagonal = ({ className, size = 'lg' }: { className?: string, size?: 'sm' | 'lg' }) => {
  if (size === 'sm') {
    return (
      <svg className={className} role="presentation" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.67216 8.52214L0.833984 7.63467L6.50775 1.86608L2.23631 1.88252V0.699219H8.50647V7.07589H7.34593V2.73712L1.67216 8.52214Z" fill="currentColor"/>
      </svg>
    )
  }
  return (
    <svg className={className} role="presentation" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.79359 4.51487V0.925781H35.0106V29.0651H31.4178V7.14373L3.0883 35.4732L0.4375 32.7204L28.8067 4.4318L6.79359 4.51487Z" fill="currentColor"/>
    </svg>
  )
}