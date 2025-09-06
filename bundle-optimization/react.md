React Bundle Optimization Checklist

React (وب)

1. Code Splitting

// مثال: بارگذاری یک کامپوننت فقط هنگام نیاز

```tsx
const LazyComponent = React.lazy(() => import("./MyComponent"));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
}
```

توضیح:
Code Splitting باعث می‌شود بخش‌های مختلف اپلیکیشن فقط زمانی لود شوند که کاربر به آن‌ها نیاز دارد، کاهش حجم اولیه باندل و افزایش سرعت بارگذاری.

2. Tree Shaking

// مثال: import فقط چیزی که نیاز دارید

```tsx
import { Button } from "ui-library"; // فقط Button اضافه می‌شود، نه کل کتابخانه
```

توضیح:
Tree Shaking کمک می‌کند تا کدهای بلااستفاده از باندل حذف شوند و حجم فایل نهایی کاهش یابد.

3.Dynamic Imports

```tsx
const loadLib = async () => {
  const { libraryFunction } = await import("some-large-library");
  libraryFunction();
};
```

4.Lazy Loading تصاویر

```tsx
<img src="large-image.jpg" alt="Example" loading="lazy" />
```

باعث کاهش مصرف پهنای باند و سرعت لود اولیه می‌شود.

# نکات تکمیلی

فعال کردن React.memo برای جلوگیری از رندرهای غیرضروری

استفاده از useCallback و useMemo برای بهینه‌سازی عملکرد

استفاده از PWA و service workers برای caching
