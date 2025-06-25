
import React, { useState } from 'react';
import Header from './Header';
import DailyVerse from './DailyVerse';
import ModuleGrid from './ModuleGrid';
import ProgressSection from './ProgressSection';
import UserProfile from './UserProfile';

const MainDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile />;
      default:
        return (
          <div className="space-y-8">
            <DailyVerse />
            <ProgressSection />
            <ModuleGrid />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default MainDashboard;
