export interface EmailTemplate {
  subject: string;
  body: string;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  category: 'datamäklare' | 'söktjänst' | 'annat';
}
