export interface IRevenueByProvider {
  provider: string;
  revenue: number;
}

export interface IDashboardOverview {
  totalRevenue: number;
  totalPayments: number;
  latestPayments: any[]; // or define a specific PaymentWithUserEvent interface
  revenueByProvider: IRevenueByProvider[];
}
