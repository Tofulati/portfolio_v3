import interestsData from './interests.json';
import type { InterestPin } from '../types';

export const INTERESTS_MEDIA_BASE = '/interests';

interface InterestPinJson {
  id: string;
  title: string;
  description?: string;
  type: InterestPin['type'];
  media?: string;
  link?: string;
  videoUrl?: string;
  embedUrl?: string;
  instagramUrl?: string;
  tags: string[];
}

interface InstagramAccountJson {
  id: string;
  title: string;
  description?: string;
  profileUrl: string;
  /** Optional post/reel permalinks — each becomes its own masonry pin */
  posts?: string[];
  tags: string[];
}

interface InterestsData {
  instagramAccounts?: InstagramAccountJson[];
  pins: InterestPinJson[];
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function toInterestPin(pin: InterestPinJson): InterestPin {
  return {
    id: pin.id,
    title: pin.title,
    description: pin.description,
    type: pin.type,
    mediaUrl: pin.media ? `${INTERESTS_MEDIA_BASE}/${pin.media}` : '',
    link: pin.link || undefined,
    videoUrl: pin.videoUrl,
    embedUrl: pin.embedUrl,
    instagramUrl: pin.instagramUrl,
    tags: pin.tags,
  };
}

function accountToPins(account: InstagramAccountJson): InterestPin[] {
  const profileUrl = account.profileUrl.endsWith('/')
    ? account.profileUrl
    : `${account.profileUrl}/`;

  const postPins: InterestPin[] = (account.posts ?? []).map((url, index) => ({
    id: `${account.id}-post-${index}`,
    title: account.title,
    description: account.description,
    type: 'instagram',
    mediaUrl: '',
    instagramUrl: url,
    link: profileUrl,
    tags: account.tags,
  }));

  const profilePin: InterestPin = {
    id: account.id,
    title: account.title,
    description: account.description,
    type: 'instagram',
    mediaUrl: '',
    instagramUrl: profileUrl,
    link: profileUrl,
    tags: account.tags,
  };

  return postPins.length > 0 ? postPins : [profilePin];
}

const data = interestsData as InterestsData;
const localPins = data.pins.map(toInterestPin);
const instagramPins = (data.instagramAccounts ?? []).flatMap(accountToPins);

export const interestPins: InterestPin[] = shuffle([...localPins, ...instagramPins]);
