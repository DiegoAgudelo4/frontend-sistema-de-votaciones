export interface Candidate {
  id: number;
  name: string;
  email: string;
  party: string;
  votes: number;
}

export interface DataResponse{
  tota: number;
  page: number;
  totalPages: number;
  candidates: Candidate[];
}

export interface CandidatesResponse{
  success: boolean;
  message: string;
  data: DataResponse;
}
