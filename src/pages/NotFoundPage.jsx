import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, Search, AlertCircle } from 'lucide-react';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="mb-8"
                >
                    <AlertCircle className="w-32 h-32 text-purple-400 mx-auto mb-6 animate-pulse" />
                </motion.div>

                <h1 className="text-9xl font-black text-white mb-4">404</h1>
                <h2 className="text-4xl font-bold text-white mb-6">Page Not Found</h2>
                <p className="text-xl text-purple-200 mb-12 max-w-md">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                    >
                        <Home className="w-5 h-5" />
                        Go to Homepage
                    </button>
                    <button
                        onClick={() => navigate('/facilities')}
                        className="px-8 py-4 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white font-bold rounded-2xl border-2 border-white/30 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                    >
                        <Search className="w-5 h-5" />
                        Search Facilities
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
