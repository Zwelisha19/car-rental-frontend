// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Dialog } from "@headlessui/react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import "../styles/animations.css"; // For animated gradient text

// export default function Home() {
//   const [cars, setCars] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/cars");
//         setCars(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchCars();
//   }, []);

//   const handleBook = (car) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setSelectedCar(car);
//       setModalOpen(true);
//     } else {
//       navigate(`/booking/${car.id}`);
//     }
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-white relative">
//       <Navbar />

//       {/* Hero Section */}
//       <motion.section
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="relative flex flex-col items-center justify-center text-center py-32 px-6 bg-gradient-to-br from-purple-900 via-indigo-700 to-pink-600"
//       >
//         <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 animate-text">
//           Drive <span className="text-white">Luxury</span>
//         </h1>
//         <p className="text-lg md:text-xl max-w-2xl text-white/80">
//           Discover premium vehicles from top brands: Mercedes, Audi, BMW, Porsche, and more.
//         </p>
//         <div className="mt-8 flex gap-6">
//           <button
//             onClick={() => navigate("/register")}
//             className="py-3 px-8 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-gray-900 font-bold hover:scale-105 transition-transform shadow-2xl"
//           >
//             Book Now
//           </button>
//           <button
//             onClick={() => navigate("/cars")}
//             className="py-3 px-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold hover:text-yellow-400 hover:border-yellow-400 transition-all"
//           >
//             Browse Cars
//           </button>
//         </div>
//       </motion.section>

//       {/* Cars Grid */}
//       <section className="max-w-7xl mx-auto px-6 py-16">
//         <h2 className="text-3xl font-bold text-yellow-400 mb-8">Available Cars</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {cars.map((car) => (
//             <motion.div
//               key={car.id}
//               whileHover={{ scale: 1.05, rotate: 1 }}
//               className="relative bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-500 rounded-3xl shadow-2xl overflow-hidden cursor-pointer transform transition-all duration-500"
//             >
//               <img
//                 src={car.image || "/placeholder.png"}
//                 alt={car.name}
//                 className="w-full h-64 object-cover brightness-90"
//               />
//               <div className="absolute inset-0 bg-black/30 p-4 flex flex-col justify-end">
//                 <h3 className="text-2xl font-bold text-white">{car.name}</h3>
//                 <p className="text-white/80">{car.model}</p>
//                 <p className="mt-1 font-bold text-yellow-400">${car.pricePerDay}/day</p>
//                 <button
//                   onClick={() => handleBook(car)}
//                   className="mt-4 w-full py-2 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-gray-900 font-bold hover:scale-105 transition-transform"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Brand Logos */}
//       <section className="max-w-6xl mx-auto px-6 py-16">
//         <h2 className="text-2xl font-bold text-white mb-6">Our Top Brands</h2>
//         <div className="grid grid-cols-4 gap-6">
//           {["BMW", "Audi", "Mercedes", "Porsche"].map((brand) => (
//             <motion.div
//               key={brand}
//               whileHover={{ scale: 1.1, rotate: 2 }}
//               className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl py-4 flex items-center justify-center text-white font-bold text-lg cursor-pointer shadow-md"
//             >
//               {brand}
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Modal for login/register */}
//       <Dialog
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
//       >
//         <Dialog.Panel className="bg-gray-900 rounded-xl p-6 w-full max-w-md text-center shadow-2xl">
//           <Dialog.Title className="text-2xl font-bold mb-4">Login or Register</Dialog.Title>
//           <p className="mb-6 text-gray-300">You must be logged in to book this car.</p>
//           <div className="flex justify-around gap-4">
//             <button
//               onClick={() => navigate("/login")}
//               className="py-2 px-4 rounded-full bg-yellow-400 font-bold hover:bg-yellow-500 transition-colors"
//             >
//               Login
//             </button>
//             <button
//               onClick={() => navigate("/register")}
//               className="py-2 px-4 rounded-full bg-gray-700 font-bold hover:bg-gray-600 transition-colors"
//             >
//               Register
//             </button>
//           </div>
//         </Dialog.Panel>
//       </Dialog>
//     </div>
//   );
// }
