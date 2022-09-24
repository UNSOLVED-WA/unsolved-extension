const baseURL = 'https://34.64.94.140:3001';
export interface Repo {
  repo_name: string;
  login: string;
  stars: number;
  category: {
    category_L: string;
    category_M: string;
    category_S: string;
  };
  description: string;
  // url: string
}
