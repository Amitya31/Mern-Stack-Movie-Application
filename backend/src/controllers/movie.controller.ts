import { imdbTop250 } from "../data/imdbTop250.js";
import { movieQueue } from "../queues/movie.queue.js";
import { Request, Response } from "express";
import movieModel from "../models/movie.model.js";

export const importTop250Movies = async (req: Request, res: Response) => {
  for (const imdbId of imdbTop250) {
    await movieQueue.add("import-movie", {
      imdbId},
      { jobId: imdbId }
    );
  }

  return res.json({
    message: "250 movies queued for import",
    total: imdbTop250.length,
  });
};

export const getMovies = async (req: Request, res: Response) => {
  try {
    const {
      genre,
      sortBy = "rating",
      order = "desc",
      page = "1",
      limit = "10",
    } = req.query;

    const filters: any = {};

    // 🎭 Filter by genre
    if (genre) {
      filters.genre = { $in: [genre] };
    }

    // 🔃 Sorting
    const sortOptions: any = {};
    const sortOrder = order === "asc" ? 1 : -1;

    switch (sortBy) {
      case "rating":
        sortOptions.imdbRating = sortOrder;
        break;

      case "year":
        sortOptions.releaseYear = sortOrder;
        break;

      case "title":
        sortOptions.title = sortOrder; // alphabetical
        break;

      case "duration":
        sortOptions.duration = sortOrder;
        break;

      default:
        sortOptions.imdbRating = -1;
    }

    const pageNumber = parseInt(page as string);
    const pageSize = parseInt(limit as string);
    const skip = (pageNumber - 1) * pageSize;

    const [movies, total] = await Promise.all([
      movieModel.find(filters)
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize)
        .lean(),

      movieModel.countDocuments(filters),
    ]);

    return res.status(200).json({
      success: true,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / pageSize),
      data: movies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch movies",
    });
  }
};

export const searchMovies = async (req: Request, res: Response) => {
  try {
    const { q, page = "1", limit = "10" } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const pageNumber = parseInt(page as string);
    const pageSize = parseInt(limit as string);
    const skip = (pageNumber - 1) * pageSize;

    const [movies, total] = await Promise.all([
      movieModel.find(
        { $text: { $search: q as string } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .skip(skip)
        .limit(pageSize)
        .lean(),

      movieModel.countDocuments({ $text: { $search: q as string } }),
    ]);

    return res.status(200).json({
      success: true,
      query: q,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / pageSize),
      data: movies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Search failed",
    });
  }
};
