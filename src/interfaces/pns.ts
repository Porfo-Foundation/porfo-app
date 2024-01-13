export interface IPnsProfile {
  userName: string;
  pointer: string;
  subdomains: ISubDomain[];
  minted: boolean;
  avatar_2d_url: string;
  name: string;
  id: string;
}

interface ISubDomain {
  name: string;
  pointer: string;
}
