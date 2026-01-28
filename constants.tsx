
import React from 'react';
import { BookOpen, Zap, Target, BarChart3, Clock, Layout } from 'lucide-react';

export const MOTIVATIONAL_QUOTES = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "Your competition is practicing while you are sleeping.",
  "Don't stop when you're tired. Stop when you're done.",
  "Focus on the step, not the mountain.",
  "IIT is not a destination, it's a reward for your discipline."
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Home', icon: <Layout className="w-5 h-5" /> },
  { id: 'backlog', label: 'Backlog', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'focus', label: 'Focus', icon: <Clock className="w-5 h-5" /> },
  { id: 'stats', label: 'Stats', icon: <BarChart3 className="w-5 h-5" /> },
  { id: 'dev', label: 'Android Dev', icon: <Zap className="w-5 h-5" /> }
];

export const SUBJECT_COLORS = {
  Physics: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  Chemistry: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Maths: 'text-orange-400 bg-orange-400/10 border-orange-400/20'
};
