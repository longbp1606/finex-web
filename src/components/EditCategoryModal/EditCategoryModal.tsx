import React, { useState, useEffect } from "react";
import { Button, Select, Input, Space } from "antd";
import Theme1 from "@/assets/icon3D/theme1.jpg";
import Theme2 from "@/assets/icon3D/theme2.jpg";
import { ReloadOutlined, UploadOutlined } from "@ant-design/icons";
import {
    ModalContainer,
    ThemeContainer,
    ThemeOption,
    ThemeImage,
    AccentColorContainer,
    ColorCircle,
    FooterContainer,
    CustomModal,
    Section,
    ColSection,
    RowSection,
    UploadContainer,
} from "../CategoryModal/CategoryModal.styled";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { CategoryItem } from "@/pages/User/Category/data";

const { Option } = Select;

interface EditCategoryModalProps {
    visible: boolean;
    onClose: () => void;
    onEditCategory: (updatedCategory: CategoryItem) => void;
    category: CategoryItem | null;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ visible, onClose, onEditCategory, category }) => {
    const [selectedTheme, setSelectedTheme] = useState("null");
    const [accentColor, setAccentColor] = useState("#ff9800");
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [totalMoney, setTotalMoney] = useState("");
    const [currencyUnit, setCurrencyUnit] = useState<"USD" | "VND">("USD");

    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<string>(Theme1);

    useEffect(() => {
        if (category) {
            setCategoryName(category.categoryName);
            setDescription(category.description);
            setTotalMoney(category.target.toString());
            setCurrencyUnit(category.currencyUnit);
            setBackgroundImage(category.backgroundImage);
            setAccentColor(category.accentColor);
        }
    }, [category]);

    const handleUpload = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === "done") {
            const url = URL.createObjectURL(info.file.originFileObj as Blob);
            setUploadedImage(url);
            setBackgroundImage(url); // Cập nhật backgroundImage trong state
            setSelectedTheme("custom");
        }
    };

    const handleEditCategory = () => {
        if (!category) return;

        const targetAmount = parseFloat(totalMoney) || 0;
        const updatedCategory: CategoryItem = {
            ...category,
            categoryName,
            description,
            backgroundImage,
            accentColor,
            currencyUnit,
            target: targetAmount,
            balance: category.balance, // Keep the existing balance
        };

        onEditCategory(updatedCategory);
        onClose();
    };

    const themes = [
        { key: "theme1", src: Theme1 },
        { key: "theme2", src: Theme2 },
    ];

    //reset
    const handleReset = () => {
        if (category) {
            setCategoryName(category.categoryName);
            setDescription(category.description);
            setTotalMoney(category.target.toString());
            setCurrencyUnit(category.currencyUnit);
            setBackgroundImage(category.backgroundImage);
            setAccentColor(category.accentColor);
        }
    };

    return (
        <CustomModal open={visible} onCancel={onClose} footer={null} centered>
            <ModalContainer>
                {/* Name Section */}
                <Section>
                    <h4>Category Name</h4>
                    <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Enter category name" />
                </Section>

                {/* Description Section */}
                <Section>
                    <h4>Description</h4>
                    <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
                </Section>

                {/* Unit Section */}
                <Section>
                    <h4>Currency Unit</h4>
                    <p>Select the currency unit for this category</p>
                    <Select value={currencyUnit} onChange={(value) => setCurrencyUnit(value as "USD" | "VND")} style={{ width: "100%" }}>
                        <Option value="USD">USD</Option>
                        <Option value="VND">VND</Option>
                    </Select>
                </Section>

                {/* Total Money Section */}
                <Section>
                    <h4>Total Money</h4>
                    <Input value={totalMoney} onChange={(e) => setTotalMoney(e.target.value)} placeholder="Enter total amount" />
                </Section>

                {/* Background Image */}
                <Section>
                    <h4>Background Image</h4>
                    <p>Choose a theme for the category</p>
                    <ThemeContainer>
                        {themes.map((theme) => (
                            <ThemeOption
                                key={theme.key}
                                selected={backgroundImage === theme.src}
                                onClick={() => {
                                    setBackgroundImage(theme.src);
                                    setUploadedImage(null); // Xóa ảnh upload nếu chọn theme
                                }}
                            >
                                <ThemeImage src={theme.src} alt={theme.key} />
                                {backgroundImage === theme.src}
                            </ThemeOption>
                        ))}

                        {/* Upload custom image */}
                        <UploadContainer
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleUpload}
                        >
                            <ThemeOption
                                selected={!!uploadedImage} // Nếu có ảnh upload thì chọn
                                onClick={() => {
                                    setBackgroundImage(""); // Xóa theme khi chọn ảnh upload
                                    setSelectedTheme("custom");
                                }}
                            >
                                {uploadedImage ? (
                                    <ThemeImage src={uploadedImage} alt="Custom Upload" />
                                ) : (
                                    <UploadOutlined style={{ fontSize: 24, color: "#555" }} />
                                )}
                                {!!uploadedImage}
                            </ThemeOption>
                        </UploadContainer>
                    </ThemeContainer>
                </Section>

                {/* Accent Color */}
                <Section>
                    <RowSection>
                        <ColSection>
                            <h4>Accent Color</h4>
                            <p>Select an accent color</p>
                        </ColSection>
                        <AccentColorContainer>
                            {["#ffffff", "#eaf2e7", "#cfbfe6", "#d1eeff", "#f2ced8"].map((color) => (
                                <ColorCircle
                                    key={color}
                                    color={color}
                                    selected={accentColor === color}
                                    onClick={() => setAccentColor(color)}
                                />
                            ))}
                        </AccentColorContainer>
                    </RowSection>
                </Section>

                {/* Footer Buttons */}
                <FooterContainer>
                    <Button icon={<ReloadOutlined />} onClick={handleReset}>Reset</Button>

                    <Space size="small">
                        <Button onClick={() => {
                            handleReset();
                            onClose();
                        }}>Cancel</Button>
                        <Button type="primary" onClick={handleEditCategory}>Save</Button>
                    </Space>
                </FooterContainer>
            </ModalContainer>
        </CustomModal>
    );
};

export default EditCategoryModal;