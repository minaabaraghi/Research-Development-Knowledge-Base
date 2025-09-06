# Root/Jailbreak Detection — React Native (TypeScript + JailMonkey)

## پیش‌نیازها

- React Native 0.71+ (ترجیحاً جدیدتر)
- Xcode (برای iOS) و Android Studio + SDK
- Node 18+ و yarn/npm

---

## گام 1) نصب پکیج‌ها

```bash
npm install jail-monkey react-native-device-info
# یا
# yarn add jail-monkey react-native-device-info

cd ios && pod install && cd ..
```

---

## گام 2) ساختار فایل‌ها

```
project/
└── src/
    └── security/
        └── RootCheck.ts        # کد TypeScript برای چک کردن Root/Jailbreak
└── App.tsx                      # نمونه استفاده
```

---

## گام 3) پیاده‌سازی RootCheck.ts

```tsx
// src/security/RootCheck.ts
import JailMonkey from "jail-monkey";

export type RootCheckResult = {
  rooted: boolean;
  reason: string[];
};

export function detectRoot(): RootCheckResult {
  const reasons: string[] = [];

  if (JailMonkey.isJailBroken()) {
    reasons.push("Device is Jailbroken / Rooted");
  }
  if (JailMonkey.hookDetected()) {
    reasons.push("Hook framework detected (e.g., Frida)");
  }
  if (JailMonkey.canMockLocation()) {
    reasons.push("Device can mock location");
  }
  if (JailMonkey.trustFall()) {
    reasons.push("TrustFall indicates compromised device");
  }

  return {
    rooted: reasons.length > 0,
    reason: reasons,
  };
}
```

---

## گام 4) نمونه استفاده در App.tsx

```tsx
// App.tsx
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { detectRoot, RootCheckResult } from "./src/security/RootCheck";

export default function App() {
  const [result, setResult] = useState<RootCheckResult>();

  useEffect(() => {
    setResult(detectRoot());
  }, []);

  if (!result) return <Text>Checking...</Text>;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Rooted? {result.rooted ? "YES" : "NO"}</Text>
      {result.reason.map((r, i) => (
        <Text key={i}>- {r}</Text>
      ))}
    </View>
  );
}
```

---

## گام 5) تست اپلیکیشن

1. اپ را روی دستگاه/امولاتور **سالم** اجرا کنید → باید خروجی `Rooted? NO` بدهد.
2. اپ را روی دستگاه/امولاتور **روت‌شده** اجرا کنید → باید خروجی `Rooted? YES` همراه با دلایل نمایش داده شود.

---

## گام 6) ارسال گزارش به سرور (اختیاری)

برای هماهنگی با بک‌اند (C# یا هر زبان دیگر)، می‌توانید نتیجه را به سرور ارسال کنید:

```tsx
// src/security/report.ts
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import type { RootCheckResult } from "./RootCheck";

export type SecurityReport = {
  rooted: boolean;
  reasons: string[];
  platform: "android" | "ios";
  appVersion: string;
};

export async function buildSecurityReport(
  result: RootCheckResult
): Promise<SecurityReport> {
  const appVersion = (await DeviceInfo.getVersion?.()) || "unknown";
  return {
    rooted: result.rooted,
    reasons: result.reason,
    platform: Platform.OS as "android" | "ios",
    appVersion,
  };
}

export async function sendSecurityReport(
  endpoint: string,
  report: SecurityReport,
  authToken?: string
) {
  await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: JSON.stringify(report),
  });
}
```

و در `App.tsx`:

```tsx
import { buildSecurityReport, sendSecurityReport } from "./src/security/report";

useEffect(() => {
  const result = detectRoot();
  setResult(result);
  buildSecurityReport(result).then((report) =>
    sendSecurityReport("https://your.api/api/security/verify", report)
  );
}, []);
```

---

## گام 7) مرحله بعدی (پیشنهادی)

- **اندروید:** استفاده از Play Integrity API برای امنیت بالاتر.
- **iOS:** استفاده از App Attest برای اعتبارسنجی.

این مرحله نیاز به همکاری تیم بک‌اند دارد تا توکن‌ها را بررسی کنند و تصمیم نهایی بگیرند.
