export interface DataResponse {
    id: number;
    voter_id: number;
    candidate_id: number;
}


export interface VoteResponse {
    success: boolean;
    message: string;
    data: DataResponse;
}

export interface VoterResponse {
    id: number;
    name: string;
    email: string;
    has_voted: boolean;
}

export interface ValidateResponse {
    success: boolean;
    message: string;
    data: VoterResponse;
}
