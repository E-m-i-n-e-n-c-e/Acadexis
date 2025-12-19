// Types
export type UserRole = 'student' | 'admin' | 'seating_manager';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  isClubCoordinator: boolean;
  email: string;
  department: string;
  semester: number;
}

export interface Exam {
  id: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  type: 'internal' | 'external' | 'practical';
}

export interface HallTicket {
  id: string;
  examId: string;
  studentId: string;
  seatNumber: string;
  roomNumber: string;
  isPublished: boolean;
}

export interface SeatingAllocation {
  id: string;
  examId: string;
  roomId: string;
  studentId: string;
  benchNumber: string;
  row: number;
  column: number;
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  rows: number;
  columns: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'event' | 'deadline' | 'holiday';
  description: string;
  color?: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  description: string;
  proposedBy: string;
  proposedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  eventDate: string;
  venue: string;
  clubName: string;
}

export interface SyllabusDocument {
  id: string;
  subject: string;
  content: string;
  uploadedAt: string;
  semester: number;
}

export interface MindMapNode {
  id: string;
  label: string;
  children: MindMapNode[];
  importance: 'high' | 'medium' | 'low';
  explanation?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  forRoles: UserRole[];
}

// Storage keys
const STORAGE_KEYS = {
  USER: 'campus_hub_user',
  EXAMS: 'campus_hub_exams',
  HALL_TICKETS: 'campus_hub_hall_tickets',
  SEATING: 'campus_hub_seating',
  ROOMS: 'campus_hub_rooms',
  CALENDAR: 'campus_hub_calendar',
  CLUB_EVENTS: 'campus_hub_club_events',
  SYLLABUS: 'campus_hub_syllabus',
  MIND_MAPS: 'campus_hub_mind_maps',
  NOTIFICATIONS: 'campus_hub_notifications',
  DEMO_LOADED: 'campus_hub_demo_loaded',
};

// Helper functions
export const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// User functions
export const getUser = (): User | null => getItem<User | null>(STORAGE_KEYS.USER, null);
export const setUser = (user: User | null) => setItem(STORAGE_KEYS.USER, user);
export const logout = () => localStorage.removeItem(STORAGE_KEYS.USER);

// Exams
export const getExams = (): Exam[] => getItem(STORAGE_KEYS.EXAMS, []);
export const setExams = (exams: Exam[]) => setItem(STORAGE_KEYS.EXAMS, exams);

// Hall Tickets
export const getHallTickets = (): HallTicket[] => getItem(STORAGE_KEYS.HALL_TICKETS, []);
export const setHallTickets = (tickets: HallTicket[]) => setItem(STORAGE_KEYS.HALL_TICKETS, tickets);

// Seating
export const getSeatingAllocations = (): SeatingAllocation[] => getItem(STORAGE_KEYS.SEATING, []);
export const setSeatingAllocations = (allocations: SeatingAllocation[]) => setItem(STORAGE_KEYS.SEATING, allocations);

// Rooms
export const getRooms = (): Room[] => getItem(STORAGE_KEYS.ROOMS, []);
export const setRooms = (rooms: Room[]) => setItem(STORAGE_KEYS.ROOMS, rooms);

// Calendar
export const getCalendarEvents = (): CalendarEvent[] => getItem(STORAGE_KEYS.CALENDAR, []);
export const setCalendarEvents = (events: CalendarEvent[]) => setItem(STORAGE_KEYS.CALENDAR, events);

// Club Events
export const getClubEvents = (): ClubEvent[] => getItem(STORAGE_KEYS.CLUB_EVENTS, []);
export const setClubEvents = (events: ClubEvent[]) => setItem(STORAGE_KEYS.CLUB_EVENTS, events);

// Syllabus
export const getSyllabusDocuments = (): SyllabusDocument[] => getItem(STORAGE_KEYS.SYLLABUS, []);
export const setSyllabusDocuments = (docs: SyllabusDocument[]) => setItem(STORAGE_KEYS.SYLLABUS, docs);

// Mind Maps
export const getMindMaps = (): Record<string, MindMapNode> => getItem(STORAGE_KEYS.MIND_MAPS, {});
export const setMindMaps = (maps: Record<string, MindMapNode>) => setItem(STORAGE_KEYS.MIND_MAPS, maps);

// Notifications
export const getNotifications = (): Notification[] => getItem(STORAGE_KEYS.NOTIFICATIONS, []);
export const setNotifications = (notifications: Notification[]) => setItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
export const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
  const notifications = getNotifications();
  const newNotification: Notification = {
    ...notification,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    read: false,
  };
  setNotifications([newNotification, ...notifications]);
};

// Demo data check
export const isDemoLoaded = (): boolean => getItem(STORAGE_KEYS.DEMO_LOADED, false);
export const setDemoLoaded = (loaded: boolean) => setItem(STORAGE_KEYS.DEMO_LOADED, loaded);

// Reset all data
export const resetAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
};
