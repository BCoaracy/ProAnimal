export interface User {
  email: string;
  senha: string;
  cpf: string;
  veterinario: boolean;
  crmv?:string;
  admin: boolean;
  id?: string;
}
