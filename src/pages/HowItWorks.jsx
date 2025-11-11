import { motion } from 'framer-motion';
import { Car, Calendar, CreditCard, Shield, Clock, Star } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function HowItWorks() {
  const steps = [
    {
      icon: Calendar,
      title: '1. Book Your Vehicle',
      description: 'Browse our fleet and select your perfect vehicle. Choose your pickup dates and location.'
    },
    {
      icon: CreditCard,
      title: '2. Secure Payment',
      description: 'Complete your booking with our secure payment system. No hidden fees.'
    },
    {
      icon: Car,
      title: '3. Pick Up & Drive',
      description: 'Collect your vehicle from our location with all documents ready. Hit the road!'
    },
    {
      icon: Clock,
      title: '4. Return Vehicle',
      description: 'Return the vehicle at the agreed time and location. Simple and hassle-free.'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'All our vehicles come with comprehensive insurance coverage'
    },
    {
      icon: Star,
      title: 'Premium Service',
      description: '24/7 customer support and roadside assistance'
    },
    {
      icon: Clock,
      title: 'Flexible Rentals',
      description: 'Daily, weekly, and monthly rental options available'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-xl text-gray-900">DriveNow</div>
                <div className="text-xs text-gray-500">Premium Rentals</div>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center gap-8">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="/#cars" className="text-gray-600 hover:text-blue-600 transition-colors">Browse Cars</a>
              <a href="/how-it-works" className="text-blue-600 font-semibold">How It Works</a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            How DriveNow Works
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 mb-8"
          >
            Renting a car has never been easier. Follow these simple steps to get on the road.
          </motion.p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose DriveNow?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers who trust DriveNow for their car rental needs.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => window.location.href = '/#cars'}
          >
            Browse Our Fleet
          </Button>
        </div>
      </section>
    </div>
  );
}