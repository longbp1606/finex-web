import { get } from "./apiCaller";

export interface GetWauQuery {
    week: Date;
}

export interface GetCacQuery {
    year: Date;
}

export interface GetFreeToPremiumQuery {
    year: Date;
}

export interface GetRetentionRateQuery {
    year: Date;
}

export interface GetMonthlyRecurringRevenueQuery {
    year: Date;
}

export interface GetChurnRateQuery {
    year: Date;
}

export async function getWau(query: GetWauQuery) {
    const uri = `/api/chart/wau`
    return await get(uri, {
        week: query.week.toISOString()
    });
}

export async function getCac(query: GetCacQuery) {
    const uri = `/api/chart/cac`
    return await get(uri, {
        year: query.year.toISOString()
    })
}

export async function getFreeToPremium(query: GetFreeToPremiumQuery) {
    const uri = `/api/chart/free-to-premium`
    return await get(uri, {
        year: query.year.toISOString()
    })
}

export async function getRetentionRate(query: GetRetentionRateQuery) {
    const uri = `/api/chart/retention-rate`
    return await get(uri, {
        year: query.year.toISOString()
    })
}

export async function getMonthlyRecurringRevenue(query: GetFreeToPremiumQuery) {
    const uri = `/api/chart/monthly-recurring-revenue`
    return await get(uri, {
        year: query.year.toISOString()
    })
}

export async function getChurnRate(query: GetChurnRateQuery) {
    const uri = `/api/chart/churn-rate`
    return await get(uri, {
        year: query.year.toISOString()
    })
}