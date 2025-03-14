import { MenuType } from "@/utils/type";
import { Link } from "react-router-dom";
import Webmoney from '@/assets/logo/webmoney.svg';
import WesternUnion from '@/assets/logo/wester-union.png';
import Stripe from '@/assets/logo/stripe.svg';
import Visa from '@/assets/logo/visa.png';
import Paypal from '@/assets/logo/paypal.png';

const createNavbarItem = (key: string, title: string) => ({
    key: key,
    label: (
        <Link to={key}>
            {title}
        </Link>
    )
});

export const navbar: MenuType[] = [
    createNavbarItem('', 'Management'),
    createNavbarItem('', 'Capital'),
    createNavbarItem('', 'Resource'),
    createNavbarItem('', 'About'),
];

export const LogoURLs = [
    Webmoney,
    WesternUnion,
    Stripe,
    Visa,
    Paypal
];

export const FeatureCardContents = [
    {
        title: 'Multilevel Security',
        description: `
            Protect your financial data with features like multi-factor
            authentication and granular employee permissions
        `,
        url: "https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4320.jpg"
    },
    {
        title: 'Trusted experience',
        description: `
            Apply in minutes and receive account approval within hours.
            Then access all the cast management essentials in one digital platform
        `,
        url: "https://img.freepik.com/free-vector/self-promotion-concept-illustration_114360-19321.jpg",
    },
    {
        title: 'Structured outreach',
        description: `
            Finex offers around the clock support answer your most pressing questions
            and propel your business forward
        `,
        url: "https://img.freepik.com/free-vector/manage-money-concept-illustration_114360-8079.jpg",
    }
];

export const FeedbackContents = [
    {
        username: "Emily Johnson",
        career: "Marketing Manager",
        feedback: "FiNex has revolutionized how I manage my finances. The AI recommendations are spot-on!",
        gender: "women",
        id: 32
    },
    {
        username: "Michael Chen",
        career: "Software Engineer",
        feedback: "I love how FiNex automatically categorizes my expenses and provides insights on my spending habits.",
        gender: "men",
        id: 45
    },
    {
        username: "Sarah Williams",
        career: "Small Business Owner",
        feedback: "As someone running a small business, FiNex helps me separate personal and business expenses easily.",
        gender: "women",
        id: 68
    }
];