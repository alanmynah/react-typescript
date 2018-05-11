export interface GitRepositoryResponse {
    total_count: number;
    items?: Item[];
}

export interface Item {
    id: number;
    name: string;
    owner: {
        login: string;
        avatar_url: string;
        html_url: string;
    };
    html_url: string;
    open_issues: number;
    language: string;
    description: string;
    watchers: number;
}

export interface Result {
    key: number;
    title: string;
    description: string;
    image: string;
}
