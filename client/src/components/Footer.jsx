import React from 'react';
import { Store, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => (
  <footer className="bg-gray-50 pt-16 pb-8 px-8 border-t border-gray-200 mt-auto">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6 text-orange-600" />
            <span className="font-bold text-gray-900">Artisan's Corner</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">Connecting talented artisans with those who appreciate unique, handmade treasures.</p>
          <div className="flex gap-4">
            <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-black hover:text-white transition-colors"><Instagram className="w-4 h-4" /></button>
            <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-black hover:text-white transition-colors"><Twitter className="w-4 h-4" /></button>
            <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-black hover:text-white transition-colors"><Mail className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Links Columns */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>All Products</li>
            <li>Featured</li>
            <li>New Arrivals</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>Help Center</li>
            <li>Shipping</li>
            <li>Returns</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
          <p className="text-sm text-gray-500">support@artisanscorner.com</p>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-400">
        © 2025 Artisan's Corner. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;