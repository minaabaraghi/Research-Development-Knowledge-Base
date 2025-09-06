# Root/Jailbreak Detection — React Native (TypeScript + JailMonkey)

## پیش‌نیازها

- React Native 0.71+ (ترجیحاً جدیدتر)
- Xcode (برای iOS) و Android Studio + SDK
- Node 18+ و yarn/npm

---

## گام 1) نصب پکیج‌ها

```bash
npm install jail-monkey
# یا
# yarn add jail-monkey

cd ios && pod install && cd ..
```

---

## گام 2) ساختار فایل‌ها

```
project/
└── src/
    └── security/
        └── RootCheck.ts        # کد TypeScript برای تشخیص Root/Jailbreak
└── App.tsx                      # نمونه استفاده
```

---

## گام 3) پیاده‌سازی RootCheck.ts

```ts
// src/security/RootCheck.ts
import JailMonkey from "jail-monkey";

export type RootCheckResult = {
  rooted: boolean;
  reasons: string[];
};

export function detectRoot(): RootCheckResult {
  const reasons: string[] = [];

  if (JailMonkey.isJailBroken()) reasons.push("Device is Jailbroken / Rooted");
  if (JailMonkey.hookDetected()) reasons.push("Hook framework detected");
  if (JailMonkey.trustFall())
    reasons.push("TrustFall indicates compromised device");

  return {
    rooted: reasons.length > 0,
    reasons,
  };
}
```

---

## گام 4) نمونه استفاده در App.tsx

```tsx
// App.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Alert, Button } from "react-native";
import { detectRoot, RootCheckResult } from "./src/security/RootCheck";

export default function App() {
  const [result, setResult] = useState<RootCheckResult | null>(null);
  const [paymentEnabled, setPaymentEnabled] = useState(true);

  useEffect(() => {
    const res = detectRoot();
    setResult(res);

    if (res.rooted) {
      Alert.alert(
        "هشدار امنیتی",
        "دستگاه شما روت یا جیلبریک شده و استفاده از بخش‌های حساس محدود می‌شود."
      );

      setPaymentEnabled(false);
    }
  }, []);

  if (!result) return <Text>Checking device...</Text>;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Rooted? {result.rooted ? "YES" : "NO"}</Text>
      {result.reasons.map((r, i) => (
        <Text key={i}>- {r}</Text>
      ))}

      <View style={{ marginTop: 20 }}>
        <Button
          title="پرداخت"
          onPress={() => Alert.alert("پرداخت انجام شد!")}
          disabled={!paymentEnabled}
        />
        {!paymentEnabled && (
          <Text style={{ marginTop: 10, color: "red" }}>
            بخش پرداخت غیرفعال شد به دلیل Root/Jailbreak
          </Text>
        )}
      </View>
    </View>
  );
}
```

---

## استفاده در کانتکست مرکزی

```tsx
// src/context/RootContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { detectRoot, RootCheckResult } from "../security/RootCheck";

type RootContextType = {
  result: RootCheckResult | null;
};

export const RootContext = createContext<RootContextType>({ result: null });

export const RootProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState<RootCheckResult | null>(null);

  useEffect(() => {
    const res = detectRoot();
    setResult(res);

    if (res.rooted) {
      // هشدار یک بار در کل اپ
      alert("دستگاه شما روت/جیلبریک شده است.");
    }
  }, []);

  return (
    <RootContext.Provider value={{ result }}>{children}</RootContext.Provider>
  );
};
```

### توضیح

- فقط Root/Jailbreak detection با JailMonkey انجام می‌شود.
- بخش حساس (پرداخت) اگر Root/Jailbreak باشد **غیرفعال می‌شود**.
- هشدار به کاربر نمایش داده می‌شود.
- هیچ وابستگی اضافه‌ای به DeviceInfo یا ارسال گزارش ندارد، همه چیز سمت فرانت‌اند ساده و قابل تست است.
