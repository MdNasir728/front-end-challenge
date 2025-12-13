"use client";

import { useState, useMemo, useRef, useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { SortableTableHeader } from "./SortableTableHeader";
import { Pagination } from "./Pagination";
import { deleteProduct } from "@/lib/productsUtil";
import { showToast } from "@/lib/toast";
import type { Product, SortField, SortOrder, ProductStatus } from "@/types/product";

interface ProductTableProps {
  products: Product[];
  status: ProductStatus;
  onProductChange?: () => void;
}

const ITEMS_PER_PAGE = 16;

export const ProductTable = ({ products, status, onProductChange }: ProductTableProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());

  const filteredProducts = useMemo(
    () => products.filter((p) => p.status === status),
    [products, status]
  );

  // Reset page when status or products (category filter) changes
  const prevStatusRef = useRef(status);
  const prevProductsRef = useRef(products);
  
  useEffect(() => {
    const statusChanged = prevStatusRef.current !== status;
    // Check if products array reference changed (category filter changed)
    const productsChanged = prevProductsRef.current !== products;
    
    if (statusChanged || productsChanged) {
      prevStatusRef.current = status;
      prevProductsRef.current = products;
      // Reset to first page when status or category filter changes
      startTransition(() => {
        setCurrentPage(1);
      });
    }
  }, [status, products]);

  const sortedProducts = useMemo(() => {
    if (!sortField) return filteredProducts;

    return [...filteredProducts].sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredProducts, sortField, sortOrder]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(new Set(currentProducts.map((p) => p.id)));
    } else {
      setSelectedProducts(new Set());
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    const newSelected = new Set(selectedProducts);
    if (checked) {
      newSelected.add(productId);
    } else {
      newSelected.delete(productId);
    }
    setSelectedProducts(newSelected);
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const handleEdit = (productId: string) => {
    router.push(`/products/edit/${productId}`);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
      showToast.success("Product deleted successfully!");
      if (onProductChange) {
        onProductChange();
      }
    }
  };

  const allSelected = currentProducts.length > 0 && currentProducts.every((p) => selectedProducts.has(p.id));

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200 dark:border-gray-700">
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={handleSelectAll}
                className="border-gray-300 dark:border-gray-600"
              />
            </TableHead>
            <TableHead className="text-gray-600 dark:text-gray-400">Product Name</TableHead>
            <SortableTableHeader
              field="views"
              label="Views"
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
            <SortableTableHeader
              field="pricing"
              label="Pricing"
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
            <SortableTableHeader
              field="revenue"
              label="Revenue"
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
            <TableHead className="text-gray-600 dark:text-gray-400">Manage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentProducts.map((product) => (
            <TableRow
              key={product.id}
              className="border-gray-200 dark:border-gray-700"
            >
              <TableCell>
                <Checkbox
                  checked={selectedProducts.has(product.id)}
                  onCheckedChange={(checked) =>
                    handleSelectProduct(product.id, checked as boolean)
                  }
                  className="border-gray-300 dark:border-gray-600"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <ImageIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-gray-900 dark:text-white">
                {formatNumber(product.views)}
              </TableCell>
              <TableCell className="text-gray-900 dark:text-white">
                {formatCurrency(product.pricing)}
              </TableCell>
              <TableCell className="text-gray-900 dark:text-white">
                {formatCurrency(product.revenue)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    onClick={() => handleEdit(product.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

