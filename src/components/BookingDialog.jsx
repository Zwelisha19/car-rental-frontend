import { useState } from 'react';
import { X, Calendar, MapPin, User, Mail, Phone, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function BookingDialog({ car, open, onOpenChange }) {
  const [bookingData, setBookingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickupDate: '',
    returnDate: '',
    location: '',
    specialRequests: ''
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState('form'); // 'form', 'payment', 'confirmation'

  const southAfricanCities = [
    'Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth',
    'Bloemfontein', 'East London', 'Pietermaritzburg', 'Kimberley', 'Polokwane',
    'Nelspruit', 'Rustenburg', 'Welkom', 'George', 'Soweto'
  ];

  const calculateTotalPrice = () => {
    // Add null check for car
    if (!car || !car.price) return 0;
    if (!bookingData.pickupDate || !bookingData.returnDate) return car.price;
    
    const days = Math.ceil((new Date(bookingData.returnDate) - new Date(bookingData.pickupDate)) / (1000 * 60 * 60 * 24));
    return days > 0 ? days * car.price : car.price;
  };

  const totalPrice = calculateTotalPrice();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (!bookingData.fullName || !bookingData.email || !bookingData.phone || 
        !bookingData.pickupDate || !bookingData.returnDate || !bookingData.location) {
      setPaymentError('Please fill in all required fields');
      return;
    }
    setCurrentStep('payment');
    setPaymentError('');
  };

  const handlePaymentSuccess = async (details) => {
    setIsProcessing(true);
    try {
      const response = await fetch('https://car-rental-backend-1-m022.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingData,
          vehicleId: car?._id || car?.id,
          vehicleName: car?.name,
          totalPrice: totalPrice,
          paymentId: details?.id || `pay_${Date.now()}`,
          paymentStatus: 'completed'
        })
      });

      if (response.ok) {
        setPaymentSuccess(true);
        setPaymentError('');
        setCurrentStep('confirmation');
      } else {
        const errorData = await response.json();
        setPaymentError(errorData.message || 'Failed to process booking. Please try again.');
      }
    } catch (error) {
      setPaymentError('Network error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset everything when closing
    setTimeout(() => {
      setBookingData({
        fullName: '',
        email: '',
        phone: '',
        pickupDate: '',
        returnDate: '',
        location: '',
        specialRequests: ''
      });
      setPaymentSuccess(false);
      setPaymentError('');
      setCurrentStep('form');
      setIsProcessing(false);
    }, 300);
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
    setPaymentError('');
  };

  // Early return with null check - this prevents the component from rendering if car is null
  if (!open || !car) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentStep === 'form' && `Book ${car?.name || 'Vehicle'}`}
              {currentStep === 'payment' && 'Payment Details'}
              {currentStep === 'confirmation' && 'Booking Confirmed!'}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-3 h-3 rounded-full ${currentStep === 'form' ? 'bg-blue-600' : 'bg-green-500'}`}></div>
              <div className={`w-3 h-3 rounded-full ${currentStep === 'payment' ? 'bg-blue-600' : currentStep === 'confirmation' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <div className={`w-3 h-3 rounded-full ${currentStep === 'confirmation' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Car Details Summary - Show on all steps */}
          <div className="flex gap-4 p-4 bg-gray-50 rounded-lg mb-6">
            <img
              src={car?.image}
              alt={car?.name}
              className="h-20 w-28 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{car?.name}</h3>
              <p className="text-gray-600">{car?.type}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-2xl font-bold text-blue-600">R{totalPrice}</p>
                {bookingData.pickupDate && bookingData.returnDate && (
                  <p className="text-sm text-gray-600">
                    {Math.ceil((new Date(bookingData.returnDate) - new Date(bookingData.pickupDate)) / (1000 * 60 * 60 * 24))} days
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {paymentError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
              {paymentError}
            </div>
          )}

          {/* Step 1: Booking Form */}
          {currentStep === 'form' && (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingData.fullName}
                    onChange={(e) => setBookingData({...bookingData, fullName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingData.email}
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+27 12 345 6789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Pick-up Location *
                  </label>
                  <select
                    required
                    value={bookingData.location}
                    onChange={(e) => setBookingData({...bookingData, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a city</option>
                    {southAfricanCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Pick-up Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingData.pickupDate}
                    onChange={(e) => setBookingData({...bookingData, pickupDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Return Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingData.returnDate}
                    onChange={(e) => setBookingData({...bookingData, returnDate: e.target.value})}
                    min={bookingData.pickupDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests
                </label>
                <textarea
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any special requirements or notes..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 text-lg font-semibold hover:bg-blue-700"
                >
                  Proceed to Payment
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="py-3"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {/* Step 2: Payment */}
          {currentStep === 'payment' && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-600">R{totalPrice}</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Secure Payment via PayPal
                </h3>
                
                <PayPalScriptProvider 
                  options={{ 
                    "client-id": "AfAOPT-rgkwFZjOSY8CVmjSspVGOf4SUgY1UC5oxhZuK8b7CuAVHOwMPo-14ka-_FOwjZ9qQw2MXlV5A",
                    currency: "USD"
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{
                          amount: {
                            value: (totalPrice / 18).toFixed(2), // Convert ZAR to USD (approximate)
                            currency_code: "USD"
                          },
                          description: `Car Rental: ${car?.name}`
                        }],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      try {
                        const details = await actions.order.capture();
                        await handlePaymentSuccess(details);
                      } catch (error) {
                        setPaymentError('Payment failed. Please try again.');
                        console.error(error);
                      }
                    }}
                    onError={(error) => {
                      setPaymentError('Payment failed. Please try again.');
                      console.error(error);
                    }}
                  />
                </PayPalScriptProvider>
              </div>

              {isProcessing && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Processing your booking...</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackToForm}
                  className="flex-1 py-3"
                  disabled={isProcessing}
                >
                  Back to Details
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="py-3"
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 'confirmation' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600">
                  Thank you for your booking! A confirmation email has been sent to {bookingData.email}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Booking Details:</h4>
                <p><strong>Vehicle:</strong> {car?.name}</p>
                <p><strong>Pick-up:</strong> {bookingData.pickupDate} at {bookingData.location}</p>
                <p><strong>Return:</strong> {bookingData.returnDate}</p>
                <p><strong>Total Paid:</strong> R{totalPrice}</p>
                <p><strong>Payment Method:</strong> PayPal</p>
              </div>

              <Button
                onClick={handleClose}
                className="bg-blue-600 text-white py-3 text-lg font-semibold hover:bg-blue-700"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}