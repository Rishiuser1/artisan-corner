import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Plus, Search, Heart, Package } from 'lucide-react';
import { addToCart } from '../redux/cartSlice';

// --- Embedded Mock Data to fix import error ---
const MOCK_PRODUCTS = [
  { id: "1", name: "Handcrafted Ceramic Bowl", artisan: "Sarah Mitchell", price: 45.00, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=1080", category: "Pottery", rating: 4.8, reviews: 124, description: "A beautiful, hand-thrown ceramic bowl perfect for salads or serving." },
  { id: "2", name: "Artisan Wooden Cutting Board", artisan: "James Chen", price: 68.00, image: "https://images.unsplash.com/photo-1616413266427-93b73bd003cb?auto=format&fit=crop&q=80&w=1080", category: "Woodwork", rating: 4.9, reviews: 89, description: "Sustainably sourced walnut wood, finished with food-safe mineral oil." },
  { id: "3", name: "Handwoven Textile Throw", artisan: "Emma Rodriguez", price: 125.00, image: "https://images.unsplash.com/photo-1531891515519-b25d410b7566?auto=format&fit=crop&q=80&w=1080", category: "Textiles", rating: 5.0, reviews: 156, description: "Soft, organic cotton throw woven on a traditional loom." },
  { id: "4", name: "Silver Leaf Necklace", artisan: "Maria Santos", price: 89.00, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1080", category: "Jewelry", rating: 4.7, reviews: 203, description: "Delicate sterling silver necklace inspired by nature." },
  { id: "5", name: "Leather Journal Cover", artisan: "Michael O'Brien", price: 52.00, image: "https://images.unsplash.com/photo-1512414947060-048d53abb081?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "Leather", rating: 4.6, reviews: 78, description: "Hand-stitched leather journal cover that ages beautifully." },
  { id: "6", name: "Ceramic Coffee Mug Set", artisan: "Sarah Mitchell", price: 65.00, image: "https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "Pottery", rating: 4.9, reviews: 142, description: "Set of 2 matching mugs, perfect for your morning routine." },
  { id: "7", name: "Wooden Serving Tray", artisan: "James Chen", price: 78.00, image: "https://images.unsplash.com/photo-1724709163176-ff28e360df75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "Woodwork", rating: 4.8, reviews: 95, description: "Elegant serving tray with brass handles." },
  { id: "8", name: "Woven Table Runner", artisan: "Emma Rodriguez", price: 48.00, image: "https://images.unsplash.com/photo-1748141951488-9c9fb9603daf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "Textiles", rating: 4.7, reviews: 67, description: "Adds texture and warmth to any dining table." },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (dispatch) {
        dispatch(addToCart(product));
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-in slide-in-from-left duration-700">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Crafted with Love</p>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight font-serif">Discover Unique <br/> Handmade Treasures</h1>
            <p className="text-lg text-gray-600">Connect with talented artisans and bring home one-of-a-kind pieces that tell a story.</p>
            <button className="bg-black text-white px-8 py-4 rounded-md font-medium flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg">
              Explore Collection <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden bg-gray-100">
            <img src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=1000" alt="Hero" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h3 className="text-2xl font-bold mb-8 text-gray-900 font-serif">Browse by Category</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {["Pottery", "Woodwork", "Textiles", "Jewelry", "Leather"].map((cat) => (
            <button key={cat} className="px-8 py-3 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-black hover:text-white hover:border-black transition-colors whitespace-nowrap text-sm font-medium">
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Process */}
      <section className="bg-gray-50 py-24 px-8 border-y border-gray-100">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">How It Works</h2>
            <p className="text-gray-500">Support independent creators and bring authentic craftsmanship into your home.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { title: "1. Discover", desc: "Explore our curated collection.", icon: Search },
              { title: "2. Support", desc: "Purchase directly from makers.", icon: Heart },
              { title: "3. Cherish", desc: "Receive high-quality handmade items.", icon: Package }
            ].map((step, idx) => (
              <div key={idx} className="space-y-4 flex flex-col items-center group">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed max-w-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 font-serif">Featured Creations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} onClick={() => navigate(`/products/${product.id}`)} className="group cursor-pointer">
              <div className="relative aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-4">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button onClick={(e) => handleAddToCart(e, product)} className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-black hover:text-white">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 uppercase">{product.category}</p>
                <h3 className="font-medium text-gray-900 text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500">by {product.artisan}</p>
                <p className="font-bold text-gray-900 mt-2">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;