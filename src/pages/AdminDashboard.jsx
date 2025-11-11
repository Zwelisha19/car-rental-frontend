
// src/pages/AdminDashboard.jsx
import { useNavigate } from 'react-router-dom';
import { Car, Users, DollarSign, TrendingUp, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalBookings: 0,
    totalRevenue: 0,
    occupancyRate: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        
        // Fetch vehicles count
        const vehiclesResponse = await fetch('https://car-rental-backend-1-m022.onrender.com/api/vehicles', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Fetch bookings data
        const bookingsResponse = await fetch('https://car-rental-backend-1-m022.onrender.com/api/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (vehiclesResponse.ok && bookingsResponse.ok) {
          const vehiclesData = await vehiclesResponse.json();
          const bookingsData = await bookingsResponse.json();

          // Calculate stats
          const totalVehicles = vehiclesData.length;
          const totalBookings = bookingsData.length;
          
          // Calculate total revenue (assuming each booking has a totalPrice field)
          const totalRevenue = bookingsData.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
          
          // Calculate occupancy rate (simplified: percentage of vehicles with active bookings)
          const availableVehicles = vehiclesData.filter(vehicle => vehicle.available).length;
          const occupancyRate = totalVehicles > 0 ? Math.round((availableVehicles / totalVehicles) * 100) : 0;

          setStats({
            totalVehicles,
            totalBookings,
            totalRevenue,
            occupancyRate
          });

          // Get recent bookings (last 3)
          const recent = bookingsData.slice(-3).reverse();
          setRecentBookings(recent);
        } else {
          setError('Failed to fetch dashboard data');
        }
      } catch (err) {
        setError('Network error - please try again');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardStats = [
    {
      title: 'Total Vehicles',
      value: stats.totalVehicles.toString(),
      icon: Car,
      change: '+0%', // You can calculate this based on previous data if available
      color: 'from-blue-600 to-indigo-600'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings.toString(),
      icon: Users,
      change: '+0%',
      color: 'from-green-600 to-emerald-600'
    },
    {
      title: 'Revenue',
      value: `R ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+0%',
      color: 'from-purple-600 to-pink-600'
    },
    {
      title: 'Availability Rate',
      value: `${stats.occupancyRate}%`,
      icon: TrendingUp,
      change: '+0%',
      color: 'from-orange-600 to-red-600'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-xl text-gray-900">DriveNow Admin</div>
                  <div className="text-xs text-gray-500">Welcome, {user?.email || 'Admin'}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">Loading dashboard data...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-xl text-gray-900">DriveNow Admin</div>
                <div className="text-xs text-gray-500">Welcome, {user?.email || 'Admin'}</div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <nav className="flex items-center gap-8">
                <button 
                  onClick={() => navigate('/admin/dashboard')}
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => navigate('/admin/vehicles')}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Vehicles
                </button>
                <button 
                  onClick={() => navigate('/admin/bookings')}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Bookings
                </button>
              </nav>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors border border-gray-300 rounded-lg hover:border-red-300"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>

            {/* Mobile menu button */}
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
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => {
                  navigate('/admin/dashboard');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-blue-600 font-semibold py-2"
              >
                Dashboard
              </button>
              <button 
                onClick={() => {
                  navigate('/admin/vehicles');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-gray-600 hover:text-blue-600 py-2"
              >
                Vehicles
              </button>
              <button 
                onClick={() => {
                  navigate('/admin/bookings');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-gray-600 hover:text-blue-600 py-2"
              >
                Bookings
              </button>
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left text-gray-600 hover:text-red-600 py-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your business.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/admin/vehicles/add')}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-left flex items-center gap-3 shadow-lg shadow-blue-600/20"
                >
                  <Car className="h-5 w-5" />
                  Add New Vehicle
                </button>
                <button
                  onClick={() => navigate('/admin/vehicles')}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 text-left flex items-center gap-3 shadow-lg shadow-green-600/20"
                >
                  <Users className="h-5 w-5" />
                  Manage Vehicles ({stats.totalVehicles})
                </button>
                <button
                  onClick={() => navigate('/admin/bookings')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-left flex items-center gap-3 shadow-lg shadow-purple-600/20"
                >
                  <DollarSign className="h-5 w-5" />
                  View Bookings ({stats.totalBookings})
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          New booking for {booking.vehicleName || 'Vehicle'}
                        </p>
                        <p className="text-xs text-gray-600">
                          {booking.customerName || 'Customer'} • {booking.totalPrice ? `R ${booking.totalPrice}` : 'Price not set'}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No recent bookings</p>
                    <p className="text-sm text-gray-400 mt-1">Bookings will appear here</p>
                  </div>
                )}
                
                {/* Fallback sample data if no real bookings */}
                {recentBookings.length === 0 && (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <Car className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">System Ready</p>
                        <p className="text-xs text-gray-600">Your car rental system is active</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Welcome to DriveNow</p>
                        <p className="text-xs text-gray-600">Start adding vehicles and bookings</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}