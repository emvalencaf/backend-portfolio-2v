export type UserMongoose = {

    name: string;
    password?: string | undefined;
    email?: string | undefined;
    createdAt: Date;
    updatedAt?: Date | undefined;
};

export type UserFrontEnd = {
    id: string;
    name: string;
    email: string;
    jwt?: string;
}

export type FindUserParams = {
    name?: string;
    email?: string;
};

export type TokenFrontEnd = {
    jwt: string;
    iat: number;
    exp: number;
}