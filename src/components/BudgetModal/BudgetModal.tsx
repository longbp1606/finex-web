// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
// import { Button, Input, Space, Form, Radio, Select } from "antd";
// import { ReloadOutlined } from "@ant-design/icons";
// import {
//     ModalContainer,
//     FooterContainer,
//     CustomModal,
//     Section,
//     CurrencyGroup,
// } from "./BudgetModal.styled";
// import { createBoard, dtoGetBoard, getBoard, updateBoard } from "@/services/boardAPI";
// import { toast } from "react-toastify";

// interface BudgetModalProps {
//     id: string;
//     visible: boolean;
//     onClose: () => void;
//     fetchBudgets: () => void;
// }

// const BudgetModal: React.FC<BudgetModalProps> = ({ id, visible, onClose }) => {
//     const [form] = Form.useForm();
//     // const [budget, setBudget] = useState<dtoGetBoard | null>(null);
//     const [position, setPosition] = useState<'USD' | 'VND'>('VND');

//     const handleSubmit = async (values: any) => {
//         try {
//             // Cập nhật giá trị currencyUnit theo position trước khi submit
//             const finalValues = { ...values, currencyUnit: position };
//             console.log("Submitted values:", finalValues);

//             // Gọi API getBoard() để lấy danh sách tất cả các budget
//             const response = await getBoard();
//             const allBudgets = response.data;
//             console.log("All budgets:", allBudgets);
//             console.log("board ID:", id);


//             // Kiểm tra xem ID có trong danh sách không
//             const existingBudget = allBudgets.find((item: dtoGetBoard) => item.id === id);
//             form.setFieldsValue({
//                 title: existingBudget.title,
//                 language: existingBudget.language,
//                 currencyUnit: existingBudget.currencyUnit,
//             });

//             if (id) {
//                 await updateBoard(id, finalValues);
//                 toast.success("Budget updated successfully!");
//             } else {
//                 await createBoard(finalValues);
//                 toast.success("Budget added successfully!");
//             }

//             onClose();
//         } catch (error: any) {
//             toast.error(error.response?.data?.message || "Failed to save budget.");
//         }
//     };

//     const handleReset = () => {
//         form.resetFields();
//     };

//     return (
//         <CustomModal open={visible} onCancel={onClose} footer={null} centered title="Add New Budget">
//             <ModalContainer>
//                 <Form form={form} onFinish={handleSubmit} initialValues={{
//                     title: "",
//                     currencyUnit: "",
//                     language: "",
//                 }}>
//                     <Section>
//                         <h4>Category Name</h4>
//                         <Form.Item name="title" rules={[{ required: true, message: "Please enter category name" }]}>
//                             <Input placeholder="Enter category name" />
//                         </Form.Item>
//                     </Section>

//                     <Section>
//                         <h4>Currency Unit</h4>
//                         <Form.Item name="currencyUnit">
//                             <CurrencyGroup>
//                                 {/* <CurrencyButton>
//                                 VND
//                             </CurrencyButton> */}
//                                 <Radio.Group
//                                     value={position}
//                                     onChange={(e) => setPosition(e.target.value)}
//                                     style={{ width: "100%" }}
//                                 >
//                                     <Radio.Button value="USD" style={{ fontSize: "15px", fontWeight: 600, width: "50%" }}>
//                                         USD
//                                     </Radio.Button>
//                                     <Radio.Button value="VND" style={{ fontSize: "15px", fontWeight: 600, width: "50%" }}>
//                                         VND
//                                     </Radio.Button>
//                                 </Radio.Group>

//                             </CurrencyGroup>

//                         </Form.Item>
//                     </Section>

//                     <Section>
//                         <h4>Language</h4>
//                         <Form.Item name="language">
//                             <Select placeholder="Enter language you want to write"
//                                 options={[
//                                     { value: "vi", label: "Vietnamese" },
//                                     { value: "eng", label: "English" }
//                                 ]} />
//                         </Form.Item>
//                     </Section>

//                     <FooterContainer>
//                         <Button icon={<ReloadOutlined />} onClick={handleReset}>Reset</Button>
//                         <Space size="small">
//                             <Button onClick={onClose}>Cancel</Button>
//                             <Button type="primary" htmlType="submit">Add</Button>
//                         </Space>
//                     </FooterContainer>
//                 </Form>
//             </ModalContainer>
//         </CustomModal>
//     );
// };

// export default BudgetModal;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Input, Space, Form, Radio, Select } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import {
    ModalContainer,
    FooterContainer,
    CustomModal,
    Section,
    CurrencyGroup,
} from "./BudgetModal.styled";
import { createBoard, getBoard, updateBoard, dtoGetBoard } from "@/services/boardAPI";
import { toast } from "react-toastify";

interface BudgetModalProps {
    id?: string; // ID có thể undefined khi tạo mới
    visible: boolean;
    onClose: () => void;
    fetchBudgets: () => void;
}

const BudgetModal: React.FC<BudgetModalProps> = ({ id, visible, onClose }) => {
    const [form] = Form.useForm();
    const [position, setPosition] = useState<'USD' | 'VND'>('VND');
    console.log("id", id);

    // Fetch dữ liệu nếu có ID
    useEffect(() => {
        if (id) {
            const fetchBudget = async () => {
                try {
                    const response = await getBoard();
                    const allBudgets = response.data.data;
                    const existingBudget = allBudgets.find((item: dtoGetBoard) => item.id === id);

                    if (existingBudget) {
                        form.setFieldsValue({
                            title: existingBudget.title,
                            currencyUnit: existingBudget.currencyUnit,
                            language: existingBudget.language,
                        });
                        setPosition(existingBudget.currencyUnit);
                    }
                } catch (error) {
                    console.error("Failed to fetch budget data:", error);
                }
            };
            fetchBudget();
        } else {
            form.resetFields(); // Reset form khi không có ID (tạo mới)
        }
    }, [id, form]);

    const handleSubmit = async (values: any) => {
        try {
            const finalValues = { ...values, currencyUnit: position };

            if (id) {
                await updateBoard(id, finalValues);
                toast.success("Budget updated successfully!");
            } else {
                await createBoard(finalValues);
                toast.success("Budget added successfully!");
            }

            onClose();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to save budget.");
        }
    };

    const handleReset = () => {
        form.resetFields();
        setPosition("VND"); // Reset lại currency unit
    };

    return (
        <CustomModal open={visible} onCancel={onClose} footer={null} centered title={id ? "Edit Budget" : "Add New Budget"}>
            <ModalContainer>
                <Form 
                    form={form} 
                    onFinish={handleSubmit} 
                    initialValues={{
                        title: "",
                        date: new Date().toISOString().split("T")[0],
                        tags: "",
                        target: "",
                        currencyUnit: "VND",
                    }}
                >
                    <Section>
                        <h4>Category Name</h4>
                        <Form.Item 
                            name="title" 
                            rules={[{ required: true, message: "Please enter category name" }]}
                        >
                            <Input placeholder="Enter category name" />
                        </Form.Item>
                    </Section>

                    <Section>
                        <h4>Currency Unit</h4>
                        <Form.Item name="currencyUnit">
                            <CurrencyGroup>
                                <Radio.Group
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    style={{ width: "100%" }}
                                >
                                    <Radio.Button value="USD" style={{ fontSize: "15px", fontWeight: 600, width: "50%" }}>
                                        USD
                                    </Radio.Button>
                                    <Radio.Button value="VND" style={{ fontSize: "15px", fontWeight: 600, width: "50%" }}>
                                        VND
                                    </Radio.Button>
                                </Radio.Group>
                            </CurrencyGroup>
                        </Form.Item>
                    </Section>

                    <Section>
                        <h4>Language</h4>
                        <Form.Item name="language">
                            <Select 
                                placeholder="Enter language you want to write"
                                options={[
                                    { value: "vi", label: "Vietnamese" },
                                    { value: "eng", label: "English" }
                                ]} />
                        </Form.Item>
                    </Section>

                    <FooterContainer>
                        <Button icon={<ReloadOutlined />} onClick={handleReset}>Reset</Button>
                        <Space size="small">
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="primary" htmlType="submit">{id ? "Update" : "Add"}</Button>
                        </Space>
                    </FooterContainer>
                </Form>
            </ModalContainer>
        </CustomModal>
    );
};

export default BudgetModal;

