// src/theme/typography.ts
// import {Dimensions, PixelRatio, TextStyle} from 'react-native';

// عرض مرجع برای مقیاس‌دهی (iPhone 11)
// const {width: SCREEN_WIDTH} = Dimensions.get('window');
// const guidelineBaseWidth = 375;

// تابع حرفه‌ای برای scale فونت
// export const scaleFont = (size: number) => {
//   const scale = SCREEN_WIDTH / guidelineBaseWidth;
//   const newSize = size * scale;
//   return Math.round(PixelRatio.roundToNearestPixel(newSize));
// };

// تایپ برای هر style
// type TypographyStyle = TextStyle;

// فونت‌های اصلی پروژه با scale حرفه‌ای
// export const typography: Record<string, TypographyStyle> = {
//   h1: {fontSize: scaleFont(32), fontWeight: '700' as TextStyle['fontWeight']},
//   h2: {fontSize: scaleFont(24), fontWeight: '600' as TextStyle['fontWeight']},
//   h3: {fontSize: scaleFont(20), fontWeight: '500' as TextStyle['fontWeight']},
//   body: {fontSize: scaleFont(16), fontWeight: '400' as TextStyle['fontWeight']},
//   small: {
//     fontSize: scaleFont(12),
//     fontWeight: '400' as TextStyle['fontWeight'],
//   },
// };

// گزینه‌ی اضافه: امکان Theme-Driven
// export const typographyTheme = (
//   fontScale = 1,
// ): Record<string, TypographyStyle> => ({
//   h1: {
//     fontSize: scaleFont(32) * fontScale,
//     fontWeight: '700' as TextStyle['fontWeight'],
//   },
//   h2: {
//     fontSize: scaleFont(24) * fontScale,
//     fontWeight: '600' as TextStyle['fontWeight'],
//   },
//   h3: {
//     fontSize: scaleFont(20) * fontScale,
//     fontWeight: '500' as TextStyle['fontWeight'],
//   },
//   body: {
//     fontSize: scaleFont(16) * fontScale,
//     fontWeight: '400' as TextStyle['fontWeight'],
//   },
//   small: {
//     fontSize: scaleFont(12) * fontScale,
//     fontWeight: '400' as TextStyle['fontWeight'],
//   },
// });
