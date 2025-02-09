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
        `
    },
    {
        title: 'Trusted experience',
        description: `
            Apply in minutes and receive account approval within hours.
            Then access all the cast management essentials in one digital platform
        `
    },
    {
        title: 'Structured outreach',
        description: `
            Finex offers around the clock support answer your most pressing questions
            and propel your business forward
        `
    }
];