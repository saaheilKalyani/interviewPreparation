import React from 'react'

// import HERO_PNG from '../../assets/hero.png';
import { APP_FEATURES } from '../utils/data';
import { useNavigate } from 'react-router-dom';
import { LuSparkles } from 'react-icons/lu';
import Modal  from '../Components/Modal';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

const LandingPage = () => {
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState('login');
  const handleCTA = () => {
    console.log("CTA Clicked");
  };
  return (
    <>
    <div className="w-full min-h-full bg-[#FFFCEF]">
      <div className="w-[500px] h-[500px bg-amber-200/20 blur-[65px] absolute top-0" />
      <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-16" >
          <div className="text-xl text-black font-bold">
            Interview Prep AI 
          </div>
          <button className="bg-linear-to-r from-[#FBBF24] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"   
            onClick = {() => 
              setOpenAuthModal('true') 
            }
          >
            Login / Signup
          </button>
        </header>
      
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
            <div className="flex items-center justify-left mb-2">
              <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                <LuSparkles />  
                AI Powered
              </div>
            </div>
            <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
              Ace Interview with <br />
              <span className="text-yellow-400 bg-clip-text bg-[radial-gradiant(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                AI Powered
              </span> {""}
              Learning 
            </h1>
          </div> 
          <div className="w-full md:w-1/2">
            <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
              Get role specific questions, expand answers when you need them, dive deeper into concepts, and organize everything your way. 
              From preparation to mastery - your ultimate interview toolkit is here.
            </p>   
            <button 
              className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
              onClick={handleCTA}
            >Get Started</button>
          </div>
        </div>   
      </div>
    </div>
    
    <div className="w-full min-h-full relative z-10 ">
      <div>
        <section className="flex items-center justify-center -mt-36">
          <img
            // src={HERO_IMG}
            alt='Hero image'
            className="w-[80vw] rounded-lg"
          />
        </section>
      </div>

      <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
        <div className="container mx-auto px-4 pt-10 pb-20">
          <section className="mt-5">
            <h2 className="text-2xl font-medium text-center mb-12">
              Features that make you shine
            </h2>
            <div className="flex flex-col items-center gap-8">
              {/* First 3 cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {APP_FEATURES.slice(0, 3).map((feature) => (
                  <div 
                    key={feature.id} 
                    className="bg-[#fffef8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border-amber-100"
                  >
                    <h3 className="text-base font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>  

              {/* Remaining 2 cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {APP_FEATURES.slice(3).map((feature) => (
                  <div 
                    key={feature.id} 
                    className="bg-[#fffef8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border-amber-100"
                  >
                    <h3 className="text-base font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
        Made with ❤️ by Saaheil Kalyani
      </div>
    </div>

    <Modal
      isOpen={openAuthModal}
      onclose={() => {
        setOpenAuthModal('false');
        setCurrentPage('login');
      }}
      hideHeader
    >
      <div>
        {currentPage === "login" &&  (
          <Login setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "signup" && ( 
          <Signup setCurrentPage={setCurrentPage} />
        )}  
      </div>
    </Modal>
    
    </>
  )
}

export default LandingPage
