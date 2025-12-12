"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";
import { paymentHistory } from "@/constants/stats";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const ITEMS_PER_PAGE = 7;

export const PaymentHistoryCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(paymentHistory.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPayments = paymentHistory.slice(startIndex, endIndex);

  const formatCurrency = (amount: number) => {
    return `$${amount}`;
  };

  return (
    <DashboardCard className="p-6 flex flex-col h-full">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Payment History
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your payments.
          </p>
        </div>
        <div className="flex-1">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 dark:border-gray-700">
                <TableHead className="text-gray-600 dark:text-gray-400">Status</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">Email</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400 text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPayments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="border-gray-200 dark:border-gray-700"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        checked={false} 
                        className="border-green-600 dark:border-green-500"
                      />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {payment.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-white">
                    {payment.email}
                  </TableCell>
                  <TableCell className="text-right text-gray-900 dark:text-white">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="bg-green-600 hover:bg-green-700 dark:bg-black dark:hover:bg-gray-900 dark:border-gray-700 text-white border-green-600 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="bg-green-600 hover:bg-green-700 dark:bg-black dark:hover:bg-gray-900 dark:border-gray-700 text-white border-green-600 disabled:opacity-50"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};

