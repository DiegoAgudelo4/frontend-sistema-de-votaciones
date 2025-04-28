export interface VotersResponse {
    success: boolean;
    message: string;
    data: DataResponse;
}

export interface DataResponse {
    total: number;
    page: number;
    totalPages: number;
    voters: Voter[];
}

export interface Voter {
    id: number,
    name: string,
    email: string,
    has_voted: boolean
}