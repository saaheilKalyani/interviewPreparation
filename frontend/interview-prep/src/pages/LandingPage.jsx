import React, { useContext } from 'react'
import { APP_FEATURES } from '../utils/data';
import { useNavigate } from 'react-router-dom';
import { MdAutoAwesome } from 'react-icons/md'; 
import Modal from '../Components/Modal';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../Components/Cards/ProfileInfoCard';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <>
      {/* Background */}
      <div className="w-full min-h-screen bg-gradient-to-br from-emerald-300 via-teal-400 to-sky-400 flex flex-col">
        
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-6 bg-white/20 backdrop-blur-md shadow-md rounded-b-xl">
          <div className="text-2xl font-extrabold text-white drop-shadow-md">
            Interview Prep AI
          </div>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              className="bg-gradient-to-r from-emerald-500 to-sky-500 text-sm font-semibold text-white px-6 py-2 rounded-full shadow-lg hover:from-emerald-600 hover:to-sky-600 transition"
              onClick={() => setOpenAuthModal(true)}
            >
              Login / Signup
            </button>
          )}
        </header>

        {/* Hero Section - Centered */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-20">
          <div className="flex items-center gap-2 text-white bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-md">
            <MdAutoAwesome /> AI Powered
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight mb-6">
            Crack Your Next Interview <br />
            with <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-white animate-pulse">Confidence</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 font-medium">
            Personalized, role-specific preparation powered by AI.  
            Practice smarter, gain confidence, and shine in every interview.
          </p>

          <button
            onClick={handleCTA}
            className="bg-gradient-to-r from-green-500 to-sky-500 text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:from-green-600 hover:to-sky-600 transition"
          >
            Get Started
          </button>
        </section>
      </div>

      {/* Features Section - Staggered Layout */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-700 mb-14">
          Features that make you stand out
        </h2>

        <div className="flex flex-col gap-10 max-w-6xl mx-auto">
          {APP_FEATURES.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl shadow-lg bg-white/90 backdrop-blur-md border border-emerald-100 hover:shadow-xl transition ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-emerald-700 mb-3">
                  {/* {feature.title} */}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
              <div className="flex-1">
                <div className="w-full h-40 bg-gradient-to-r from-emerald-200 to-sky-200 rounded-xl shadow-inner flex items-center justify-center text-emerald-900 font-semibold">
                  {feature.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white text-center p-6 font-medium shadow-inner">
        Made with ❤️ by Saaheil Kalyani
      </footer>

      {/* Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <Signup setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
