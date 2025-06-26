
import React, { useState } from 'react';
import Header from './Header';
import LearningPath from './LearningPath';
import BibleModule from './BibleModule';
import UserProfile from './UserProfile';
import DailyDevotional from './DailyDevotional';
import QuestsAndBadges from './QuestsAndBadges';

const MainDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'bible':
        return <BibleModule />;
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
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pb-20">
        {renderContent()}
      </main>
    </div>
  );
};

export default MainDashboard;
