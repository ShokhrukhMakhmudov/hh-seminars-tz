export type SeminarType = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
};

export type ContextType = {
  loading: boolean;
  refetchState: boolean;
};
