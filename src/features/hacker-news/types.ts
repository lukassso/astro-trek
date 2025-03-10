interface Hit {
  objectID: string;
  title: string;
  url: string;
  num_comments: number;
  points: number;
  author: string;
  created_at: string;
}

export interface HackerNewsState {
  isLoading: boolean;
  page: number;
  handlePage: (page: string) => void;
  hits: Hit[];
  nbPages: number;
  error?: string;
  handleSearch: (value: string) => void;
  query?: string;
}

export interface Action {
  type: string;
  payload?: any;
}
