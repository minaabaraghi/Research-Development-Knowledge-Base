# Responsive Typography (Web)

این پوشه شامل یک نمونه **سیستم Typography واکنش‌گرا** با CSS است که روی موبایل، تبلت و دسکتاپ مقیاس‌بندی می‌شود.

---

## نحوه کار

1. **Base root font-size**  
   در `:root` اندازه پایه فونت و مقیاس (`--font-scale`) تعریف می‌شود:

```css
:root {
  --base-font-size: 16px; /* 1rem = 16px */
  --font-scale: 1;
}
```
