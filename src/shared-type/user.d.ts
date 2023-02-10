export type UserMongoose = {

    username: string;
    password?: string | undefined;
    email?: string | undefined;
    createdAt: Date;
    updatedAt?: Date | undefined;
};

export type UserFrontEnd = {
    username: string;
    password?: string;
    email?: string;
}

export type FindUserParams = {
    username?: string;
    email?: string;
};