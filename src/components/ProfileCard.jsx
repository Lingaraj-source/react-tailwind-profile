import { useState } from 'react';
// --- Import HiViewGrid ---
import { HiOutlineQuestionMarkCircle, HiViewGrid } from 'react-icons/hi';

const ProfileCard = () => {
  const [activeTab, setActiveTab] = useState('about');

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <p>
            Hello! I'm Dave, your sales rep here from Salesforce. I've been
            working at this awesome company for 3 years now.
            <br />
            <br />
            I was born and raised in Albany, NY & have been living in Santa
            Carla for the past 10 years my wife Tiffany and my 4 year old twin
            daughters - Emma and Ella. Both of them are just starting school,
            so my calendar is usually blocked between 9–10 AM. This is a...
          </p>
        );
      case 'experiences':
        return <p>Dave's experiences will be listed here.</p>;
      case 'recommended':
        return <p>Recommended content based on Dave's profile.</p>;
      default:
        return null;
    }
  };

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`py-2 px-5 rounded-full text-sm font-medium transition-all
        ${
          activeTab === id
            ? 'bg-gray-900 text-white shadow-md' // --- Active Tab Style ---
            : 'text-slate-400 hover:text-white' // --- Inactive Tab Style ---
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 backdrop-blur-lg shadow-2xl">
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center mb-4">
        {/* --- Question Mark Button --- */}
        <button className="bg-gray-900/70 rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-gray-800 transition-colors">
          <HiOutlineQuestionMarkCircle className="w-5 h-5" />
        </button>
        {/* --- Navigation Tabs --- */}
        <nav className="flex gap-2">
          <TabButton id="about" label="About Me" />
          <TabButton id="experiences" label="Experiences" />
          <TabButton id="recommended" label="Recommended" />
        </nav>
      </header>
      
      {/* --- BODY --- */}
      <div className="flex gap-4">
        {/* --- Grid Icon --- */}
        <div className="text-slate-500 pt-1">
          <HiViewGrid className="w-5 h-5" />
        </div>
        {/* --- Text Content --- */}
        <div className="text-slate-300 text-sm leading-relaxed max-h-40 overflow-y-auto pr-2">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;