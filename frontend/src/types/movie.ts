export interface AdminMovie {
  _id: string;
  imdbId?: string;        // optional for manual admin entry
  title: string;
  description: string;
  releaseYear: number;
  duration: number;
  genre: string[];
}
