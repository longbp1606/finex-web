import { createAccount, getAccounts } from "@/services/accountAPI";
import { AccountRoleEnum } from "@/utils/enum";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, message, Modal, Segmented, Select, Table, TableColumnsType, Tag } from "antd";
import { Rule } from "antd/es/form";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

interface Account {
    email: string;
    password: string;
    fname: string;
    lname: string;
    phone: string;
    avt?: string;
    role: number;
}

type CreateAccountFieldType = {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    rules: Rule[];
    halfWidth?: boolean;
}

const Account = () => {
    const [form] = Form.useForm();
    const [accountData, setAccountData] = useState<Account[]>();
    const [roleFilter, setRoleFilter] = useState<number>(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const fetchAccountList = async () => {
        try {
            const response = await getAccounts();
            const filterAccount = response.data.data?.filter((account: Account) => {
                if (roleFilter === -1) return true;
                return account.role === roleFilter;
            });
            setAccountData(filterAccount);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (values: any) => {
        setIsLoading(true);
        try {
            const response = await createAccount(values);
            if (response.status === 201) {
                messageApi.success({
                    type: "success",
                    content: response.data.message,
                });
                setIsModalOpen(false);
                setIsLoading(false);
                fetchAccountList();
            }
        } catch (error: any) {
            messageApi.error({
                type: "error",
                content: error.response.data.message || "Server error",
            });
        }
    };

    useEffect(() => {
        fetchAccountList();
    }, [roleFilter]);

    const columnDef: TableColumnsType<Account> = [
        { title: "ID", dataIndex: "_id", key: "id" },
        { title: "First Name", dataIndex: "fname", key: "fname" },
        { title: "Last Name", dataIndex: "lname", key: "lname" },
        {
            title: "Email", dataIndex: "email", key: "email",
            render: (email: string) => String(email.slice(0, 3) + "**********@" + email.split("@")[1])
        },
        { title: "Phone", dataIndex: "phone", key: "phone" },
        {
            title: "Role", dataIndex: "role", key: "avt",
            render: (role: number) => <Tag color={role === 0 ? "green" : "red"}>{role === 0 ? "Customer" : "Admin"}</Tag>
        },
    ];

    const createAccountField: CreateAccountFieldType[] = [
        {
            label: "First Name",
            name: "fname",
            type: "text",
            placeholder: "Enter your first name",
            rules: [{ required: true, message: "Please enter your first name" }],
        },
        {
            label: "Last Name",
            name: "lname",
            type: "text",
            placeholder: "Enter your last name",
            rules: [{ required: true, message: "Please enter your last name" }],
        },
        {
            label: "Phone",
            name: "phone",
            type: "text",
            placeholder: "Enter your phone",
            rules: [
                {
                    pattern: /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/,
                    message: 'Please enter correct phone number format.',
                },
            ],
        },
        {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            rules: [
                {
                    required: true,
                    type: 'email',
                    message: 'Please enter correct email format.',
                },
                {
                    max: 50,
                    message: 'Email must not exceed 50 characters.',
                },
            ],
        },
        {
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "Enter your password",
            rules: [
                {
                    required: true,
                    max: 16,
                    pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                    message:
                        'Must be 8 to 16 characters, including one number, one uppercase letter, and one lowercase letter.',
                },
            ],
        }
    ]

    return (
        <>
            {contextHolder}
            <Flex gap={20} vertical>
                <Flex justify="space-between">
                    <Segmented
                        options={[
                            { label: "All", value: -1 },
                            { label: "Customer", value: 0 },
                            { label: "Admin", value: 1 },
                        ]}
                        defaultValue={roleFilter}
                        onChange={(value: number) => setRoleFilter(value)}
                        width={"100%"}
                    />

                    <Button type="primary" onClick={() => setIsModalOpen(true)}>
                        <FaPlus />
                        Add user
                    </Button>
                </Flex>

                <Table columns={columnDef} dataSource={accountData} />
            </Flex>
            <Modal
                title="Add user"
                open={isModalOpen}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    onFinish={handleSubmit}
                >
                    {createAccountField.map((field: CreateAccountFieldType) => (
                        <Form.Item
                            label={field.label}
                            name={field.name}
                            key={field.name}
                            rules={field.rules}
                        >
                            <Input type={field.type} placeholder={field.placeholder} />
                        </Form.Item>
                    ))}
                    <Form.Item label="Role" name="role">
                        <Select
                            options={[
                                { value: AccountRoleEnum.USER, label: "Customer" },
                                { value: AccountRoleEnum.ADMIN, label: "Admin" },
                            ]}
                            defaultValue={0}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Flex justify="end" gap={20}>
                            <Button type="default" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit">
                                {isLoading ? <Loading3QuartersOutlined /> : "Add user"}
                            </Button>
                        </Flex>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default Account;
