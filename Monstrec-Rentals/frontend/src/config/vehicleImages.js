// Vehicle image URLs mapping
export const VEHICLE_IMAGES = {
  'Piaggio Vespa S125': 'https://wlassets.vespa.com/wlassets/vespa/my/s-125/03-hotspot/Artboard-2/original/Artboard+2.png?1756453507925',
  'Royal Enfield Classic 350': 'https://unsplash.com/photos/a-black-motorcycle-parked-in-front-of-a-building-k8DsZ8bqVGY',
  'Suzuki Burgman Street 125': 'https://imgcdn.oto.com/large/gallery/exterior/92/2828/suzuki-burgman-street-125-ex-slant-rear-view-full-image-592851.jpg',
  'KTM Duke 250': 'https://images.unsplash.com/photo-1610553556003-9b2ae8ef1b8e?w=1000',
  'Hero Splendor Plus': 'https://www.heromotocorp.com/content/dam/hero-commerce/in/en/products/practical/splendor-plus/HSPUMDRSCFIBBK/360/1.png',
  'Honda PCX 160': 'https://images.unsplash.com/photo-1628798211398-29d5c9773fbd?w=1000',
  'Honda Activa 6G': 'https://images.unsplash.com/photo-1716574400004-ba794161f8cd?w=1000',
  'TVS Jupiter ZX': 'https://media.istockphoto.com/id/152990973/photo/scooter.webp',
  'Honda CB Shine': 'https://images.unsplash.com/photo-1684607396581-e037c3a5984d?w=1000',
  'Yamaha FZ-Fi V3.0': 'https://images.unsplash.com/photo-1625826425873-af4d9c357c4d?w=1000',
  'Bajaj Pulsar 125': 'https://images.unsplash.com/photo-1629616092586-636e3010398a?w=1000',
  'Hero HF Deluxe': 'https://images.unsplash.com/photo-1630167954300-aec0e9a8624c?w=1000',
};

// Location images
export const LOCATION_IMAGES = {
  'Kathmandu': 'https://peakvisor.com/photo/HD/Kathmandu-distant-view-nyatapola-temple-taumadhi-square-1559765687.jpg',
  'Pokhara': 'https://www.acethehimalaya.com/wp-content/uploads/2024/02/things-to-do-in-pokhara.jpg',
  'Chitwan': 'https://www.thirdrockadventures.com/assets-back/images/blog/chitwan-national-park.jpgnB3.jpg',
  'Lumbini': 'https://dynamic-media.tacdn.com/media/photo-o/2e/f6/3d/a6/caption.jpg?w=1400&h=1000&s=1',
  'Mustang': 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/5d/17/bd/muktinath-temple.jpg?w=600&h=500&s=1',
  'Butwal': 'https://risingnepaldaily.com/storage/media/26250/118582708_4262380870503511_7191211685942392003_n.jpg',
};

// Get vehicle image URL
export const getVehicleImage = (vehicleName) => {
  return VEHICLE_IMAGES[vehicleName] || 'https://via.placeholder.com/400x300?text=Vehicle';
};

// Get location image URL
export const getLocationImage = (locationName) => {
  return LOCATION_IMAGES[locationName] || 'https://via.placeholder.com/400x300?text=Location';
};
