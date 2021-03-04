import haversine from 'haversine-distance'

export default (req, res) => {
  const {originAddress, destinationAddress, radius} = req.body
  
  const a = { latitude: originAddress.latitude, longitude: originAddress.longitude }
  const b = { latitude: destinationAddress.latitude, longitude: destinationAddress.longitude }

  const radiusMeters = radius * 1000
  const meters = (Math.abs(haversine(a, b)))

  res.status(radiusMeters >= meters ? 200 : 400).json({ meters: meters, kilometers: meters/1000, inside: radiusMeters >= meters })
}