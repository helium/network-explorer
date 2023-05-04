"use client"

import {
  Duration,
  differenceInDays,
  intervalToDuration,
  isAfter,
} from "date-fns"
import { useEffect, useRef, useState } from "react"
// broken into separate Client side component since Date cannot be passed down from server

import { CountdownProps } from "react-countdown"

const CountdownRenderer = ({ days, hours, minutes, seconds }: Duration) => {
  let countdown = ""
  if (!!days) {
    countdown = `${days} days`
    if (days < 10) countdown += ` ${hours}:${minutes}:${seconds}`
  } else countdown = `${hours}:${minutes}:${seconds}`
  return <span className="text-base">{countdown}</span>
}

const NO_INTERVAL = intervalToDuration({
  start: new Date(0),
  end: new Date(0),
})

export const Countdown = (props: CountdownProps) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(count)
  countRef.current = count

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const now = new Date()
  const target = new Date(props.date)
  const timeUntil = intervalToDuration({
    start: new Date(),
    end: target,
  })
  timeUntil.days = differenceInDays(target, now)

  const countdownPast = isAfter(now, target)
  const duration = countdownPast ? NO_INTERVAL : timeUntil

  return <CountdownRenderer {...duration} />
}
