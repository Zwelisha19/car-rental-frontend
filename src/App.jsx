import { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SearchBar } from "./components/SearchBar";
import { CarCard } from "./components/CarCard";
import { FilterSidebar } from "./components/FilterSidebar";
import { BookingDialog } from "./components/BookingDialog";
import { Car as CarIcon, Menu, X, Star, Users, MapPin } from "lucide-react";
import { Button } from "./components/ui/button";
import "./index.css";

// Import your pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import VehicleManagement from "./pages/VehicleManagement";
import NotFound from "./pages/NotFound";

// Your existing car data
const mockCars = [
  {
    id: "1",
    name: "BMW 5 Series",
    type: "Luxury Sedan",
    image: "https://images.unsplash.com/photo-1698816688678-a3f838fd4fe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NjA1NzU4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 89,
    passengers: 5,
    transmission: "Automatic",
    fuel: "Gasoline",
    luggage: 3,
    rating: 4.8,
    reviews: 124,
    featured: true,
  },
  {
    id: "2",
    name: "Range Rover Sport",
    type: "Luxury SUV",
    image: "https://images.unsplash.com/photo-1642345810417-eecf7dda339b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMFNVViUyMGNhcnxlbnwxfHx8fDE3NjA1OTcxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 145,
    passengers: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    luggage: 5,
    rating: 4.9,
    reviews: 98,
    featured: true,
  },
  {
    id: "3",
    name: "Porsche 911",
    type: "Sports Car",
    image: "https://images.unsplash.com/photo-1653047257372-5f2a51257688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjByZWR8ZW58MXx8fHwxNzYwNTY0OTE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 299,
    passengers: 2,
    transmission: "Manual",
    fuel: "Gasoline",
    luggage: 1,
    rating: 5.0,
    reviews: 67,
    featured: true,
  },
  {
    id: "4",
    name: "Honda Civic",
    type: "Compact Sedan",
    image: "https://images.unsplash.com/photo-1743809809295-cfd2a2e3d40f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYWN0JTIwY2FyJTIwYmx1ZXxlbnwxfHx8fDE3NjA1OTcxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 45,
    passengers: 5,
    transmission: "Automatic",
    fuel: "Gasoline",
    luggage: 2,
    rating: 4.6,
    reviews: 203,
  },
  {
    id: "5",
    name: "Tesla Model 3",
    type: "Electric Sedan",
    image: "https://images.unsplash.com/photo-1692806224359-9cf5ae2df1aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGNhciUyMHdoaXRlfGVufDF8fHx8MTc2MDU3Mzc1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    price: 95,
    passengers: 5,
    transmission: "Automatic",
    fuel: "Electric",
    luggage: 2,
    rating: 4.7,
    reviews: 156,
    featured: true,
  },
  {
    id: "6",
    name: "BMW Z4 Roadster",
    type: "Convertible",
    image: "https://images.unsplash.com/photo-1656011475851-23f591606c0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb252ZXJ0aWJsZSUyMGNhcnxlbnwxfHx8fDE3NjA1OTcxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 179,
    passengers: 2,
    transmission: "Automatic",
    fuel: "Gasoline",
    luggage: 1,
    rating: 4.8,
    reviews: 89,
  },
  {
    id: "7",
    name: "Cadillac Escalade",
    type: "Luxury SUV",
    image: "https://images.unsplash.com/photo-1739950075618-f9ae2f90b0c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGx1eHVyeSUyMFNVVnxlbnwxfHx8fDE3NjA1OTcxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 189,
    passengers: 7,
    transmission: "Automatic",
    fuel: "Gasoline",
    luggage: 6,
    rating: 4.7,
    reviews: 72,
  },
  {
    id: "8",
    name: "Mercedes-Benz E-Class",
    type: "Luxury Sedan",
    image: "https://images.unsplash.com/photo-1757782630151-8012288407e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NjA1ODY1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 99,
    passengers: 5,
    transmission: "Automatic",
    fuel: "Hybrid",
    luggage: 3,
    rating: 4.9,
    reviews: 145,
  },
];

// Your car rental app as a separate component
function CarRentalApp() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [transmission, setTransmission] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredCars = useMemo(() => {
    return mockCars.filter((car) => {
      if (car.price < priceRange[0] || car.price > priceRange[1]) {
        return false;
      }

      if (selectedTypes.length > 0) {
        const carTypeKeywords = car.type.toLowerCase();
        const matchesType = selectedTypes.some((type) => {
          if (type === "sedan") return carTypeKeywords.includes("sedan");
          if (type === "suv") return carTypeKeywords.includes("suv");
          if (type === "sports") return carTypeKeywords.includes("sports");
          if (type === "compact") return carTypeKeywords.includes("compact");
          if (type === "electric") return car.fuel === "Electric";
          if (type === "convertible") return carTypeKeywords.includes("convertible");
          return false;
        });
        if (!matchesType) return false;
      }

      if (transmission !== "all") {
        if (
          transmission === "automatic" &&
          car.transmission.toLowerCase() !== "automatic"
        ) {
          return false;
        }
        if (
          transmission === "manual" &&
          car.transmission.toLowerCase() !== "manual"
        ) {
          return false;
        }
      }

      return true;
    });
  }, [priceRange, selectedTypes, transmission]);

  const handleBookCar = (car) => {
    setSelectedCar(car);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <CarIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-xl text-gray-900">DriveNow</div>
                <div className="text-xs text-gray-500">Premium Rentals</div>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#home" className="text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="#cars" className="text-gray-600 hover:text-blue-600 transition-colors">
                Browse Cars
              </a>
              <a href="#how" className="text-gray-600 hover:text-blue-600 transition-colors">
                How It Works
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </a>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Sign In
              </Button>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-6 space-y-4">
              <a href="#home" className="block text-gray-600 hover:text-blue-600">
                Home
              </a>
              <a href="#cars" className="block text-gray-600 hover:text-blue-600">
                Browse Cars
              </a>
              <a href="#how" className="block text-gray-600 hover:text-blue-600">
                How It Works
              </a>
              <a href="#contact" className="block text-gray-600 hover:text-blue-600">
                Contact
              </a>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                Sign In
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0tMjQgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMjQgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLzc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                <span className="text-sm">Rated 4.8/5 by 10,000+ customers</span>
              </div>
              <h1 className="text-5xl md:text-6xl mb-6 leading-tight">
                Rent Premium Cars,<br />
                <span className="text-blue-200">Drive with Confidence</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Choose from our extensive fleet of luxury and economy vehicles. Book online in minutes and hit the road.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl">
                  Browse Fleet
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-30"></div>
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <Users className="h-8 w-8 text-blue-200 mb-3" />
                      <div className="text-3xl mb-1">10K+</div>
                      <div className="text-sm text-blue-200">Happy Customers</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <CarIcon className="h-8 w-8 text-blue-200 mb-3" />
                      <div className="text-3xl mb-1">500+</div>
                      <div className="text-sm text-blue-200">Vehicles</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <MapPin className="h-8 w-8 text-blue-200 mb-3" />
                      <div className="text-3xl mb-1">50+</div>
                      <div className="text-sm text-blue-200">Locations</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <Star className="h-8 w-8 text-blue-200 mb-3" />
                      <div className="text-3xl mb-1">4.8★</div>
                      <div className="text-sm text-blue-200">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section id="cars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl text-gray-900 mb-3">Explore Our Fleet</h2>
          <p className="text-gray-600">
            Find the perfect vehicle for your journey from our diverse collection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              transmission={transmission}
              setTransmission={setTransmission}
            />
          </aside>

          {/* Car Listings */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {filteredCars.length} {filteredCars.length === 1 ? "vehicle" : "vehicles"}
              </p>
              <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
              </select>
            </div>

            {filteredCars.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
                <CarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl text-gray-900 mb-2">No vehicles found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more options
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} onBook={handleBookCar} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4">Ready to Hit the Road?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Book your perfect vehicle today and enjoy a seamless rental experience
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Start Booking Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <CarIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-white">DriveNow</div>
                  <div className="text-xs text-gray-500">Premium Rentals</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                Your trusted partner for premium car rentals across the country.
              </p>
            </div>
            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>1-800-DRIVE-NOW</li>
                <li>support@drivenow.com</li>
                <li>123 Main Street</li>
                <li>New York, NY 10001</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 DriveNow. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Dialog */}
      <BookingDialog
        car={selectedCar}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}

// Main App component with routing
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public route - your main car rental page */}
        <Route path="/" element={<CarRentalApp />} />
        
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/vehicles" element={<VehicleManagement />} />
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}