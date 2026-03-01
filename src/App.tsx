import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { 
  Search, 
  Languages, 
  Hammer, 
  Home as HomeIcon, 
  Car, 
  Truck, 
  MoreHorizontal, 
  Menu, 
  X, 
  ChevronRight,
  Mail,
  Phone,
  Globe,
  MessageSquare,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Supplier, CATEGORIES } from './types';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex flex-col">
            <span className="text-3xl font-bold text-[#da1884] leading-none font-brand uppercase tracking-widest">EXPOHELPERS</span>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/search" className="text-gray-600 hover:text-[#da1884] font-medium transition-colors">Find Services</Link>
            <Link to="/about" className="text-gray-600 hover:text-[#da1884] font-medium transition-colors">About</Link>
            <Link to="/register" className="bg-[#da1884] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#c01574] transition-all shadow-sm">List Your Service</Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/search" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 font-medium">Find Services</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 font-medium">About</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-[#da1884] font-bold">List Your Service</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-200 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-[#da1884] mb-4 font-brand uppercase tracking-widest">EXPOHELPERS</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            The leading directory for international exhibitors in Russia. Find trusted local partners for stand building, interpretation, logistics, and more.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link to="/search" className="hover:text-[#da1884]">Browse Services</Link></li>
            <li><Link to="/register" className="hover:text-[#da1884]">Supplier Registration</Link></li>
            <li><Link to="/about" className="hover:text-[#da1884]">About Us & FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Support</h4>
          <p className="text-sm text-gray-500 mb-2">Questions? Contact us at:</p>
          <a href="mailto:support@expohelpers.ru" className="text-[#da1884] font-medium">support@expohelpers.ru</a>
          <div className="mt-4">
            <Link to="/sitemudur" className="text-[10px] text-gray-200 hover:text-gray-400 uppercase tracking-widest">Admin</Link>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} ExpoHelpers. All rights reserved.
      </div>
    </div>
  </footer>
);

const CategoryIcon = ({ name, size = 24 }: { name: string, size?: number }) => {
  switch (name) {
    case 'Languages': return <Languages size={size} />;
    case 'Hammer': return <Hammer size={size} />;
    case 'Home': return <HomeIcon size={size} />;
    case 'Car': return <Car size={size} />;
    case 'Truck': return <Truck size={size} />;
    default: return <MoreHorizontal size={size} />;
  }
};

// --- Pages ---

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ type: '', city: '', exhibition: '' });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.type) params.append('type', search.type);
    if (search.city) params.append('city', search.city);
    if (search.exhibition) params.append('exhibition', search.exhibition);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white py-24 lg:py-40 overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-10" 
            alt="Exhibition Hall"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-10 font-display"
            >
              All services for your exhibition in Russia
            </motion.h1>

            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSearch}
              className="bg-white p-2 rounded-2xl shadow-2xl border border-gray-100 flex flex-col md:flex-row gap-2"
            >
              <select 
                className="flex-1 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-[#da1884] text-gray-700 font-medium bg-gray-50"
                value={search.type}
                onChange={(e) => setSearch({...search, type: e.target.value})}
              >
                <option value="">All Services</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
              <input 
                type="text" 
                placeholder="City (e.g. Moscow)" 
                className="flex-1 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-[#da1884] text-gray-700 font-medium bg-gray-50"
                value={search.city}
                onChange={(e) => setSearch({...search, city: e.target.value})}
              />
              <button type="submit" className="bg-[#da1884] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#c01574] transition-all flex items-center justify-center gap-2">
                <Search size={20} />
                Search
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat.id} 
                to={`/search?type=${cat.id}`}
                className="group p-8 bg-gray-50 rounded-3xl border border-transparent hover:border-[#da1884]/20 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#da1884]/5 text-[#da1884] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CategoryIcon name={cat.icon} size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.label}</h3>
                <p className="text-gray-500 text-sm">Find professional {cat.label.toLowerCase()} in major Russian cities.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[#da1884] mb-8 flex items-center gap-3">
                <CheckCircle2 className="text-[#da1884]/40" /> For Exhibitors
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="w-8 h-8 bg-[#da1884]/5 text-[#da1884] rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600 font-medium">Search for the service you need in your target city.</p>
                </div>
                <div className="flex gap-4">
                  <span className="w-8 h-8 bg-[#da1884]/5 text-[#da1884] rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600 font-medium">Browse verified local supplier profiles and reviews.</p>
                </div>
                <div className="flex gap-4">
                  <span className="w-8 h-8 bg-[#da1884]/5 text-[#da1884] rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600 font-medium">Contact them directly via our secure inquiry form.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[#da1884] mb-8 flex items-center gap-3">
                <CheckCircle2 className="text-[#da1884]/40" /> For Suppliers
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="w-8 h-8 bg-[#da1884]/5 text-[#da1884] rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600 font-medium">Register your company or individual profile for free.</p>
                </div>
                <div className="flex gap-4">
                  <span className="w-8 h-8 bg-[#da1884]/5 text-[#da1884] rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600 font-medium">Get discovered by international agencies and exhibitors.</p>
                </div>
                <div className="flex gap-4">
                  <span className="w-8 h-8 bg-[#da1884]/5 text-[#da1884] rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600 font-medium">Receive direct inquiries and grow your business.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const type = searchParams.get('type') || '';
  const city = searchParams.get('city') || '';
  const query = searchParams.get('search') || '';

  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/suppliers?type=${type}&city=${city}&search=${query}`);
        const data = await res.json();
        setSuppliers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, [type, city, query]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Service Type</label>
              <select 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] transition-all"
                value={type}
                onChange={(e) => {
                  const newParams = new URLSearchParams(searchParams);
                  if (e.target.value) newParams.set('type', e.target.value);
                  else newParams.delete('type');
                  setSearchParams(newParams);
                }}
              >
                <option value="">All Services</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">City</label>
                <input 
                  type="text" 
                  placeholder="City" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] transition-all"
                  value={city}
                  onChange={(e) => {
                    const newParams = new URLSearchParams(searchParams);
                    if (e.target.value) newParams.set('city', e.target.value);
                    else newParams.delete('city');
                    setSearchParams(newParams);
                  }}
                />
            </div>
            <div className="flex items-end">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Keywords..." 
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] transition-all"
                  value={query}
                  onChange={(e) => {
                    const newParams = new URLSearchParams(searchParams);
                    if (e.target.value) newParams.set('search', e.target.value);
                    else newParams.delete('search');
                    setSearchParams(newParams);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#da1884]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suppliers.map(s => (
              <motion.div 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={s.id} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col"
              >
                {s.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img src={s.imageUrl} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                )}
                <div className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-[#da1884]/5 text-[#da1884] text-xs font-bold rounded-full uppercase tracking-wider">
                      {CATEGORIES.find(c => c.id === s.type)?.label || s.type}
                    </span>
                    <span className="text-gray-400 text-sm font-medium flex items-center gap-1">
                      <HomeIcon size={14} /> {s.city}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{s.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">{s.shortDescription}</p>
                  
                  {s.languages && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {s.languages.split(',').map(lang => (
                        <span key={lang} className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-tighter">
                          {lang.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="px-8 pb-8">
                  <Link 
                    to={`/profile/${s.id}`} 
                    className="block w-full text-center py-3 bg-[#da1884] text-white rounded-xl font-bold hover:bg-[#c01574] transition-colors shadow-lg shadow-[#da1884]/10"
                  >
                    View Profile
                  </Link>
                </div>
              </motion.div>
            ))}
            {suppliers.length === 0 && (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-400 text-lg">No suppliers found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileDetail = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    fetch(`/api/suppliers/${id}`)
      .then(res => res.json())
      .then(data => setSupplier(data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, supplierId: Number(id) })
      });
      setFormStatus('success');
    } catch (err) {
      console.error(err);
      setFormStatus('idle');
    }
  };

  if (loading) return <div className="flex justify-center py-40"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#da1884]"></div></div>;
  if (!supplier) return <div className="text-center py-40">Supplier not found.</div>;

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm">
              {supplier.imageUrl && (
                <div className="mb-8 rounded-2xl overflow-hidden h-64">
                  <img src={supplier.imageUrl} alt={supplier.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-4 py-1 bg-[#da1884]/5 text-[#da1884] text-xs font-bold rounded-full uppercase tracking-wider">
                  {CATEGORIES.find(c => c.id === supplier.type)?.label || supplier.type}
                </span>
                <span className="text-gray-400 text-sm font-medium flex items-center gap-1">
                  <HomeIcon size={14} /> {supplier.city}
                </span>
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{supplier.name}</h1>
              <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium">{supplier.shortDescription}</p>
              
              <div className="prose prose-pink max-w-none text-gray-600 leading-relaxed">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
                <p className="whitespace-pre-wrap">{supplier.description}</p>
              </div>

              {(supplier.languages || supplier.services) && (
                <div className="mt-10 pt-10 border-t border-gray-100 grid md:grid-cols-2 gap-8">
                  {supplier.languages && (
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {supplier.languages.split(',').map(l => (
                          <span key={l} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg">{l.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {supplier.services && (
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Key Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {supplier.services.split(',').map(s => (
                          <span key={s} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg">{s.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#da1884]"><Mail size={20} /></div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Email</p>
                    <p className="font-medium">{supplier.contactEmail}</p>
                  </div>
                </div>
                {supplier.contactPhone && (
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#da1884]"><Phone size={20} /></div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Phone</p>
                      <p className="font-medium">{supplier.contactPhone}</p>
                    </div>
                  </div>
                )}
                {supplier.website && (
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#da1884]"><Globe size={20} /></div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Website</p>
                      <a href={supplier.website} target="_blank" rel="noreferrer" className="font-medium text-[#da1884] hover:underline">{supplier.website}</a>
                    </div>
                  </div>
                )}
                {(supplier.whatsapp || supplier.telegram) && (
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#da1884]"><MessageSquare size={20} /></div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Social</p>
                      <p className="font-medium">{[supplier.whatsapp, supplier.telegram].filter(Boolean).join(' / ')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl sticky top-24 border border-[#da1884]/10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Inquiry</h3>
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 bg-[#da1884]/10 text-[#da1884] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                  <p className="text-gray-500 mb-6">The provider will contact you shortly.</p>
                  <button onClick={() => setFormStatus('idle')} className="text-[#da1884] font-bold hover:underline">Send another message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Your Name</label>
                    <input name="exhibitorName" required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Company</label>
                    <input name="companyName" required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Email</label>
                      <input name="email" required type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Phone</label>
                      <input name="phone" type="tel" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Exhibition & Dates</label>
                    <input name="exhibitionName" placeholder="e.g. MosBuild, April 2026" type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Message</label>
                    <textarea name="message" required rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] transition-all resize-none"></textarea>
                  </div>
                  <button 
                    disabled={formStatus === 'submitting'}
                    type="submit" 
                    className="w-full py-4 bg-[#da1884] text-white rounded-2xl font-bold hover:bg-[#c01574] transition-all shadow-lg shadow-[#da1884]/10 disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterPage = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      await fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white p-10 md:p-16 rounded-[40px] shadow-sm">
          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-[#da1884]/10 text-[#da1884] rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={40} />
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Registration Received!</h1>
              <p className="text-gray-500 text-lg mb-10">Thank you for joining ExpoHelpers. Our team will review your listing and publish it within 24 hours.</p>
              <Link to="/" className="inline-block px-8 py-4 bg-[#da1884] text-white rounded-2xl font-bold hover:bg-[#c01574] transition-all">Back to Home</Link>
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">List your services for free</h1>
              <p className="text-gray-500 text-center mb-12 text-lg">Join the leading directory for exhibition services in Russia and reach international clients.</p>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Service Category</label>
                    <select name="type" required className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] transition-all">
                      {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Company or Full Name</label>
                    <input name="name" required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">City / Regions Covered</label>
                  <input name="city" required type="text" placeholder="e.g. Moscow, St. Petersburg" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Short Description (Tagline)</label>
                  <input name="shortDescription" required maxLength={200} type="text" placeholder="e.g. Professional Chinese-Russian interpreter with 5 years experience." className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description</label>
                  <textarea name="description" required rows={6} placeholder="Describe your experience, past exhibitions, and specific services..." className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] transition-all resize-none"></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Contact Email</label>
                    <input name="contactEmail" required type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone / WhatsApp</label>
                    <input name="contactPhone" type="tel" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] transition-all" />
                  </div>
                </div>

                <button 
                  disabled={status === 'submitting'}
                  type="submit" 
                  className="w-full py-5 bg-[#da1884] text-white rounded-2xl font-bold text-lg hover:bg-[#c01574] transition-all shadow-xl shadow-[#da1884]/10 disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit Listing'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="bg-white py-20">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">About ExpoHelpers</h1>
      <div className="prose prose-pink max-w-none text-gray-600 space-y-6 text-lg">
        <p>
          ExpoHelpers is a dedicated B2B directory created to support international companies and agencies participating in trade fairs across Russia.
          We understand that navigating the Russian exhibition market can be complex — that’s why our mission is to connect global exhibitors with reliable, verified local partners. From professional interpreters and stand builders to logistics and customs support, ExpoHelpers is your one-stop resource for successful exhibitions.
        </p>
        <p>
          We make every effort to include trustworthy companies by verifying them through legal and public information sources. However, ExpoHelpers is not responsible for any financial or contractual agreements between exhibitors and service providers — the final decision always rests with the exhibitors.
        </p>
        <p className="font-bold text-gray-900">
          Your reliable partner in Russia’s exhibition industry — all in one place.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 pt-8">Frequently Asked Questions</h2>
        
        <div className="space-y-8 pt-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Is ExpoHelpers free for exhibitors?</h3>
            <p>Yes. Exhibitors and agencies can use ExpoHelpers completely free of charge. You can explore all listings, compare providers, and contact them directly — no commissions or hidden fees.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">How can I contact a supplier?</h3>
            <p>Simply open the supplier’s profile and use the “Send Inquiry” form. Your message will be delivered directly to their email address for prompt communication.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Can local companies list their services?</h3>
            <p>Yes. Basic listings for Russian service providers are currently free. Each submission is carefully reviewed to ensure quality, legitimacy, and reliability for our international users.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Which cities are covered?</h3>
            <p>Our main focus is on Russia’s primary exhibition hubs — Moscow and St. Petersburg — but many of our registered partners operate throughout the entire country.</p>
          </div>
        </div>

        <div className="mt-12 p-8 bg-gray-50 rounded-3xl border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Disclaimer</h2>
          <p className="text-sm text-gray-500">
            ExpoHelpers helps connect international exhibitors with local service providers. While we aim to feature reputable companies verified through legal and public sources, we do not take part in or bear responsibility for any financial transactions, contracts, or agreements made between parties.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({ type: 'interpreter' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ p1: password, p2: secondPassword })
    });
    if (res.ok) {
      setIsLoggedIn(true);
      fetchSuppliers();
    } else {
      const errorData = await res.json().catch(() => ({}));
      alert(errorData.error || `Login failed (Status: ${res.status})`);
    }
  };

  const fetchSuppliers = async () => {
    const res = await fetch(`/api/admin/suppliers?p1=${encodeURIComponent(password)}&p2=${encodeURIComponent(secondPassword)}`);
    const data = await res.json();
    setSuppliers(data);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/suppliers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ p1: password, p2: secondPassword, supplier: newSupplier })
    });
    if (res.ok) {
      alert('Supplier added!');
      fetchSuppliers();
      setNewSupplier({ type: 'interpreter' });
    }
  };

  const handleApprove = async (id: string) => {
    const res = await fetch(`/api/admin/suppliers/${id}/approve`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ p1: password, p2: secondPassword })
    });
    if (res.ok) {
      fetchSuppliers();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    const res = await fetch(`/api/admin/suppliers/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ p1: password, p2: secondPassword })
    });
    if (res.ok) {
      fetchSuppliers();
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          
          <div className="relative mb-4">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="First Password" 
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative mb-6">
            <input 
              type={showSecondPassword ? "text" : "password"} 
              placeholder="Second Password" 
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884]"
              value={secondPassword}
              onChange={(e) => setSecondPassword(e.target.value)}
            />
            <button 
              type="button"
              onClick={() => setShowSecondPassword(!showSecondPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showSecondPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="w-full py-3 bg-[#da1884] text-white rounded-xl font-bold hover:bg-[#c01574] transition-all">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button onClick={() => setIsLoggedIn(false)} className="text-gray-500 hover:text-black font-medium">Logout</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Add New Supplier</h2>
              <form onSubmit={handleAdd} className="space-y-4">
                <select 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884]"
                  value={newSupplier.type}
                  onChange={(e) => setNewSupplier({...newSupplier, type: e.target.value as any})}
                >
                  {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                </select>
                <input 
                  placeholder="Name" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884]"
                  value={newSupplier.name || ''}
                  onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                />
                <input 
                  placeholder="City" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884]"
                  value={newSupplier.city || ''}
                  onChange={(e) => setNewSupplier({...newSupplier, city: e.target.value})}
                />
                <input 
                  placeholder="Photo URL" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884]"
                  value={newSupplier.imageUrl || ''}
                  onChange={(e) => setNewSupplier({...newSupplier, imageUrl: e.target.value})}
                />
                <input 
                  placeholder="Website URL" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884]"
                  value={newSupplier.website || ''}
                  onChange={(e) => setNewSupplier({...newSupplier, website: e.target.value})}
                />
                <input 
                  placeholder="Short Description" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884]"
                  value={newSupplier.shortDescription || ''}
                  onChange={(e) => setNewSupplier({...newSupplier, shortDescription: e.target.value})}
                />
                <textarea 
                  placeholder="Full Description" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884] h-32"
                  value={newSupplier.description || ''}
                  onChange={(e) => setNewSupplier({...newSupplier, description: e.target.value})}
                />
                <input 
                  placeholder="Contact Email" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#da1884]"
                  value={newSupplier.contactEmail || ''}
                  onChange={(e) => setNewSupplier({...newSupplier, contactEmail: e.target.value})}
                />
                <button type="submit" className="w-full py-3 bg-[#da1884] text-white rounded-xl font-bold">Add Supplier</button>
              </form>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">City</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Type</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {suppliers.map(s => (
                    <tr key={s.id}>
                      <td className="px-6 py-4">
                        {s.approved ? (
                          <span className="text-green-500 font-bold text-xs uppercase">Approved</span>
                        ) : (
                          <span className="text-amber-500 font-bold text-xs uppercase">Pending</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium">{s.name}</td>
                      <td className="px-6 py-4 text-gray-500">{s.city}</td>
                      <td className="px-6 py-4 text-gray-500">{s.type}</td>
                      <td className="px-6 py-4 flex gap-4">
                        {!s.approved && (
                          <button onClick={() => handleApprove(s.id)} className="text-[#da1884] hover:text-[#c01574] font-bold text-sm">Approve</button>
                        )}
                        <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-700 font-bold text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-gray-900 antialiased">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile/:id" element={<ProfileDetail />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sitemudur" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
