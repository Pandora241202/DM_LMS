import { Controller, Get } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";

@Controller('/analytics')
export class AnalyticsController {
    constructor (private readonly analyticsService: AnalyticsService) {}

    @Get('history-user')
    async getHistoryUser() {
        return this.analyticsService.getHistoryUser();
    }

    @Get('history-log')
    async getHistoryLog() {
        return this.analyticsService.getHistoryLog();
    }

    @Get('history-forum')
    async getHistoryForum() {
        return this.analyticsService.getHistoryForum();
    }
}