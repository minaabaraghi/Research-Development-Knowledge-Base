## React Native Bundle Optimization Checklist

React Native (موبایل)

1. Hermes Engine

// فعال کردن Hermes در android/app/build.gradle
project.ext.react = [
enableHermes: true, // <-- این خط را فعال کنید
]

توضیح:
Hermes یک موتور جاوااسکریپت سریع است که حجم باندل و زمان اجرای اپ را کاهش می‌دهد.

2. RAM Bundles

// فعال کردن RAM bundles در Metro bundler (metro.config.js)
module.exports = {
transformer: {
ramBundle: true,
},
};

3.حذف کتابخانه‌های بلااستفاده

جایگزین کردن کتابخانه‌های بزرگ با نسخه‌های سبک‌تر.

مثال: استفاده از react-native-vector-icons/MaterialIcons به جای کل پکیج.
