import type { Feedback } from "@prisma/client";

export type FeedbackWithStringDate = Omit<Feedback, "createdAt"> & {
	createdAt: string;
};

export type DailyCountAndRating = {
	date: Date;
	count: number;
	rating: number;
};

export type CategoryCount = {
	category: string;
	count: number;
};

export type SentimentCount = {
	sentiment: string;
	count: number;
};

export type GenerationCount = {
	generation: number;
	count: number;
};

export type RatingCount = {
	rating: number;
	count: number;
};
