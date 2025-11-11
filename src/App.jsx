

import { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CarCard } from "./components/CarCard";
import { FilterSidebar } from "./components/FilterSidebar";
import BookingDialog from './components/BookingDialog';
import { Car as CarIcon, Menu, X, Star, Users, MapPin } from "lucide-react";
import { Button } from "./components/ui/button";
import "./index.css";

// Import Auth Context
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Import your pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import VehicleManagement from "./pages/VehicleManagement";
import NotFound from "./pages/NotFound";
import AddVehicle from "./pages/AddVehicle";
import EditVehicle from "./pages/EditVehicle";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import BookingsManagement from "./pages/BookingsManagement";

// Your car rental app as a separate component
function CarRentalApp() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [transmission, setTransmission] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch vehicles from backend
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('https://car-rental-backend-1-m022.onrender.com/api/vehicles');
        
        if (response.ok) {
          const data = await response.json();
          setCars(data);
        } else {
          setError('Failed to load vehicles');
        }
      } catch (err) {
        setError('Network error - please try again later');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const filteredCars = useMemo(() => {
  return cars.filter((car) => {
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
        if (type === "bakkie") return carTypeKeywords.includes("bakkie");
        if (type === "minibus") return carTypeKeywords.includes("minibus");
        if (type === "hatchback") return carTypeKeywords.includes("hatchback");
        if (type === "coupe") return carTypeKeywords.includes("coupe");
        if (type === "van") return carTypeKeywords.includes("van");
        if (type === "luxury") return carTypeKeywords.includes("luxury");
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
}, [cars, priceRange, selectedTypes, transmission]);

  const handleBookCar = (car) => {
    setSelectedCar(car);
    setDialogOpen(true);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Keep your exact same header */}
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
                <a href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                  How It Works
                </a>
                <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Contact
                </a>
              </nav>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-blue-600"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </header>

        {/* Loading section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading vehicles...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Keep your exact same header */}
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
                <a href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                  How It Works
                </a>
                <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Contact
                </a>
              </nav>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-blue-600"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </header>

        {/* Error section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <CarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-gray-900 mb-2">Unable to load vehicles</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Try Again
            </Button>
          </div>
        </section>
      </div>
    );
  }

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
              <a href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                How It Works
              </a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </a>
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
              <a href="/how-it-works" className="block text-gray-600 hover:text-blue-600">
                How It Works
              </a>
              <a href="/contact" className="block text-gray-600 hover:text-blue-600">
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section - REMOVED SearchBar */}
      <section
        id="home"
        className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0tMjQgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHomMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMjQgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
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
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl"
                  onClick={() => document.getElementById('cars').scrollIntoView({ behavior: 'smooth' })}
                >
                  Browse Fleet
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => window.location.href = '/how-it-works'}
                >
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

          {/* REMOVED SearchBar component */}
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
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            onClick={() => document.getElementById('cars').scrollIntoView({ behavior: 'smooth' })}
          >
            Browse Available Cars
          </Button>
        </div>
      </section>

      {/* Footer - UPDATED: Removed Support section */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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
                Your trusted partner for premium car rentals across South Africa.
              </p>
            </div>
            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>1-800-DRIVE-NOW</li>
                <li>support@drivenow.com</li>
                <li>123 Main Street</li>
                <li>Johannesburg, South Africa</li>
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
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route - your main car rental page */}
          <Route path="/" element={<CarRentalApp />} />
          
          {/* Public pages */}
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/vehicles" 
            element={
              <ProtectedRoute>
                <VehicleManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/vehicles/add" 
            element={
              <ProtectedRoute>
                <AddVehicle />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/vehicles/edit/:id" 
            element={
              <ProtectedRoute>
                <EditVehicle />
              </ProtectedRoute>
            } 
          />

           <Route 
            path="/admin/bookings" 
            element={
              <ProtectedRoute>
                <BookingsManagement />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}