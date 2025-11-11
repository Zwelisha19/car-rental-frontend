

// src/components/SearchBar.jsx
import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from './ui/button';

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const southAfricanCities = [
    'Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth',
    'Bloemfontein', 'East London', 'Pietermaritzburg', 'Kimberley', 'Polokwane',
    'Nelspruit', 'Rustenburg', 'Welkom', 'George', 'Soweto'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search:', { location, pickupDate, returnDate, passengers });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Location */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">
            <MapPin className="h-4 w-4 inline mr-1" />
            Pick-up Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
            required
          >
            <option value="">Select a city</option>
            {southAfricanCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Pick-up Date */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Calendar className="h-4 w-4 inline mr-1" />
            Pick-up Date
          </label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
            required
          />
        </div>

        {/* Return Date */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Calendar className="h-4 w-4 inline mr-1" />
            Return Date
          </label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
            required
          />
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            type="submit"
            className="w-full bg-white text-blue-600 hover:bg-blue-50 py-3 text-lg font-semibold shadow-lg"
          >
            <Search className="h-5 w-5 mr-2" />
            Search Cars
          </Button>
        </div>
      </form>
    </div>
  );
}