"use server";
import { prisma } from "@/prisma/prisma";
import type {
	CategoryCount,
	DailyCount,
	FeedbackWithStringDate,
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
 * 指定された期間内の日ごとのフィードバック数を取得します。
 * @param {Date} from - 集計を開始する日付。
 * @param {Date} to - 集計を終了する日付。
 * @returns {Promise<DailyCount[]>} 日ごとのフィードバック数を含むオブジェクトの配列を返します。
 */
export const getDailyCounts = async ({
	from,
	to,
}: {
	from: Date;
	to: Date;
}): Promise<DailyCount[]> => {
	const dailyCounts = await prisma.$queryRaw`
		SELECT DATE("createdAt") as date, COUNT(*)::int as count
		FROM "Feedback"
		WHERE "createdAt" BETWEEN ${from} AND ${to}
		GROUP BY DATE("createdAt")
		ORDER BY date ASC;
	`;
	return dailyCounts as DailyCount[];
};

/**
 * 指定された期間内のカテゴリごとのフィードバック数を取得します。
 * @param {Date} from - 集計を開始する日付。
 * @param {Date} to - 集計を終了する日付。
 * @returns {Promise<CategoryCount[]>} カテゴリごとのフィードバック数を含むオブジェクトの配列を返します。
 */
export const getCategoryCounts = async ({
	from,
	to,
}: {
	from: Date;
	to: Date;
}): Promise<CategoryCount[]> => {
	const categoryCounts = await prisma.$queryRaw`
		SELECT "category", COUNT(*)::int as count
		FROM "Feedback"
		WHERE "createdAt" BETWEEN ${from} AND ${to}
		GROUP BY "category"
		ORDER BY category ASC;
	`;
	return categoryCounts as CategoryCount[];
};

/**
 * 指定された期間内の感情ごとのフィードバック数を取得します。
 * @param {Date} from - 集計を開始する日付。
 * @param {Date} to - 集計を終了する日付。
 * @returns {Promise<SentimentCount[]>} 感情ごとのフィードバック数を含むオブジェクトの配列を返します。
 */
export const getSentimentCounts = async ({
	from,
	to,
}: {
	from: Date;
	to: Date;
}): Promise<SentimentCount[]> => {
	const sentimentCounts = await prisma.$queryRaw`
		SELECT "sentiment", COUNT(*)::int as count
		FROM "Feedback"
		WHERE "createdAt" BETWEEN ${from} AND ${to}
		GROUP BY "sentiment"
		ORDER BY sentiment ASC;
	`;
	return sentimentCounts as SentimentCount[];
};
