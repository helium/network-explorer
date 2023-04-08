import HotspotsMap from "@/components/HotspotsMap"

export const metadata = {
  title: "Helium Hotspots Map",
}

const Home: React.FC = () => {
  return (
    <div className="h-full">
      <HotspotsMap />
    </div>
  )
}

export default Home
