import mongoose, { Schema } from "mongoose";

const MovieSchema = new Schema(
  {
    imdbId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      index: true,
    },

    description: {
      type: String,
    },

    releaseYear: {
      type: Number,
      index: true,
    },

    duration: {
      type: Number, // in minutes
    },

    genre: {
      type: [String],
      index: true,
    },

    imdbRating: {
      type: Number,
      min: 0,
      max: 10,
    },

    poster: {
      type: String,
    },

    source: {
      type: String,
      default: "OMDb",
    },

    // createdBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User", 
    //   required: true,
    // },

    ratings: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        value: {
          type: Number,
          min: 1,
          max: 5,
          required:true,
        },
      },
    ],
  },
  { timestamps: true }
);

MovieSchema.index({
  title: "text",
  description: "text",
});

MovieSchema.virtual("averageRating").get(function () {
  if (!this.ratings.length) return 0;
  const sum = this.ratings.reduce((a, r) => a + r.value, 0);
  return Number((sum / this.ratings.length).toFixed(1));
});

MovieSchema.set("toJSON", { virtuals: true });
MovieSchema.set("toObject", { virtuals: true });

export default mongoose.model("Movie", MovieSchema);
