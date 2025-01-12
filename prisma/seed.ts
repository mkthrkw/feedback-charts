import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { sampleFeedbackData } from "./sample-feedbacks";

const prisma = new PrismaClient();

const getRandomFeedback = () => {
	const feedback = faker.helpers.arrayElement(sampleFeedbackData);
	const gender = faker.person.sexType();
	return {
		userName: faker.person.fullName({ sex: gender }),
		category: feedback.category,
		sentiment: feedback.sentiment,
		comment: feedback.comment,
		gender: gender,
		age: faker.number.int({ min: 18, max: 60 }),
		rating: feedback.rating,
		createdAt: faker.date.between({
			from: new Date().setMonth(new Date().getMonth() - 6),
			to: new Date(),
		}),
	};
};

async function main() {
	console.log("Seeding feedback data...");

	const recordCount = 10000; // Specify the number of records to generate
	for (let i = 0; i < recordCount; i++) {
		await prisma.feedback.create({
			data: getRandomFeedback(),
		});
	}

	console.log("Seeding completed!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
