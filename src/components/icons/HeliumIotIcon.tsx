import { HELIUM_IOT_COLOR } from "../HotspotsMap/utils"

export function HeliumIotIcon(props: { className?: string; fill?: string }) {
  const fill = props.fill || HELIUM_IOT_COLOR
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256C0 397.385 114.615 512 256 512ZM324.59 323.365C362.471 285.526 362.471 224.176 324.59 186.337C286.709 148.497 225.291 148.497 187.41 186.337C149.529 224.176 149.529 285.526 187.41 323.365C194.83 330.777 194.83 342.793 187.41 350.205C179.99 357.616 167.96 357.616 160.541 350.205C107.82 297.542 107.82 212.159 160.541 159.497C213.261 106.834 298.739 106.834 351.459 159.497C404.18 212.159 404.18 297.542 351.459 350.205C344.04 357.616 332.01 357.616 324.59 350.205C317.17 342.793 317.17 330.777 324.59 323.365ZM256.005 259.894C266.498 259.894 275.004 267.975 275.004 277.943V349.951C275.004 359.919 266.498 368 256.005 368C245.511 368 237.005 359.919 237.005 349.951V277.943C237.005 267.975 245.511 259.894 256.005 259.894ZM256.005 204.693C266.498 204.693 275.004 213.19 275.004 223.672V223.932C275.004 234.414 266.498 242.911 256.005 242.911C245.511 242.911 237.005 234.414 237.005 223.932V223.672C237.005 213.19 245.511 204.693 256.005 204.693Z"
        fill={fill}
      />
    </svg>
  )
}
