import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { sendContactMessage } from '../services/contactService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await sendContactMessage(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (123) 456-7890',
      subtitle: 'Mon-Fri 9am-6pm'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'support@kapscare.com',
      subtitle: '24/7 Support'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: '123 Wellness Street',
      subtitle: 'New York, NY 10001'
    }
  ];

  return (
    <div className="min-h-screen bg-[#efdfc5] dark:bg-[#1c1108]">
      {/* Hero Section */}
      <section className="relative py-20 bg-[#1c1108] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1108] to-[#1c1108]/90"></div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-[#efdfc5]/10 text-[#efdfc5] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-[#efdfc5] mb-6">
              We're Here to
              <span className="block font-semibold">Help You</span>
            </h1>
            <p className="text-xl text-[#efdfc5]/80 max-w-2xl mx-auto">
              Have questions about our Ayurvedic products or need personalized wellness advice?
              We're here to guide you on your journey to natural healing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-[#efdfc5]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-[#1c1108] w-12 h-12 rounded-full flex items-center justify-center mb-6">
                  <info.icon className="w-6 h-6 text-[#efdfc5]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1c1108] mb-2">{info.title}</h3>
                <p className="text-[#1c1108] font-medium mb-1">{info.details}</p>
                <p className="text-[#1c1108]/60 text-sm">{info.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-[#efdfc5]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-semibold text-[#1c1108] mb-4">
                  Send us a Message
                </h2>
                <p className="text-[#1c1108]/70">
                  We'll get back to you as soon as possible
                </p>
              </motion.div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <label className="block text-sm font-medium text-[#1c1108] mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#1c1108] focus:border-transparent transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <label className="block text-sm font-medium text-[#1c1108] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#1c1108] focus:border-transparent transition-all duration-200"
                        placeholder="+1 (123) 456-7890"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-[#1c1108] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#1c1108] focus:border-transparent transition-all duration-200"
                      placeholder="john@example.com"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-[#1c1108] mb-2">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#1c1108] focus:border-transparent transition-all duration-200"
                      placeholder="How can we help you?"
                    ></textarea>
                  </motion.div>

                  {error && (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                  )}

                  {success && (
                    <div className="text-green-500 text-sm text-center">
                      Message sent successfully! We'll get back to you soon.
                    </div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#1c1108] text-[#efdfc5] px-8 py-4 rounded-full font-semibold hover:bg-[#1c1108]/90 transition-all duration-300 inline-flex items-center space-x-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="w-6 h-6 border-2 border-[#efdfc5] border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </motion.div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;