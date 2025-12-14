import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    imdbId: string;
    title: string;
    genre: string[];
    source: string;
    ratings: mongoose.Types.DocumentArray<{
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }> & {
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }>;
    description?: string | null;
    releaseYear?: number | null;
    duration?: number | null;
    imdbRating?: number | null;
    poster?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    imdbId: string;
    title: string;
    genre: string[];
    source: string;
    ratings: mongoose.Types.DocumentArray<{
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }> & {
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }>;
    description?: string | null;
    releaseYear?: number | null;
    duration?: number | null;
    imdbRating?: number | null;
    poster?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    imdbId: string;
    title: string;
    genre: string[];
    source: string;
    ratings: mongoose.Types.DocumentArray<{
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }> & {
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }>;
    description?: string | null;
    releaseYear?: number | null;
    duration?: number | null;
    imdbRating?: number | null;
    poster?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    imdbId: string;
    title: string;
    genre: string[];
    source: string;
    ratings: mongoose.Types.DocumentArray<{
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }> & {
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }>;
    description?: string | null;
    releaseYear?: number | null;
    duration?: number | null;
    imdbRating?: number | null;
    poster?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    imdbId: string;
    title: string;
    genre: string[];
    source: string;
    ratings: mongoose.Types.DocumentArray<{
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }> & {
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }>;
    description?: string | null;
    releaseYear?: number | null;
    duration?: number | null;
    imdbRating?: number | null;
    poster?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    imdbId: string;
    title: string;
    genre: string[];
    source: string;
    ratings: mongoose.Types.DocumentArray<{
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }> & {
        value: number;
        user?: mongoose.Types.ObjectId | null;
    }>;
    description?: string | null;
    releaseYear?: number | null;
    duration?: number | null;
    imdbRating?: number | null;
    poster?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        imdbId: string;
        title: string;
        genre: string[];
        source: string;
        ratings: mongoose.Types.DocumentArray<{
            value: number;
            user?: mongoose.Types.ObjectId | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            value: number;
            user?: mongoose.Types.ObjectId | null;
        }> & {
            value: number;
            user?: mongoose.Types.ObjectId | null;
        }>;
        description?: string | null;
        releaseYear?: number | null;
        duration?: number | null;
        imdbRating?: number | null;
        poster?: string | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        imdbId: string;
        title: string;
        genre: string[];
        source: string;
        ratings: mongoose.Types.DocumentArray<{
            value: number;
            user?: mongoose.Types.ObjectId | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            value: number;
            user?: mongoose.Types.ObjectId | null;
        }> & {
            value: number;
            user?: mongoose.Types.ObjectId | null;
        }>;
        description?: string | null;
        releaseYear?: number | null;
        duration?: number | null;
        imdbRating?: number | null;
        poster?: string | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    imdbId: string;
    title: string;
    genre: string[];
    source: string;
    ratings: mongoose.Types.DocumentArray<{
        value: number;
        user?: mongoose.Types.ObjectId | null;
    } | {
        value: number;
        user?: string | null;
        _id: string;
    }, mongoose.Types.Subdocument<string | mongoose.mongo.BSON.ObjectId, unknown, {
        value: number;
        user?: mongoose.Types.ObjectId | null;
    } | {
        value: number;
        user?: string | null;
        _id: string;
    }> & ({
        value: number;
        user?: mongoose.Types.ObjectId | null;
    } | {
        value: number;
        user?: string | null;
        _id: string;
    })>;
    description?: string | null;
    releaseYear?: number | null;
    duration?: number | null;
    imdbRating?: number | null;
    poster?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    imdbId: string;
    title: string;
    genre: string[];
    source: string;
    ratings: mongoose.Types.DocumentArray<{
        value: number;
        user?: mongoose.Types.ObjectId | null;
    } | {
        value: number;
        user?: string | null;
        _id: string;
    }, mongoose.Types.Subdocument<string | mongoose.mongo.BSON.ObjectId, unknown, {
        value: number;
        user?: mongoose.Types.ObjectId | null;
    } | {
        value: number;
        user?: string | null;
        _id: string;
    }> & ({
        value: number;
        user?: mongoose.Types.ObjectId | null;
    } | {
        value: number;
        user?: string | null;
        _id: string;
    })>;
    description?: string | null;
    releaseYear?: number | null;
    duration?: number | null;
    imdbRating?: number | null;
    poster?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=movie.model.d.ts.map