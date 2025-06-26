
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface GameProgress {
  currentStreak: number;
  totalXP: number;
  currentLives: number;
  completedLevels: string[];
  unlockedLevels: string[];
}

export const useGameProgress = () => {
  const { user, isGuest } = useAuth();
  const [progress, setProgress] = useState<GameProgress>({
    currentStreak: 0,
    totalXP: 0,
    currentLives: 5,
    completedLevels: [],
    unlockedLevels: ['1'] // Primer nivel siempre desbloqueado
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && !isGuest) {
      fetchProgress();
    } else {
      // Para invitados, usar estado local
      const guestProgress = localStorage.getItem('zafirigo_guest_progress');
      if (guestProgress) {
        setProgress(JSON.parse(guestProgress));
      }
      setIsLoading(false);
    }
  }, [user, isGuest]);

  const fetchProgress = async () => {
    if (!user) return;

    try {
      // Fetch user progress
      const { data: levelsProgress } = await supabase
        .from('levels_progress')
        .select('*')
        .eq('user_id', user.id);

      // Fetch user stats
      const { data: streakData } = await supabase
        .from('streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const { data: livesData } = await supabase
        .from('lives')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const { data: pointsData } = await supabase
        .from('points_history')
        .select('points')
        .eq('user_id', user.id);

      const completedLevels = levelsProgress?.filter(p => p.completed).map(p => p.level_id) || [];
      const totalXP = pointsData?.reduce((sum, p) => sum + p.points, 0) || 0;

      // Calculate unlocked levels
      const unlockedLevels = ['1']; // Primer nivel siempre desbloqueado
      for (let i = 0; i < completedLevels.length; i++) {
        const nextLevelId = (parseInt(completedLevels[i]) + 1).toString();
        if (!unlockedLevels.includes(nextLevelId)) {
          unlockedLevels.push(nextLevelId);
        }
      }

      setProgress({
        currentStreak: streakData?.current_streak || 0,
        totalXP,
        currentLives: livesData?.current_lives || 5,
        completedLevels,
        unlockedLevels
      });
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeLevel = async (levelId: string, score: number, xpEarned: number) => {
    const newProgress = {
      ...progress,
      completedLevels: [...progress.completedLevels, levelId],
      totalXP: progress.totalXP + xpEarned,
      unlockedLevels: [...progress.unlockedLevels]
    };

    // Desbloquear siguiente nivel
    const nextLevelId = (parseInt(levelId) + 1).toString();
    if (!newProgress.unlockedLevels.includes(nextLevelId) && parseInt(nextLevelId) <= 8) {
      newProgress.unlockedLevels.push(nextLevelId);
    }

    if (user && !isGuest) {
      try {
        // Save to database
        await supabase
          .from('levels_progress')
          .upsert({
            user_id: user.id,
            level_id: levelId,
            completed: true,
            score,
            completed_at: new Date().toISOString()
          });

        await supabase
          .from('points_history')
          .insert({
            user_id: user.id,
            points: xpEarned,
            reason: `Completed level ${levelId}`,
            level_id: levelId
          });

        // Update streak
        await supabase
          .from('streaks')
          .upsert({
            user_id: user.id,
            current_streak: progress.currentStreak + 1,
            last_activity_date: new Date().toISOString().split('T')[0]
          });

        newProgress.currentStreak = progress.currentStreak + 1;
        
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    } else {
      // Para invitados, guardar en localStorage
      localStorage.setItem('zafirigo_guest_progress', JSON.stringify(newProgress));
    }

    setProgress(newProgress);
  };

  const loseLife = async () => {
    const newLives = Math.max(0, progress.currentLives - 1);
    const newProgress = { ...progress, currentLives: newLives };

    if (user && !isGuest) {
      try {
        await supabase
          .from('lives')
          .update({
            current_lives: newLives,
            last_life_lost_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
      } catch (error) {
        console.error('Error updating lives:', error);
      }
    } else {
      localStorage.setItem('zafirigo_guest_progress', JSON.stringify(newProgress));
    }

    setProgress(newProgress);
  };

  return {
    progress,
    isLoading,
    completeLevel,
    loseLife,
    refreshProgress: fetchProgress
  };
};
