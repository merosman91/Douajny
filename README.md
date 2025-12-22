# Douajny
باستخدام GPT
douajny-app/
├── public/
│   ├── favicon.ico
│   ├── manifest.json       # PWA Manifest
│   └── icons/              # أيقونات التطبيق
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Cycles.jsx
│   │   ├── Inventory.jsx
│   │   ├── Vaccinations.jsx
│   │   ├── Treatments.jsx
│   │   ├── Expenses.jsx
│   │   ├── Mortality.jsx
│   │   └── Sales.jsx
│   │   └── Reports.jsx
│   ├── context/
│   │   └── CycleContext.jsx
│   ├── hooks/
│   │   └── useActiveCycle.js
│   ├── db/
│   │   ├── db.js
│   │   ├── cycles.js
│   │   ├── inventory.js
│   │   ├── treatments.js
│   │   ├── expenses.js
│   │   ├── mortality.js
│   │   └── sales.js
│   └── utils/
│       ├── calculations.js
│       └── exportPDF.js
├── package.json
├── vite.config.js
└── README.md

# BRD Document 
douajny/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── manifest.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── layout/
    │   ├── Layout.jsx
    │   ├── Sidebar.jsx
    │   └── Header.jsx
    ├── pages/
    │   └── Dashboard.jsx
    ├── theme/
    │   └── theme.js
    └── i18n/
        ├── i18n.js
        ├── ar.js
        └── en.js
