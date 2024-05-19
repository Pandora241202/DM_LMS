import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";

@Injectable()
export class AnalyticsService {
    constructor (private readonly prismaService: PrismaService) {}

    async getHistoryUser() {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        today.setHours(0, 0, 0, 0);
        tomorrow.setHours(0, 0, 0, 0);


        const todayLoginHistory = await this.prismaService.loginHistory.findMany({
            where: { loginTime: { gte: today, lt: tomorrow } }
        });
        return {todayLogin: todayLoginHistory.length};
    }

    async getHistoryLog() {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        today.setHours(0, 0, 0, 0);
        tomorrow.setHours(0, 0, 0, 0);


        const todayLoginHistory = await this.prismaService.learnerLog.findMany({
            where: { createdAt: { gte: today, lt: tomorrow } }
        });
        return {todayLearnerLog: todayLoginHistory.length};
    }

    async getHistoryForum() {
        const firstDateThisMonth = new Date();
        const firstDateNextMonth = new Date();
        firstDateNextMonth.setDate(1);
        firstDateNextMonth.setDate(1);

        firstDateNextMonth.setMonth(firstDateThisMonth.getMonth() + 1);


        firstDateThisMonth.setHours(0, 0, 0, 0);
        firstDateNextMonth.setHours(0, 0, 0, 0);


        const thisMonthLearnerForum = await this.prismaService.$queryRawUnsafe(`SELECT
    forum_id,
    CAST(SUM(access_time) AS NUMERIC) AS total_access_time
FROM
    history_access_forum
WHERE
    EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW()) AND
    EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM NOW())
GROUP BY
    EXTRACT(YEAR FROM created_at),
    EXTRACT(MONTH FROM created_at),
    forum_id
ORDER BY total_access_time DESC
LIMIT 10`);
        
        return {thisMonthLearnerForum};
    }
}