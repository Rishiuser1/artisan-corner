import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star } from 'lucide-react';
import { addToCart } from '../redux/cartSlice';
// UPDATED IMPORT PATH:
import { MOCK_PRODUCTS } from '../api/mockProducts'; 

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = MOCK_PRODUCTS.find(p => p.id === id);

  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-gray-100 rounded-2xl overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-orange-600 font-medium tracking-wide uppercase text-sm mb-2">{product.category}</span>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-yellow-400"><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /></div>
            <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
          </div>
          <p className="text-xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>
          <p className="text-sm text-gray-500 mb-8">Artisan: <span className="text-black font-medium">{product.artisan}</span></p>
          <button 
            onClick={() => dispatch(addToCart(product))}
            className="w-full md:w-auto px-10 bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;