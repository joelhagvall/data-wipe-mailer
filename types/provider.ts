export interface EmailTemplate {
  subject: string;
  body: string;
}

export type ProviderId =
  | 'mrkoll'
  | 'ratsit'
  | 'birthday'
  | 'hitta'
  | 'eniro'
  | 'biluppgifter'
  | 'merinfo'
  | 'upplysning';

export interface Provider {
  id: ProviderId;
  name: string;
  email: string;
  category: 'datamäklare' | 'söktjänst' | 'annat';
}
