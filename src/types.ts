export type AppTab = 'today' | 'family' | 'reminders' | 'exercises' | 'sos' | 'caregiver' | 'night';

export interface ScheduleItem {
  id: string;
  time: string;
  location?: string;
  title: string;
  description: string;
  tag?: string;
  status: 'pending' | 'completed';
  completedAt?: string;
  iconName: string;
  image?: string;
  actionLabel?: string;
  isImmediate?: boolean;
}

export interface FamiliarContact {
  id: string;
  name: string;
  relation: string;
  subtext: string;
  photoUrl: string;
  memoryNote: string;
  category: 'family' | 'care';
  isVisitingToday?: boolean;
  visitTime?: string;
  visitStatus?: string;
  phone: string;
  voiceMessage?: string;
  readAloudText: string;
}

export interface CareTimelineEvent {
  id: string;
  title: string;
  categoryBadge: string;
  categoryColor: string;
  description: string;
  time: string;
  secondaryInfo?: string;
  icon: string;
}

export interface BedtimeCheckItem {
  id: string;
  label: string;
  description: string;
  icon: string;
  isConfirmed: boolean;
  confirmedAt?: string;
}
