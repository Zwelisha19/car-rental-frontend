// src/pages/VehicleManagement.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, Edit, Trash2, Car, Menu, X, LogOut, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, vehicle: null });
  
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Show message and auto-hide after 3 seconds
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Fetch vehicles
  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://car-rental-backend-1-m022.onrender.com/api/vehicles', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setVehicles(data);
      } else {
        setError('Failed to fetch vehicles');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (vehicle) => {
    setDeleteDialog({ open: true, vehicle });
  };

  // Close delete confirmation dialog
  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, vehicle: null });
  };

  // Delete vehicle
  const handleDelete = async () => {
    const { vehicle } = deleteDialog;
    if (!vehicle) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://car-rental-backend-1-m022.onrender.com/api/vehicles/${vehicle.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        showMessage(`Vehicle "${vehicle.name}" deleted successfully!`, 'success');
        fetchVehicles(); // Refresh the list
      } else {
        showMessage('Failed to delete vehicle', 'error');
      }
    } catch (err) {
      showMessage('Network error - please try again', 'error');
    } finally {
      closeDeleteDialog();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
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
                  <div className="text-xs text-gray-500">Manage Vehicles</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">Loading vehicles...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>

          {/* Success/Error Messages */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg border ${
              message.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center justify-between">
                <span>{message.text}</span>
                <button 
                  onClick={() => setMessage({ text: '', type: '' })}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Vehicles</h1>
              <p className="text-gray-600 mt-2">
                {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''} in your fleet
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/vehicles/add')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
            >
              <Plus className="h-5 w-5" />
              Add New Vehicle
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {vehicles.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-400 mb-4">🚗</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No vehicles yet</h3>
              <p className="text-gray-600 mb-4">Start by adding your first vehicle to the fleet.</p>
              <button
                onClick={() => navigate('/admin/vehicles/add')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-600/20"
              >
                Add First Vehicle
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vehicle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Passengers & Luggage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {vehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={vehicle.image}
                              alt={vehicle.name}
                              className="h-12 w-16 object-cover rounded-lg mr-4"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {vehicle.name}
                              </div>
                              <div className="text-sm text-gray-500 capitalize">
                                {vehicle.transmission} • {vehicle.fuel}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 capitalize">{vehicle.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            R{vehicle.price}/day
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {vehicle.passengers} passengers
                          </div>
                          <div className="text-sm text-gray-500">
                            {vehicle.luggage} luggage
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            vehicle.available 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {vehicle.available ? 'Available' : 'Not Available'}
                          </span>
                          {vehicle.featured && (
                            <span className="inline-flex ml-2 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                              Featured
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigate(`/admin/vehicles/edit/${vehicle.id}`)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                              title="Edit vehicle"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => openDeleteDialog(vehicle)}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                              title="Delete vehicle"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modern Delete Confirmation Dialog */}
      {deleteDialog.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Vehicle</h3>
                <p className="text-gray-600">This action cannot be undone</p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">
                Are you sure you want to delete <strong>"{deleteDialog.vehicle?.name}"</strong>? 
                This vehicle will be permanently removed from the system.
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={closeDeleteDialog}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Delete Vehicle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}