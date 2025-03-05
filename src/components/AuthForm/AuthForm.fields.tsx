import { Input } from 'antd';
import { Rule } from 'antd/es/form';
import { NamePath } from 'antd/es/form/interface';
import { EyeOutlinedIcon, EyeInvisibleOutlinedIcon } from './AuthForm.styled';

export type FieldType = {
    key: number;
    label: string;
    name: string;
    dependencies?: NamePath[];
    rules: Rule[];
    children: JSX.Element;
    initialValue?: string;
    halfWidth?: boolean;
};

const validateWhitespace = (_: unknown, value: string) => {
    if (value && value.trim() === '') {
        return Promise.reject('Please enter a valid value');
    }
    return Promise.resolve();
};

export const loginFields: FieldType[] = [
    {
        key: 1,
        label: 'Email',
        name: 'email',
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
        children: <Input placeholder=" " />,
    },
    {
        key: 2,
        label: 'Password',
        name: 'password',
        rules: [
            {
                required: true,
                max: 16,
                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,16}$/,
                message:
                    'Must be 6 to 16 characters, including one number, one uppercase letter, one special letter and one lowercase letter.',
            },
        ],
        children: (
            <Input.Password
                iconRender={(visible) =>
                    visible ? <EyeOutlinedIcon /> : <EyeInvisibleOutlinedIcon />
                }
                placeholder=" "
            />
        ),
    },
];

export const registerFields: FieldType[] = [
    {
        key: 1,
        label: 'First name',
        name: 'fname',
        rules: [
            {
                required: true,
                min: 2,
                max: 50,
                message: 'Please enter your first name between 2 and 50 characters.',
            },
            {
                validator: validateWhitespace,
            },
        ],
        children: <Input placeholder=" " />,
        halfWidth: true,
    },
    {
        key: 2,
        label: 'Last name',
        name: 'lname',
        rules: [
            {
                required: true,
                min: 2,
                max: 50,
                message: 'Please enter your first name between 2 and 50 characters.',
            },
            {
                validator: validateWhitespace,
            },
        ],
        children: <Input placeholder=" " />,
        halfWidth: true,
    },
    {
        key: 3,
        label: 'Email',
        name: 'email',
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
        children: <Input placeholder=" " />,
    },
    {
        key: 4,
        label: 'Phone number',
        name: 'phone',
        rules: [
            {
                required: true,
                pattern: /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/,
                message: 'Please enter correct phone number format.',
            },
        ],
        children: <Input placeholder=" " />,
    },
    {
        key: 5,
        label: 'Password',
        name: 'password',
        rules: [
            {
                required: true,
                max: 16,
                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                message:
                    'Must be 8 to 16 characters, including one number, one uppercase letter, and one lowercase letter.',
            },
        ],
        children: (
            <Input.Password
                iconRender={(visible) =>
                    visible ? <EyeOutlinedIcon /> : <EyeInvisibleOutlinedIcon />
                }
                placeholder=" "
            />
        ),
    },
];