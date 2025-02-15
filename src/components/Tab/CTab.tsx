import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

interface CTabsProps extends TabsProps {
  activeColor?: string; // Màu sắc của tab active
}

const CTabs: React.FC<CTabsProps> = ({ items, ...props }) => {
  // Kiểm tra nếu `items` có dữ liệu
  const updatedItems = items?.map((tab) => {
    let rowCount = 0;

    // Kiểm tra nếu `children` là một React element và có `props`
    if (React.isValidElement(tab.children)) {
      const tableData = tab.children.props?.dataSource;
      if (Array.isArray(tableData)) {
        rowCount = tableData.length;
      }
    }

    return {
      ...tab,
      label: `${tab.label} (${rowCount})`, // Gán số hàng vào tiêu đề tab
    };
  });

  return <Tabs {...props} className="custom-tabs" items={updatedItems} />;
};

export default CTabs;
