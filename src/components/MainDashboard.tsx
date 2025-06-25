
import React, { useState } from 'react';
import Header from './Header';
import LearningPath from './LearningPath';
import ProgressSection from './ProgressSection';
import UserProfile from './UserProfile';
import DailyDevotional from './DailyDevotional';
import QuestsAndBadges from './QuestsAndBadges';

const MainDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile />;
      case 'devotional':
        return <DailyDevotional />;
      case 'quests':
        return <QuestsAndBadges />;
      default:
        return <LearningPath />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pb-20">
        {renderContent()}
      </main>
    </div>
  );
};

export default MainDashboard;
