


// // src/pages/EditVehicle.jsx
// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ArrowLeft, Upload, Car, Menu, X, LogOut } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// export default function EditVehicle() {
//   const [formData, setFormData] = useState({
//     name: '',
//     type: '',
//     imageBase64: '',
//     price: '',
//     passengers: '',
//     transmission: 'Automatic',
//     fuel: 'Gasoline',
//     luggage: '',
//     featured: false,
//     available: true
//   });
//   const [loading, setLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [imagePreview, setImagePreview] = useState('');
//   const [currentImage, setCurrentImage] = useState('');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { user, logout } = useAuth();

//   // Fetch vehicle data
//   useEffect(() => {
//     const fetchVehicle = async () => {
//       try {
//         const token = localStorage.getItem('adminToken');
//         const response = await fetch(`https://car-rental-backend-1-m022.onrender.com/api/vehicles/${id}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (response.ok) {
//           const vehicle = await response.json();
//           setFormData({
//             name: vehicle.name,
//             type: vehicle.type,
//             imageBase64: '', // We don't need to load base64 for existing image
//             price: vehicle.price.toString(),
//             passengers: vehicle.passengers.toString(),
//             transmission: vehicle.transmission,
//             fuel: vehicle.fuel,
//             luggage: vehicle.luggage.toString(),
//             featured: vehicle.featured,
//             available: vehicle.available
//           });
//           setCurrentImage(vehicle.image);
//           setImagePreview(vehicle.image);
//         } else {
//           alert('Failed to fetch vehicle data');
//           navigate('/admin/vehicles');
//         }
//       } catch (err) {
//         alert('Network error');
//         navigate('/admin/vehicles');
//       } finally {
//         setFetchLoading(false);
//       }
//     };

//     fetchVehicle();
//   }, [id, navigate]);

//   // Handle image file selection and convert to base64
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Create preview URL
//       const previewUrl = URL.createObjectURL(file);
//       setImagePreview(previewUrl);

//       // Convert to base64 for Cloudinary
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({
//           ...formData,
//           imageBase64: reader.result
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = localStorage.getItem('adminToken');
      
//       // Only send imageBase64 if a new image was uploaded
//       const submitData = {
//         ...formData,
//         price: parseInt(formData.price),
//         passengers: parseInt(formData.passengers),
//         luggage: parseInt(formData.luggage)
//       };

//       // If no new image was uploaded, remove imageBase64 from the data
//       if (!formData.imageBase64) {
//         delete submitData.imageBase64;
//       }

//       const response = await fetch(`https://car-rental-backend-1-m022.onrender.com/api/vehicles/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(submitData)
//       });

//       if (response.ok) {
//         alert('Vehicle updated successfully!');
//         navigate('/admin/vehicles');
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message || 'Failed to update vehicle');
//       }
//     } catch (err) {
//       alert('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/admin/login', { replace: true });
//   };

//   if (fetchLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <header className="bg-white shadow-sm border-b border-gray-200">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-20">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
//                   <Car className="h-6 w-6 text-white" />
//                 </div>
//                 <div>
//                   <div className="text-xl text-gray-900">DriveNow Admin</div>
//                   <div className="text-xs text-gray-500">Edit Vehicle</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         <div className="p-8">
//           <div className="max-w-2xl mx-auto">
//             <div className="flex justify-center items-center h-64">
//               <div className="text-lg text-gray-600">Loading vehicle data...</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
//                 <Car className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <div className="text-xl text-gray-900">DriveNow Admin</div>
//                 <div className="text-xs text-gray-500">Welcome, {user?.email || 'Admin'}</div>
//               </div>
//             </div>
            
//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center gap-6">
//               <nav className="flex items-center gap-8">
//                 <button 
//                   onClick={() => navigate('/admin/dashboard')}
//                   className="text-gray-600 hover:text-blue-600"
//                 >
//                   Dashboard
//                 </button>
//                 <button 
//                   onClick={() => navigate('/admin/vehicles')}
//                   className="text-blue-600 font-semibold hover:text-blue-700"
//                 >
//                   Vehicles
//                 </button>
//                 <button 
//                   onClick={() => navigate('/admin/bookings')}
//                   className="text-gray-600 hover:text-blue-600"
//                 >
//                   Bookings
//                 </button>
//               </nav>
              
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors border border-gray-300 rounded-lg hover:border-red-300"
//               >
//                 <LogOut className="h-4 w-4" />
//                 Logout
//               </button>
//             </div>

//             {/* Mobile menu button */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="lg:hidden p-2 text-gray-600 hover:text-blue-600"
//             >
//               {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="lg:hidden border-t border-gray-200 bg-white">
//             <div className="px-4 py-6 space-y-4">
//               <button 
//                 onClick={() => {
//                   navigate('/admin/dashboard');
//                   setMobileMenuOpen(false);
//                 }}
//                 className="block w-full text-left text-gray-600 hover:text-blue-600 py-2"
//               >
//                 Dashboard
//               </button>
//               <button 
//                 onClick={() => {
//                   navigate('/admin/vehicles');
//                   setMobileMenuOpen(false);
//                 }}
//                 className="block w-full text-left text-blue-600 font-semibold py-2"
//               >
//                 Vehicles
//               </button>
//               <button 
//                 onClick={() => {
//                   navigate('/admin/bookings');
//                   setMobileMenuOpen(false);
//                 }}
//                 className="block w-full text-left text-gray-600 hover:text-blue-600 py-2"
//               >
//                 Bookings
//               </button>
//               <div className="border-t border-gray-200 pt-4">
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-2 w-full text-left text-gray-600 hover:text-red-600 py-2"
//                 >
//                   <LogOut className="h-4 w-4" />
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Main Content */}
//       <div className="p-8">
//         <div className="max-w-2xl mx-auto">
//           <button
//             onClick={() => navigate('/admin/vehicles')}
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Vehicles
//           </button>

//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Vehicle</h1>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Vehicle Name *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={(e) => setFormData({...formData, name: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="e.g., BMW 5 Series"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Type *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.type}
//                     onChange={(e) => setFormData({...formData, type: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="e.g., Luxury Sedan"
//                   />
//                 </div>

//                 {/* Image Upload Section */}
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Vehicle Image
//                   </label>
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <Upload className="w-8 h-8 mb-2 text-gray-500" />
//                         <p className="mb-1 text-sm text-gray-500">
//                           <span className="font-semibold">Click to upload</span> or drag and drop
//                         </p>
//                         <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 10MB)</p>
//                       </div>
//                       <input
//                         type="file"
//                         className="hidden"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                       />
//                     </label>
//                   </div>
                  
//                   {/* Image Preview */}
//                   {imagePreview && (
//                     <div className="mt-4">
//                       <p className="text-sm font-medium text-gray-700 mb-2">
//                         {formData.imageBase64 ? 'New Image Preview:' : 'Current Image:'}
//                       </p>
//                       <img 
//                         src={imagePreview} 
//                         alt="Preview" 
//                         className="h-32 w-auto rounded-lg object-cover border"
//                       />
//                       {!formData.imageBase64 && (
//                         <p className="text-xs text-gray-500 mt-1">
//                           Upload a new image to replace the current one
//                         </p>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Price per Day (R) *
//                   </label>
//                   <input
//                     type="number"
//                     required
//                     value={formData.price}
//                     onChange={(e) => setFormData({...formData, price: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="1500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Passengers *
//                   </label>
//                   <input
//                     type="number"
//                     required
//                     value={formData.passengers}
//                     onChange={(e) => setFormData({...formData, passengers: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="5"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Luggage Capacity *
//                   </label>
//                   <input
//                     type="number"
//                     required
//                     value={formData.luggage}
//                     onChange={(e) => setFormData({...formData, luggage: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="3"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Transmission *
//                   </label>
//                   <select
//                     value={formData.transmission}
//                     onChange={(e) => setFormData({...formData, transmission: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="Automatic">Automatic</option>
//                     <option value="Manual">Manual</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Fuel Type *
//                   </label>
//                   <select
//                     value={formData.fuel}
//                     onChange={(e) => setFormData({...formData, fuel: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="Gasoline">Gasoline</option>
//                     <option value="Diesel">Diesel</option>
//                     <option value="Electric">Electric</option>
//                     <option value="Hybrid">Hybrid</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={formData.featured}
//                     onChange={(e) => setFormData({...formData, featured: e.target.checked})}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                   <label className="text-sm font-medium text-gray-700">
//                     Feature this vehicle on homepage
//                   </label>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={formData.available}
//                     onChange={(e) => setFormData({...formData, available: e.target.checked})}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                   <label className="text-sm font-medium text-gray-700">
//                     Available for rental
//                   </label>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
//                 >
//                   {loading ? 'Updating Vehicle...' : 'Update Vehicle'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => navigate('/admin/vehicles')}
//                   className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// src/pages/EditVehicle.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, Car, Menu, X, LogOut, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function EditVehicle() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    imageBase64: '',
    price: '',
    passengers: '',
    transmission: 'Automatic',
    fuel: 'Gasoline',
    luggage: '',
    featured: false,
    available: true
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // Success/error messages
  
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, logout } = useAuth();

  // Show message and auto-hide after 3 seconds
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Fetch vehicle data
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`https://car-rental-backend-1-m022.onrender.com/api/vehicles/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const vehicle = await response.json();
          setFormData({
            name: vehicle.name,
            type: vehicle.type,
            imageBase64: '', // We don't need to load base64 for existing image
            price: vehicle.price.toString(),
            passengers: vehicle.passengers.toString(),
            transmission: vehicle.transmission,
            fuel: vehicle.fuel,
            luggage: vehicle.luggage.toString(),
            featured: vehicle.featured,
            available: vehicle.available
          });
          setCurrentImage(vehicle.image);
          setImagePreview(vehicle.image);
        } else {
          showMessage('Failed to fetch vehicle data', 'error');
          setTimeout(() => navigate('/admin/vehicles'), 2000);
        }
      } catch (err) {
        showMessage('Network error - please try again', 'error');
        setTimeout(() => navigate('/admin/vehicles'), 2000);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchVehicle();
  }, [id, navigate]);

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
      
      // Only send imageBase64 if a new image was uploaded
      const submitData = {
        ...formData,
        price: parseInt(formData.price),
        passengers: parseInt(formData.passengers),
        luggage: parseInt(formData.luggage)
      };

      // If no new image was uploaded, remove imageBase64 from the data
      if (!formData.imageBase64) {
        delete submitData.imageBase64;
      }

      const response = await fetch(`https://car-rental-backend-1-m022.onrender.com/api/vehicles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        showMessage('Vehicle updated successfully!', 'success');
        setTimeout(() => navigate('/admin/vehicles'), 1500);
      } else {
        const errorData = await response.json();
        showMessage(errorData.message || 'Failed to update vehicle', 'error');
      }
    } catch (err) {
      showMessage('Network error - please check your connection', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  if (fetchLoading) {
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
                  <div className="text-xs text-gray-500">Edit Vehicle</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">Loading vehicle data...</div>
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
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/admin/vehicles')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Vehicles
          </button>

          {/* Success/Error Messages */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg border ${
              message.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {message.type === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span>{message.text}</span>
                </div>
                <button 
                  onClick={() => setMessage({ text: '', type: '' })}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Vehicle</h1>

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
                    Vehicle Image
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
                      />
                    </label>
                  </div>
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        {formData.imageBase64 ? 'New Image Preview:' : 'Current Image:'}
                      </p>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-32 w-auto rounded-lg object-cover border"
                      />
                      {!formData.imageBase64 && (
                        <p className="text-xs text-gray-500 mt-1">
                          Upload a new image to replace the current one
                        </p>
                      )}
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

              <div className="space-y-4">
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

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({...formData, available: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Available for rental
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Updating Vehicle...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Update Vehicle
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/vehicles')}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
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