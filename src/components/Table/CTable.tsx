import { useState } from "react";
import { Table, Pagination } from "antd";
import type { TableProps, TableColumnsType, PaginationProps } from "antd";

interface MyTableProps<T> extends TableProps<T> {
  columns: TableColumnsType<T>;
  dataSource: T[];
  className?: TableProps<T>["className"];
  rowClassName?: (record: T, index: number) => string;
  components?: TableProps<T>["components"];
  onRowDoubleClick?: (record: T) => void;
  rowKey?: string | ((record: T) => string);
  pageSize?: number; // Số dòng trên mỗi trang
}

const CTable = <T extends object>({
  columns,
  dataSource,
  rowClassName,
  className,
  onRow,
  components,
  rowKey,
  onRowDoubleClick,
  pageSize = 10, // Mặc định 10 dòng mỗi trang
  ...restProps
}: MyTableProps<T>) => {

  // State để quản lý trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // Tính dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = dataSource.slice(startIndex, endIndex);

  const handlePageChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="tableHT">
      <Table<T>
        className={className}
        columns={columns}
        dataSource={currentData} // Chỉ hiển thị dữ liệu của trang hiện tại
        rowClassName={rowClassName}
        onRow={(record) => ({
          onDoubleClick: () => onRowDoubleClick?.(record),
          ...onRow?.(record),
        })}
        scroll={{ x: "max-content" }} // Cuộn ngang nếu cột quá dài
        components={components}
        rowKey={rowKey}
        pagination={false} // Tắt phân trang mặc định của Antd
        {...restProps}
      />
      
      {/* Phân trang */}
      <div
        className="table-pagination"
        style={{ display: "flex", justifyContent: "space-between", paddingTop: "12px" }}
      >
        <span>
          {"Showing"} {startIndex + 1} - {Math.min(endIndex, dataSource.length)} {"of"} {dataSource.length}
        </span>
        <Pagination
          current={currentPage}
          total={dataSource.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false} // Tắt thay đổi số dòng/trang
        />
      </div>
    </div>
  );
};

export default CTable;
