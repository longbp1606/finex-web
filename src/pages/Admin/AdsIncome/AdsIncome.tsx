import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Row,
  Space,
  Statistic,
  Tag,
  message,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { Line } from "@ant-design/plots";
import {
  getAdsIncome,
  AdsIncomeRecord,
  AdsIncomeSummary,
} from "@/services/adsIncomeAPI";

const sumBy = (
  rows: AdsIncomeRecord[],
  predicate: (r: AdsIncomeRecord) => boolean
) => rows.filter(predicate).reduce((acc, r) => acc + r.amount, 0);

const AdsIncome: React.FC = () => {
  const [rows, setRows] = useState<AdsIncomeRecord[]>([]);
  const [range, setRange] = useState<[Dayjs, Dayjs]>([
    dayjs().subtract(6, "day"),
    dayjs(),
  ]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getAdsIncome({
        from: range[0].toISOString(),
        to: range[1].toISOString(),
      });
      setRows(res.data || []);
    } catch (e) {
      message.error("Failed to load ads income");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range[0], range[1]]);

  const summary: AdsIncomeSummary = useMemo(
    () => ({
      total: sumBy(rows, () => true),
      paid: sumBy(rows, (r) => r.status === "paid"),
      pending: sumBy(rows, (r) => r.status === "pending"),
      failed: sumBy(rows, (r) => r.status === "failed"),
      currency: rows[0]?.currency || "USD",
    }),
    [rows]
  );

  const chartData = useMemo(() => {
    // Aggregate by day
    const map = new Map<string, number>();
    rows.forEach((r) => {
      const key = dayjs(r.date).format("YYYY-MM-DD");
      map.set(key, (map.get(key) || 0) + r.amount);
    });
    return Array.from(map.entries()).map(([date, value]) => ({ date, value }));
  }, [rows]);

  return (
    <div>
      <Space
        style={{
          marginBottom: 16,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <DatePicker.RangePicker
          value={range as any}
          onChange={(v) => v && setRange(v as [Dayjs, Dayjs])}
        />
        <Button icon={<ReloadOutlined />} onClick={fetchAll} loading={loading}>
          Refresh
        </Button>
      </Space>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={6}>
          <Card loading={loading}>
            <Statistic
              title="Total Income"
              value={summary.total}
              prefix={summary.currency + " "}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card loading={loading}>
            <Statistic
              title="Paid"
              value={summary.paid}
              prefix={summary.currency + " "}
              precision={2}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card loading={loading}>
            <Statistic
              title="Pending"
              value={summary.pending}
              prefix={summary.currency + " "}
              precision={2}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card loading={loading}>
            <Statistic
              title="Failed"
              value={summary.failed}
              prefix={summary.currency + " "}
              precision={2}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="Income Trend (daily)"
        style={{ marginBottom: 16 }}
        loading={loading}
      >
        <Line
          data={chartData}
          xField="date"
          yField="value"
          point
          smooth
          color="#1890ff"
        />
      </Card>

      <Card title="Recent Records" loading={loading}>
        <Row gutter={[12, 12]}>
          {rows.map((r) => (
            <Col xs={24} md={12} lg={8} key={r.id}>
              <Card size="small">
                <Space direction="vertical" size={4}>
                  <div>
                    <strong>{r.source}</strong>
                  </div>
                  <div>{dayjs(r.date).format("YYYY-MM-DD HH:mm")}</div>
                  <div>
                    <Tag
                      color={
                        r.status === "paid"
                          ? "green"
                          : r.status === "pending"
                          ? "gold"
                          : "volcano"
                      }
                    >
                      {r.status}
                    </Tag>
                    <span style={{ marginLeft: 8 }}>
                      {r.currency} {r.amount.toFixed(2)}
                    </span>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default AdsIncome;
