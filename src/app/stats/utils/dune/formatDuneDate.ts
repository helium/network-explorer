import { format } from "date-fns"

const DATE_FORMAT = "M/dd HH:mm OOOO"

export const formatDuneDate = (date: string) => {
  return format(new Date(date), DATE_FORMAT)
}
