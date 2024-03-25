type MessageResponse = {
    message: string;
};

type ErrorResponse = MessageResponse & {
    stack?: string;
};

type UserDeleteResponse = MessageResponse & {
    user: { user_id: number };
};

type AvailableResponse = Partial<MessageResponse> & {
    available?: boolean;
};

type BooleanResponse = MessageResponse & {
    success: boolean;
};

// for upload server
type UploadResponse = MessageResponse & {
    data: {
        filename: string;
        media_type: string;
        filesize: number;
    };
};

export type {
    MessageResponse,
    ErrorResponse,
    UploadResponse,
    UserDeleteResponse,
    AvailableResponse,
    BooleanResponse
};
