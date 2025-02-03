import { useMemo } from "react"

export const HomeGreeting = () => {
  const timeOfDay = useMemo(() => {
    const hours = new Date().getHours()
    if (hours < 12) return 'Morning'
    if (hours < 18) return 'Afternoon'
    return 'Evening'
  }, [])

  const formattedDate = useMemo(() => {
    const date = new Date()
    const day = date.getDate()
    const suffix = ['th', 'st', 'nd', 'rd'][(day % 10 > 3 ? 0 : day % 10) * (day < 10 || day > 20 ? 1 : 0)] || 'th'
    return date.toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric'
    }).replace(/\d+/, '') + day + suffix + ', ' + date.getFullYear()
  }, [])

  const formattedTime = useMemo(() => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes.toString().padStart(2, '0')
    return `${formattedHours} ${formattedMinutes} ${ampm}`
  }, [])

  return (
    <div className="px-site-x pt-80 flex flex-col items-center justify-center">
      <div className="uppercase text-grey">Good {timeOfDay}</div>
      <div>Today is {formattedDate}, {formattedTime}</div>
    </div>
  )
}