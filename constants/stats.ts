export const monthlyEarnings = [
  { month: "Jan", primary: 110, secondary: 180 },
  { month: "Feb", primary: 70, secondary: 120 },
  { month: "Mar", primary: 40, secondary: 60 },
  { month: "Apr", primary: 60, secondary: 140 },
  { month: "May", primary: 220, secondary: 260 },
  { month: "Jun", primary: 130, secondary: 150 },
  { month: "Jul", primary: 90, secondary: 110 },
  { month: "Aug", primary: 140, secondary: 160 },
  { month: "Sep", primary: 160, secondary: 140 },
  { month: "Oct", primary: 120, secondary: 150 },
  { month: "Nov", primary: 130, secondary: 140 },
  { month: "Dec", primary: 150, secondary: 170 },
];

export const compactBars = [
  { label: "1", value: 70 },
  { label: "2", value: 120 },
  { label: "3", value: 90 },
  { label: "4", value: 80 },
  { label: "5", value: 100 },
  { label: "6", value: 85 },
  { label: "7", value: 110 },
  { label: "8", value: 115 },
  { label: "9", value: 95 },
  { label: "10", value: 80 },
];

export const weeklyEarnings = [
  { day: "Mo", base: 140, overlay: 230 },
  { day: "Tu", base: 90, overlay: 180 },
  { day: "We", base: 150, overlay: 260 },
  { day: "Th", base: 170, overlay: 350 },
  { day: "Fr", base: 190, overlay: 240 },
  { day: "Sa", base: 130, overlay: 190 },
  { day: "Su", base: 180, overlay: 320 },
];

export const subscriptionTrend = [
  { label: "1", value: 8 },
  { label: "2", value: 12 },
  { label: "3", value: 10 },
  { label: "4", value: 9 },
  { label: "5", value: 13 },
  { label: "6", value: 12 },
  { label: "7", value: 18 },
];

// Stats2 data
export const earningTrend = [
  { date: "Nov 20th", primary: 50, secondary: 30 },
  { date: "Nov 25th", primary: 80, secondary: 50 },
  { date: "Nov 30th", primary: 60, secondary: 40 },
  { date: "Dec 5th", primary: 90, secondary: 60 },
  { date: "Dec 10th", primary: 100, secondary: 70 },
  { date: "Dec 15th", primary: 120, secondary: 80 },
  { date: "Dec 20th", primary: 140, secondary: 90 },
];

export const salesTrend = [
  { date: "Nov 20th", primary: 40, secondary: 25 },
  { date: "Nov 25th", primary: 70, secondary: 45 },
  { date: "Nov 30th", primary: 55, secondary: 35 },
  { date: "Dec 5th", primary: 85, secondary: 55 },
  { date: "Dec 10th", primary: 95, secondary: 65 },
  { date: "Dec 15th", primary: 110, secondary: 75 },
  { date: "Dec 20th", primary: 130, secondary: 85 },
];

export const viewsTrend = [
  { date: "Nov 20th", primary: 45, secondary: 28 },
  { date: "Nov 25th", primary: 75, secondary: 48 },
  { date: "Nov 30th", primary: 58, secondary: 38 },
  { date: "Dec 5th", primary: 88, secondary: 58 },
  { date: "Dec 10th", primary: 98, secondary: 68 },
  { date: "Dec 15th", primary: 115, secondary: 78 },
  { date: "Dec 20th", primary: 135, secondary: 88 },
];

export const subscriptionsPerformers = [
  { label: "1", value: 60 },
  { label: "2", value: 80 },
  { label: "3", value: 50 },
  { label: "4", value: 90 },
  { label: "5", value: 70 },
  { label: "6", value: 100 },
  { label: "7", value: 85 },
  { label: "8", value: 75 },
];

export interface TopSalesProduct {
  id: string;
  name: string;
  date: string;
  amount: number;
}

export const topSalesProducts: TopSalesProduct[] = [
  { id: "1", name: "Macbook Pro", date: "02/10/2024", amount: 100 },
  { id: "2", name: "Iphone 12 Pro", date: "02/10/2024", amount: 100 },
  { id: "3", name: "Macbook m3 pro", date: "02/10/2024", amount: 100 },
  { id: "4", name: "Youremail@email.com", date: "02/10/2024", amount: 100 },
  { id: "5", name: "Youremail@email.com", date: "02/10/2024", amount: 100 },
  { id: "6", name: "Youremail@email.com", date: "02/10/2024", amount: 100 },
  { id: "7", name: "Youremail@email.com", date: "02/10/2024", amount: 100 },
];

export interface PaymentHistory {
  id: string;
  status: "Succses" | "Failed";
  email: string;
  amount: number;
}

export const paymentHistory: PaymentHistory[] = [
  { id: "1", status: "Succses", email: "Youremail@email.com", amount: 100 },
  { id: "2", status: "Succses", email: "Youremail@email.com", amount: 100 },
  { id: "3", status: "Succses", email: "Youremail@email.com", amount: 100 },
  { id: "4", status: "Succses", email: "Youremail@email.com", amount: 100 },
  { id: "5", status: "Succses", email: "Youremail@email.com", amount: 100 },
  { id: "6", status: "Succses", email: "Youremail@email.com", amount: 100 },
  { id: "7", status: "Succses", email: "Youremail@email.com", amount: 100 },
  { id: "8", status: "Succses", email: "Youremail@email.com", amount: 100 },
];

