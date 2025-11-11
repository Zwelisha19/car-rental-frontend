// src/pages/AddVehicle.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, CheckCircle, Car, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AddVehicle() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    imageBase64: '',
    price: '',
    passengers: '',
    transmission: 'Automatic',
    fuel: 'Gasoline',
    luggage: '',
    featured: false
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Handle image file selection and convert to base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Convert to base64 for Cloudinary
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageBase64: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://car-rental-backend-1-m022.onrender.com/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price),
          passengers: parseInt(formData.passengers),
          luggage: parseInt(formData.luggage)
        })
      });

      if (response.ok) {
        setShowSuccess(true);
        // Auto navigate after 2 seconds
        setTimeout(() => {
          navigate('/admin/vehicles');
        }, 2000);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to add vehicle');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-sm">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-green-800">
                  Success!
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  Vehicle added successfully! Redirecting...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  className="text-gray-600 hover:text-blue-600"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => navigate('/admin/vehicles')}
                  className="text-blue-600 font-semibold hover:text-blue-700"
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
                className="block w-full text-left text-gray-600 hover:text-blue-600 py-2"
              >
                Dashboard
              </button>
              <button 
                onClick={() => {
                  navigate('/admin/vehicles');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-blue-600 font-semibold py-2"
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
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/admin/vehicles')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Vehicles
          </button>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Vehicle</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., BMW 5 Series"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Luxury Sedan"
                  />
                </div>

                {/* Image Upload Section */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Image *
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-1 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 10MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                        required
                      />
                    </label>
                  </div>
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-32 w-auto rounded-lg object-cover border"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Day (R) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Price in South African Rands</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passengers *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.passengers}
                    onChange={(e) => setFormData({...formData, passengers: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Luggage Capacity *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.luggage}
                    onChange={(e) => setFormData({...formData, luggage: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transmission *
                  </label>
                  <select
                    value={formData.transmission}
                    onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type *
                  </label>
                  <select
                    value={formData.fuel}
                    onChange={(e) => setFormData({...formData, fuel: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm font-medium text-gray-700">
                  Feature this vehicle on homepage
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading || !formData.imageBase64}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
                >
                  {loading ? 'Adding Vehicle...' : 'Add Vehicle'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/vehicles')}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}