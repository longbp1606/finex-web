import React, { useEffect, useMemo, useState } from "react";
import { Button, DatePicker, Input, Select, Space, Tag, message } from "antd";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import CTable from "@/components/Table/CTable";
import dayjs, { Dayjs } from "dayjs";
import {
  getAllUserSubscriptions,
  UserSubscriptionResponse,
} from "@/services/adminUserSubscriptionAPI";

const { RangePicker } = DatePicker;

const statusColor = (status: string) => {
  switch ((status || "").toLowerCase()) {
    case "completed":
      return "green";
    case "pending":
      return "gold";
    case "cancelled":
      return "red";
    case "failed":
      return "volcano";
    default:
      return "default";
  }
};

const SubscriptionTransactions: React.FC = () => {
  const [rows, setRows] = useState<UserSubscriptionResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [range, setRange] = useState<[Dayjs, Dayjs] | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getAllUserSubscriptions({ paymentStatus: status });
      setRows(res.data || []);
    } catch (e) {
      message.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return rows.filter((r) => {
      const matchesText =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.accountId.toLowerCase().includes(q) ||
        r.subscription.name.toLowerCase().includes(q);

      const matchesRange = !range
        ? true
        : dayjs(r.purchaseDate).isAfter(range[0].startOf("day")) &&
          dayjs(r.purchaseDate).isBefore(range[1].endOf("day"));

      return matchesText && matchesRange;
    });
  }, [rows, search, range]);

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "id",
      key: "id",
      width: 220,
      ellipsis: true,
    },
    {
      title: "Account ID",
      dataIndex: "accountId",
      key: "accountId",
      width: 220,
      ellipsis: true,
    },
    {
      title: "Subscription",
      key: "subscription",
      render: (_: any, r: UserSubscriptionResponse) => r.subscription.name,
    },
    {
      title: "Amount",
      key: "amount",
      render: (_: any, r: UserSubscriptionResponse) =>
        `${r.subscription.price} ${r.subscription.currencyUnit}`,
    },
    {
      title: "Purchased At",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      render: (d: string) => dayjs(d).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Expiry",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (d: string) => dayjs(d).format("YYYY-MM-DD"),
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (b: boolean) => (
        <Tag color={b ? "green" : "red"}>{b ? "Active" : "Inactive"}</Tag>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (s: string) => <Tag color={statusColor(s)}>{s}</Tag>,
    },
  ];

  return (
    <div>
      <Space
        wrap
        style={{
          marginBottom: 16,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Input
          placeholder="Search id / account / subscription"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 360 }}
        />
        <Space>
          <Select
            allowClear
            placeholder="Payment Status"
            style={{ width: 180 }}
            value={status}
            onChange={setStatus}
            options={[
              { value: "completed", label: "Completed" },
              { value: "pending", label: "Pending" },
              { value: "cancelled", label: "Cancelled" },
              { value: "failed", label: "Failed" },
            ]}
          />
          <RangePicker
            value={range as any}
            onChange={(v) => setRange(v as any)}
          />
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchAll}
            loading={loading}
          >
            Refresh
          </Button>
        </Space>
      </Space>

      <CTable
        columns={columns}
        dataSource={filtered}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default SubscriptionTransactions;
