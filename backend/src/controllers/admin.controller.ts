import { Request, Response } from "express";
import movieModel from "../models/movie.model.js";

export const createMovie = async (req: Request, res: Response) => {
  try {
    const {
      imdbId,
      title,
      description,
      releaseYear,
      duration,
      genre,
      imdbRating,
      poster,
    } = req.body;

    if (!title || !releaseYear) {
      return res.status(400).json({
        success: false,
        message: "Title and release year are required",
      });
    }

    const movie = await movieModel.create({
      imdbId,
      title,
      description,
      releaseYear,
      duration,
      genre,
      imdbRating,
      poster,
      source: "ADMIN",
    });

    return res.status(201).json({
      success: true,
      message: "Movie created successfully",
      data: movie,
    });
  } catch (error) {
    if(error instanceof Error){
        console.error(error)
    }
    return res.status(500).json({
      success: false,
      message: "Failed to create movie",
    });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedMovie = await movieModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: updatedMovie,
    });
  } catch (error) {
    if(error instanceof Error){
        console.error(error.message)
    }
    return res.status(500).json({
      success: false,
      message: "Failed to update movie",
    });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const movie = await movieModel.findByIdAndDelete(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete movie",
    });
  }
};
