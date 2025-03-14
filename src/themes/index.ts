const PRIMARY_COLOR: string = '#18453E';
const SECONDARY_COLOR: string = '#BCF49D';
const TERTIARY_COLOR: string = '#C3CFC4';
const QUATERNARY_COLOR: string = '#E3F3DA';
const QUINARY_COLOR: string = '#FAFAFB';
const SENARY_COLOR: string = '#F2F4F2';

//Note:
// #A8B2A8 (Đậm hơn #C3CFC4)
// #B0D1A2 (Đậm hơn #E3F3DA)
// #D0D4D0 (Đậm hơn #F2F4F2)
// #E0E1E5 (Đậm hơn #FAFAFB)
// #8D9A8D (Thay thế #C3CFC4)
// #94B57F (Thay thế #E3F3DA)
// #ACB0AC (Thay thế #F2F4F2)
// #C8C9CC (Thay thế #FAFAFB)
// #206156 (Nhạt hơn một chút)
// #2A776A (Nhạt hơn nữa)
// #3B8D80 (Màu trung gian, dễ nhìn)
// #5CA89B (Nhẹ nhàng hơn)
// #7EC3B5 (Rất nhạt, gần pastel)

export const theme = {
    light: '',
    dark: '',
    color: {
        primary: PRIMARY_COLOR,
        secondary: SECONDARY_COLOR,
        tertiary: TERTIARY_COLOR,
        quaternary: QUATERNARY_COLOR,
        quinary : QUINARY_COLOR,
        senary : SENARY_COLOR,
        facebook: '#1877F2',
        info: '#1677FF',
        warning: '#FAAD14',
        success: '#52C41A',
        error: '#FF0000',
        grey: '#CCC',
        yellow: '#FFCE3D',
        blue: '#1a73e8',
        border: '#BFBFBF',
        textPrimary: 'rgba(0, 0, 0, 0.85)',
        textSecondary: 'rgba(0, 0, 0, 0.45)',
        textTertiary: '#BCBCBC',
        textQuaternary: '#566363',
        disabledPlaceholder: 'rgba(0, 0, 0, 0.25)',
        divider: 'rgba(5, 5, 5, 0.06)',
        hoverPrimary: 'rgba(240,81,35,.1)',
        hoverSecondary: '#F1F1F1',
        white: '#FFF',
        black: '#000',
        shadowForm: 'rgb(34 41 47 / 10%)',
        shadowCart: 'rgba(56, 56, 56, 0.06)',
        shadowDropdown: 'rgba(0, 0, 0, 0.02)',
        shadowCartHover: 'rgba(56, 56, 56, 0.07)',
        shadowPurchased: 'rgba(51, 56, 56, 0.06)',
        shadowPurchasedHover: 'rgba(51, 56, 56, 0.07)',
        shadowButton: 'rgba(0, 0, 0, 0.04)',
        overlayImage: 'rgba(106, 111, 119, 0.1)',
        borderDefault: '#E5E5E5',
        borderInput: '#D9D9D9',
        starIcon: '#FADB14',
        descTabBorder: '#F0F0F0',
        done: '#1BC47D',
        doneBackground: '#A6E8CC',
        processing: '#FFC700',
        processingBackground: '#FFE99B',
        incoming: '#FF9500',
        incomingBackground: '#FFD59B',
        cancel: '#FF2942',
        cancelBackground: '#FFABB5',
        pending: '#BFBFBF',
        pendingBackground: '#E6E6E6',
        borderSchedule: '#EBEBEB',
        toolbarBg: '#F5F5F5',
        adminBackground: '#f8f9fa',
    },
    transition: {
        primary: 'all 0.25s linear',
    }
}

export const AntdThemeConfig = {
    token: {
        colorPrimary: PRIMARY_COLOR,
        colorSecondary: SECONDARY_COLOR,
        colorLink: PRIMARY_COLOR,
        colorLinkHover: PRIMARY_COLOR,
        colorText: PRIMARY_COLOR,
    },
    components: {
        Menu: {
            itemColor: PRIMARY_COLOR,
            itemSelectedBg: PRIMARY_COLOR,
            itemSelectedColor: SECONDARY_COLOR,
        },
    },
};