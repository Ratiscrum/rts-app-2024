export type Token = {
  type: string;
  name?: string;
  token: string;
  abilities: string[];
  lastUsedAt?: Date;
  expiresAt: Date;
};
