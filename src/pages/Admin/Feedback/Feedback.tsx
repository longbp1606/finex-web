import React, { useEffect, useMemo, useState } from "react";
import { Button, Input, List, Modal, Space, Tag, message } from "antd";
import {
  CommentOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import CTable from "@/components/Table/CTable";
import {
  FeedbackResponseItem,
  listFeedbacks,
  replyFeedback,
} from "@/services/feedbackAPI";

const statusColors: Record<string, string> = {
  Open: "green",
  "In Progress": "gold",
  Resolved: "blue",
  Closed: "default",
};

const AdminFeedback: React.FC = () => {
  const [data, setData] = useState<FeedbackResponseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [replyModal, setReplyModal] = useState<{ open: boolean; id?: string }>({
    open: false,
  });
  const [replyText, setReplyText] = useState("");

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await listFeedbacks({});
      setData(res.data || []);
    } catch (e) {
      message.error("Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return data;
    return data.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.content.toLowerCase().includes(q) ||
        (f.userName || "").toLowerCase().includes(q) ||
        (f.type || "").toLowerCase().includes(q)
    );
  }, [data, search]);

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "User", dataIndex: "userName", key: "userName", width: 180 },
    { title: "Type", dataIndex: "type", key: "type", width: 160 },
    {
      title: "Rating",
      key: "rating",
      width: 120,
      render: (_: any, r: FeedbackResponseItem) => `${r.rating}/5`,
    },
    {
      title: "Status",
      key: "status",
      width: 140,
      render: (_: any, r: FeedbackResponseItem) => (
        <Tag color={statusColors[r.status] || "default"}>{r.status}</Tag>
      ),
    },
    {
      title: "Created",
      key: "created",
      width: 200,
      render: (_: any, r: FeedbackResponseItem) =>
        new Date(r.createdAt).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      width: 160,
      render: (_: any, r: FeedbackResponseItem) => (
        <Space>
          <Button
            size="small"
            icon={<CommentOutlined />}
            onClick={() => setReplyModal({ open: true, id: r.id })}
          >
            Reply
          </Button>
        </Space>
      ),
    },
  ];

  const handleReply = async () => {
    const id = replyModal.id;
    if (!id || !replyText.trim()) return;
    setLoading(true);
    try {
      await replyFeedback(id, { content: replyText.trim() });
      message.success("Reply sent");
      setReplyModal({ open: false });
      setReplyText("");
      fetchAll();
    } catch (e) {
      message.error("Failed to send reply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 16,
          justifyContent: "space-between",
        }}
      >
        <Input
          placeholder="Search by title, content, user, type"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 420 }}
        />
        <Button icon={<ReloadOutlined />} onClick={fetchAll} loading={loading}>
          Refresh
        </Button>
      </div>

      <CTable
        columns={columns}
        dataSource={filtered}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title="Reply to feedback"
        open={replyModal.open}
        onCancel={() => setReplyModal({ open: false })}
        onOk={handleReply}
        okButtonProps={{ disabled: !replyText.trim(), loading }}
      >
        <Input.TextArea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          rows={4}
          placeholder="Write your reply..."
        />
        {/* Optional: show existing replies */}
        {replyModal.id && (
          <div style={{ marginTop: 16 }}>
            <strong>Recent replies</strong>
            <List
              size="small"
              dataSource={
                data.find((d) => d.id === replyModal.id)?.replies || []
              }
              renderItem={(it) => (
                <List.Item>
                  <Space direction="vertical" size={0}>
                    <span>
                      {it.userName}{" "}
                      {it.isAdmin && <Tag color="blue">Staff</Tag>}
                    </span>
                    <span style={{ color: "#666" }}>
                      {new Date(it.createdAt).toLocaleString()}
                    </span>
                    <span>{it.content}</span>
                  </Space>
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminFeedback;
