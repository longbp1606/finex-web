/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Switch, Input, Space, Form } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import {
    ModalContainer,
    AccentColorContainer,
    ColorCircle,
    SetDefaultContainer,
    FooterContainer,
    CustomModal,
    Section,
    ColSection,
} from "./BudgetModal.styled";
import { createBoard, dtoCreateBoard } from "@/services/boardAPI";
import { toast } from "react-toastify";

interface BudgetModalProps {
    visible: boolean;
    // onSubmit: () => void; // Prop mới
    onClose: () => void;
}

const BudgetModal: React.FC<BudgetModalProps> = ({ visible, onClose }) => {
    const [category, setCategory] = useState<{
        title: string;
        date: string;
        tags: string[];
        target: string;
    }>({
        title: "",
        date: new Date().toISOString().split("T")[0],
        tags: [],
        target: "",
    });
    // const [selectedTheme, setSelectedTheme] = useState("null");
    const [accentColor, setAccentColor] = useState("#ff9800");
    const [isTransparent, setIsTransparent] = useState(false);
    const [form] = Form.useForm();
  const [board, setBoard] = useState<any>({});

    // const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const handleSubmit = (values: dtoCreateBoard) => {
        const newData = { ...values };
        setBoard(newData);
        handleAddBudget();
        // onSubmit(); 
      };

        const handleAddBudget = async () => {
          try {
            await createBoard(board);
            toast.success("Budget added successfully!");
            // setAddModalVisible(false);
          } catch (error: any) {
            toast.error("Failed to add budget", error.response?.data.message);
          }
        };

    const handleReset = () => {
        setCategory({
            title: "",
            date: new Date().toISOString().split("T")[0],
            tags: [],
            target: "",
        });
        // setUploadedImage(null);
        setAccentColor("#ff9800");
        setIsTransparent(false);
    };

    return (
        <CustomModal open={visible} onCancel={onClose} footer={null} centered title="Add New Budget">
            <ModalContainer>
                <Form form={form} onFinish={handleSubmit}>
                <Section>
                    <h4>Category Name</h4>
                    <Form.Item name="title">
                    <Input value={category.title} onChange={(e) => setCategory({ ...category, title: e.target.value })} placeholder="Enter category name" />
                    </Form.Item>
                </Section>

                <Section>
                    <h4>Date</h4>
                    <Input value={category.date} disabled />
                </Section>

                <Section>
                    <h4>Tags</h4>
                    <Input placeholder="Enter tags separated by commas" onChange={(e) => setCategory({ ...category, tags: e.target.value.split(",") })} />
                </Section>

                <Section>
                    <h4>Total Money</h4>
                    <Input value={category.target} onChange={(e) => setCategory({ ...category, target: e.target.value })} placeholder="Enter total amount" />
                </Section>

                <Section>
                    <h4>Accent Color</h4>
                    <AccentColorContainer>
                        {["#ff9800", "#6200ea", "#ff4081", "#009688"].map((color) => (
                            <ColorCircle key={color} color={color} selected={accentColor === color} onClick={() => setAccentColor(color)} />
                        ))}
                    </AccentColorContainer>
                </Section>

                <Section>
                    <SetDefaultContainer>
                        <ColSection>
                            <h4>Set default</h4>
                            <p>description</p>
                        </ColSection>
                        <Switch checked={isTransparent} onChange={setIsTransparent} />
                    </SetDefaultContainer>
                </Section>

                <FooterContainer>
                    <Button icon={<ReloadOutlined />} onClick={handleReset}>Reset</Button>
                    <Space size="small">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary">Add</Button>
                    </Space>
                </FooterContainer>
                </Form>
            </ModalContainer>

        </CustomModal>
    );
};

export default BudgetModal;
