export interface Statitic {
    candidate_id: number;
    candidate_name: string;
    total_votes: number;
    vote_percentage: number | null;
}
export interface DataResponse {
    total_votes: number;
    statitics: Statitic[];
}

export interface StatiticsResponse {
    success: boolean;
    message: string;
    data: DataResponse;
}

