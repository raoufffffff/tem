import data from '../config.json'
const { email, facebook, instgarm, logo, main_color, phone, store_name, tiktok, id } = data
const getTextColorForBackground = (hexColor) => {
    hexColor = hexColor.replace('#', '');
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128 ? '#fff' : '#000';
};

const textColor = getTextColorForBackground(main_color);
export default { email, facebook, instgarm, logo, main_color, phone, store_name, tiktok, id, textColor } 