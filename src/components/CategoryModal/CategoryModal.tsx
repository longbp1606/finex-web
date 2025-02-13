import React, { useState } from "react";
import { Button, Select, Switch, Input, Space } from "antd";
import { CheckCircleFilled, ReloadOutlined, UploadOutlined } from "@ant-design/icons";
import {
    ModalContainer,
    ThemeContainer,
    ThemeOption,
    ThemeImage,
    AccentColorContainer,
    ColorCircle,
    SetDefaultContainer,
    FooterContainer,
    CustomModal,
    Section,
    ColSection,
    RowSection,
    UploadContainer,
} from "./CategoryModal.styled";

const { Option } = Select;

interface CategoryModalProps {
    visible: boolean;
    onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ visible, onClose }) => {
    const [selectedTheme, setSelectedTheme] = useState("null");
    const [accentColor, setAccentColor] = useState("#ff9800");
    const [isTransparent, setIsTransparent] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [totalMoney, setTotalMoney] = useState("");

    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const handleUpload = (info: any) => {
        const file = info.file.originFileObj;
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                setUploadedImage(reader.result); // Chắc chắn chỉ set khi reader.result là string
                setSelectedTheme("custom");
            }
        };
        reader.readAsDataURL(file);
    };

    //reset
    const handleReset = () => {
        setCategoryName("");
        setDescription("");
        setTotalMoney("");
        setSelectedTheme("");
        setUploadedImage(null);
        setAccentColor("#ff9800");
        setIsTransparent(false);
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
                    <Select defaultValue="USD" style={{ width: "100%" }}>
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
                        {["system", "system1"].map((theme) => (
                            <ThemeOption
                                key={theme}
                                selected={selectedTheme === theme}
                                onClick={() => setSelectedTheme(theme)}
                            >
                                <ThemeImage src={`/assets/${theme}.png`} alt={theme} />
                                {selectedTheme === theme && <CheckCircleFilled />}
                            </ThemeOption>
                        ))}

                        {/* Upload image with the same styling */}
                        <UploadContainer
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleUpload}
                        >
                            <ThemeOption selected={selectedTheme === "custom"}>
                                {uploadedImage ? (
                                    <ThemeImage src={uploadedImage} alt="Custom Upload" />
                                ) : (
                                    <UploadOutlined style={{ fontSize: 24, color: "#555" }} />
                                )}
                                {selectedTheme === "custom" && <CheckCircleFilled />}
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
                            {["#ff9800", "#6200ea", "#ff4081", "#009688"].map((color) => (
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

                {/* Set default */}
                <Section>
                    <SetDefaultContainer>
                        <ColSection>
                            <h4>Set default</h4>
                            <p>description</p>
                        </ColSection>
                        <Switch checked={isTransparent} onChange={setIsTransparent} />
                    </SetDefaultContainer>
                </Section>

                {/* Footer Buttons */}
                <FooterContainer>
                    <Button icon={<ReloadOutlined />} onClick={handleReset}>Reset</Button>

                    <Space size="small">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary">Add</Button>
                    </Space>
                </FooterContainer>
            </ModalContainer>
        </CustomModal>
    );
};

export default CategoryModal;
