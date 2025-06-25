
import React, { useState, useEffect } from 'react';
import WelcomeAnimation from '../components/WelcomeAnimation';
import SpiritualLoader from '../components/SpiritualLoader';
import MainDashboard from '../components/MainDashboard';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    // Secuencia de animaciones al cargar
    const timer1 = setTimeout(() => {
      setShowWelcome(false);
      setShowLoader(true);
    }, 3000);

    const timer2 = setTimeout(() => {
      setShowLoader(false);
      setShowDashboard(true);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (showWelcome) {
    return <WelcomeAnimation />;
  }

  if (showLoader) {
    return <SpiritualLoader />;
  }

  return <MainDashboard />;
};

export default Index;
