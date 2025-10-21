import { Star, Users, Cog, Fuel, Zap } from "lucide-react";
import { Button } from "./ui/button";

export function CarCard({ car, onBook }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {car.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold">{car.rating}</span>
            <span className="text-xs text-gray-500">({car.reviews})</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {car.name}
            </h3>
            <p className="text-gray-500 text-sm">{car.type}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">${car.price}</div>
            <div className="text-gray-500 text-sm">per day</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            {car.passengers} Passengers
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Cog className="h-4 w-4" />
            {car.transmission}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {car.fuel === "Electric" ? (
              <Zap className="h-4 w-4" />
            ) : (
              <Fuel className="h-4 w-4" />
            )}
            {car.fuel}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 text-center">🛄</div>
            {car.luggage} Luggage
          </div>
        </div>

        <Button
          onClick={() => onBook(car)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}