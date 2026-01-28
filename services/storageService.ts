
import { BacklogItem, FocusSession, UserProfile } from '../types';

const STORAGE_KEYS = {
  BACKLOG: 'focusflow_backlog',
  SESSIONS: 'focusflow_sessions',
  PROFILE: 'focusflow_profile'
};

export const storageService = {
  getBacklog: (): BacklogItem[] => {
    const data = localStorage.getItem(STORAGE_KEYS.BACKLOG);
    return data ? JSON.parse(data) : [];
  },
  saveBacklog: (items: BacklogItem[]) => {
    localStorage.setItem(STORAGE_KEYS.BACKLOG, JSON.stringify(items));
  },
  addBacklogItem: (item: BacklogItem) => {
    const items = storageService.getBacklog();
    storageService.saveBacklog([...items, item]);
  },
  updateBacklogItem: (updated: BacklogItem) => {
    const items = storageService.getBacklog().map(i => i.id === updated.id ? updated : i);
    storageService.saveBacklog(items);
  },
  deleteBacklogItem: (id: string) => {
    const items = storageService.getBacklog().filter(i => i.id !== id);
    storageService.saveBacklog(items);
  },
  getSessions: (): FocusSession[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return data ? JSON.parse(data) : [];
  },
  addSession: (session: FocusSession) => {
    const sessions = storageService.getSessions();
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify([...sessions, session]));
  },
  getProfile: (): UserProfile => {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : { name: 'Aspirant', streak: 0, lastActive: Date.now(), targetExamYear: '2025' };
  },
  saveProfile: (profile: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }
};
