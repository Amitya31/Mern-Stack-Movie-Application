import mongoose from "mongoose";
import { Schema } from "mongoose";
const MovieSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
    },
    ratings: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            value: {
                type: Number,
                min: 1,
                max: 5,
                required: true,
            },
        }
    ],
    duration: {
        type: String,
        required: true,
    },
    liked: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            value: {
                type: Boolean,
                required: true,
            }
        }
    ]
}, {
    timestamps: true,
});
MovieSchema.set("toJSON", { virtuals: true });
MovieSchema.set("toObject", { virtuals: true });
MovieSchema.virtual("averageRating").get(function () {
    if (this.ratings.length === 0)
        return 0;
    const sum = this.ratings.reduce((acc, curr) => acc + curr.value, 0);
    return (sum / this.ratings.length).toFixed(1);
});
const MovieModel = mongoose.model('Movie', MovieSchema);
//# sourceMappingURL=movie.model.js.map