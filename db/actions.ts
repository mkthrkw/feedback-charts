"use server";
import { prisma } from "@/prisma/prisma";
import type {
	CategoryCount,
	DailyCountAndRating,
	FeedbackWithStringDate,
	GenerationCount,
	RatingCount,
	SentimentCount,
} from "./type";

/**
 * 指定されたページとページサイズに基づいてフィードバックアイテムを取得します。
 * @param {number} page - 取得するページの番号（1から始まる）。
 * @param {number} pageSize - 1ページあたりのアイテム数。
 * @returns {Promise<FeedbackWithStringDate[]>} フィードバックアイテムの配列を返します。
 */
export const getFeedbackItems = async ({
	page,
	pageSize,
}: {
	page: number;
	pageSize: number;
}): Promise<FeedbackWithStringDate[]> => {
	const feedbacks = await prisma.feedback.findMany({
		skip: (page - 1) * pageSize,
		take: pageSize,
		orderBy: {
			createdAt: "desc",
		},
	});
	const feedbacksWithFormattedDate = feedbacks.map((feedback) => ({
		...feedback,
		createdAt: new Intl.DateTimeFormat("ja-JP", {
			dateStyle: "short",
			timeStyle: "medium",
		}).format(feedback.createdAt),
	}));
	return feedbacksWithFormattedDate;
};

/**
 * ページ数を計算します。
 * @param {number} pageSize - 1ページあたりのアイテム数。
 * @returns {Promise<number>} 総ページ数を返します。
 */
export const getTotalPages = async ({
	pageSize,
}: {
	pageSize: number;
}): Promise<number> => {
	const totalPages = await prisma.feedback.count();
	return Math.ceil(totalPages / pageSize);
};

/**
 * 指定された期間内の日ごとのフィードバック数と評価点の平均を取得します。
 * @param {Date} rangeFrom - 集計を開始する日付。
 * @param {Date} rangeTo - 集計を終了する日付。
 * @returns {Promise<DailyCountAndRating[]>} 日ごとのフィードバック数と評価点の平均を含むオブジェクトの配列を返します。
 */
export const getDailyCountsAndRating = async ({
	rangeFrom,
	rangeTo,
}: {
	rangeFrom: Date;
	rangeTo: Date;
}): Promise<DailyCountAndRating[]> => {
	const dailyCountsAndRating = await prisma.$queryRaw`
		SELECT DATE("createdAt") as date, COUNT(*)::int as count, AVG("rating")::float as rating
		FROM "Feedback"
		WHERE "createdAt" BETWEEN ${rangeFrom} AND ${rangeTo}
		GROUP BY DATE("createdAt")
		ORDER BY date ASC;
	`;
	return dailyCountsAndRating as DailyCountAndRating[];
};

/**
 * 指定された期間内のカテゴリごとのフィードバック数を取得します。
 * @param {Date} rangeFrom - 集計を開始する日付。
 * @param {Date} rangeTo - 集計を終了する日付。
 * @returns {Promise<CategoryCount[]>} カテゴリごとのフィードバック数を含むオブジェクトの配列を返します。
 */
export const getCategoryCounts = async ({
	rangeFrom,
	rangeTo,
}: {
	rangeFrom: Date;
	rangeTo: Date;
}): Promise<CategoryCount[]> => {
	const categoryCounts = await prisma.$queryRaw`
		SELECT "category", COUNT(*)::int as count
		FROM "Feedback"
		WHERE "createdAt" BETWEEN ${rangeFrom} AND ${rangeTo}
		GROUP BY "category"
		ORDER BY count DESC;
	`;
	return categoryCounts as CategoryCount[];
};

/**
 * 指定された期間内の感情ごとのフィードバック数を取得します。
 * @param {Date} rangeFrom - 集計を開始する日付。
 * @param {Date} rangeTo - 集計を終了する日付。
 * @returns {Promise<SentimentCount[]>} 感情ごとのフィードバック数を含むオブジェクトの配列を返します。
 */
export const getSentimentCounts = async ({
	rangeFrom,
	rangeTo,
}: {
	rangeFrom: Date;
	rangeTo: Date;
}): Promise<SentimentCount[]> => {
	const sentimentCounts = await prisma.$queryRaw`
		SELECT "sentiment", COUNT(*)::int as count
		FROM "Feedback"
		WHERE "createdAt" BETWEEN ${rangeFrom} AND ${rangeTo}
		GROUP BY "sentiment"
		ORDER BY sentiment ASC;
	`;
	return sentimentCounts as SentimentCount[];
};

/**
 * 指定された期間内の年代ごとのフィードバック数を取得します。
 * @param {Date} rangeFrom - 集計を開始する日付。
 * @param {Date} rangeTo - 集計を終了する日付。
 * @returns {Promise<GenerationCount[]>} 年代ごとのフィードバック数を含むオブジェクトの配列を返します。
 */
export const getGenerationCounts = async ({
	rangeFrom,
	rangeTo,
}: {
	rangeFrom: Date;
	rangeTo: Date;
}): Promise<GenerationCount[]> => {
	const generationCounts = await prisma.$queryRaw`
		SELECT ("age"/10)*10 AS generation, COUNT(*)::int as count
		FROM "Feedback"
		WHERE "createdAt" BETWEEN ${rangeFrom} AND ${rangeTo}
		GROUP BY "generation"
		ORDER BY generation ASC;
	`;
	return generationCounts as GenerationCount[];
};

/**
 * 指定された期間内の評価点ごとのフィードバック数を取得します。
 * @param {Date} rangeFrom - 集計を開始する日付。
 * @param {Date} rangeTo - 集計を終了する日付。
 * @returns {Promise<RatingCount[]>} 評価点ごとのフィードバック数を含むオブジェクトの配列を返します。
 */
export const getRatingCounts = async ({
	rangeFrom,
	rangeTo,
}: {
	rangeFrom: Date;
	rangeTo: Date;
}): Promise<RatingCount[]> => {
	const ratingCounts = await prisma.$queryRaw`
		SELECT "rating", COUNT(*)::int as count
		FROM "Feedback"
		WHERE "createdAt" BETWEEN ${rangeFrom} AND ${rangeTo}
		GROUP BY "rating"
		ORDER BY rating ASC;
	`;
	return ratingCounts as RatingCount[];
};
