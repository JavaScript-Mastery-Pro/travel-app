<div align="center">
  <br />
    <a href="https://www.youtube.com/watch?v=E-fdPfRxkzQ" target="_blank">
      <img src="public/assets/images/readme.png" alt="Project Banner">
    </a>
  <br />
  <div>
    <img alt="Static Badge" src="https://img.shields.io/badge/React-4c84f3?style=for-the-badge&logo=react&logoColor=white">
    <img alt="Static Badge" src="https://img.shields.io/badge/Appwrite-f05695?style=for-the-badge&logo=appwrite&logoColor=white">
    <img alt="Static Badge" src="https://img.shields.io/badge/Syncfusion-181758?style=for-the-badge&logoColor=white">
    <img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  </div>
  <h3 align="center">Travel Agency Platform</h3>

  <div align="center">
     Build this project step by step with our detailed tutorial on <a href="https://www.youtube.com/@javascriptmastery/videos" target="_blank"><b>JavaScript Mastery</b></a> YouTube. Join the JSM family!
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets (Code to Copy)](#snippets)
6. 🔗 [Assets](#links)
7. 🚀 [More](#more)

## ⚠️ Tutorial

This repository contains the code corresponding to an in-depth tutorial available on our YouTube channel, <a href="https://www.youtube.com/@javascriptmastery/videos" target="_blank"><b>JavaScript Mastery</b></a>.

If you prefer visual learning, this is the perfect resource for you. Follow our tutorial to learn how to build projects like these step-by-step in a beginner-friendly manner!

<a href="https://www.youtube.com/watch?v=E-fdPfRxkzQ" target="_blank"><img src="https://github.com/sujatagunale/EasyRead/assets/151519281/1736fca5-a031-4854-8c09-bc110e3bc16d" /></a>

## <a name="introduction">🤖 Introduction</a>

A modern travel agency platform with an admin dashboard and public site. Generate AI-powered trip itineraries based on country, travel style, interests, group type, and budget — and book trips with ease.

If you're getting started and need assistance or face any bugs, join our active Discord community with over **50k+** members. It's a place where people help each other out.

<a href="https://discord.com/invite/n6EdbFJ" target="_blank"><img src="https://github.com/sujatagunale/EasyRead/assets/151519281/618f4872-1e10-42da-8213-1d69e486d02e" /></a>

## <a name="tech-stack">⚙️ Tech Stack</a>

- Syncfusion
- React Router v7 (framework mode)
- Appwrite
- Tailwind CSS
- Vite
- React 19

## <a name="features">🔋 Features</a>

### Features of the Travel Agency Project

👉 AI-powered trip itinerary generation

👉 Trip booking functionality on the public site

👉 Admin dashboard with trip and user management

👉 User growth stats and trip analytics

👉 Interactive charts and trip stats table

👉 Detailed trip view with booking insights

👉 Responsive UI with modern design

👉 Secure user authentication and data handling

👉 Modular code architecture and reusability

and many more, built for scalability and a smooth user experience.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
https://github.com/JavaScript-Mastery-Pro/travel-app.git
cd travel app
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
VITE_SYNCFUSION_LICENSE_KEY="syncfusion license key"
VITE_APPWRITE_PROJECT_ID="appwrite project id"
VITE_APPWRITE_API_ENDPOINT="appwrite api endpoint"
VITE_APPWRITE_API_KEY="appwrite api key"
VITE_APPWRITE_DATABASE_ID="appwrite database id"
VITE_APPWRITE_USERS_COLLECTION_ID="appwrite users collection id"
VITE_APPWRITE_ITINERARY_COLLECTION_ID="appwrite itinerary collection id"
VITE_BASE_URL="http://localhost:5173"
STRIPE_SECRET_KEY="stripe secret key"
GEMINI_API_KEY="gemini api key"
UNSPLASH_ACCESS_KEY="unsplash access key"
```

### Replace the placeholder values with your actual credentials.

**[Syncfusion](https://www.syncfusion.com/)**

**[Appwrite](https://appwrite.io/)**

**[Gemini AI](https://aistudio.google.com/)**

**[Stripe](https://stripe.com/)**

**[Unsplash](https://unsplash.com/)**

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173/) in your browser to view the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>app.css</code></summary>

```css
@import url("https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-react-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-react-grids/styles/material.css";
@import "../node_modules/@syncfusion/ej2-react-navigations/styles/material.css";
@import "../node_modules/@syncfusion/ej2-react-splitbuttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-react-dropdowns/styles/material.css";
@import "tailwindcss";

@theme {
  --font-figtree: "Figtree", sans-serif;
  --font-inter: "Inter", sans-serif;
  --color-dark-100: #1f1f36;
  --color-dark-200: #141627;
  --color-dark-300: #101828;
  --color-dark-400: #2e2c48;
  --color-gray-100: #7f7e83;
  --color-gray-200: #eaecf0;
  --color-gray-500: #667085;
  --color-gray-700: #344054;
  --color-primary-50: #e9f3fb;
  --color-primary-100: #256ff1;
  --color-primary-500: #175cd3;
  --color-light-100: #ecf2ef;
  --color-light-200: #f9fbfc;
  --color-light-300: #f2f4f7;
  --color-light-400: #ebeeed;
  --color-light-500: #e3f1ff;
  --color-success-50: #ecfdf3;
  --color-success-500: #12b76a;
  --color-success-700: #027a48;
  --color-pink-50: #f7edf6;
  --color-pink-500: #c11574;
  --color-navy-50: #f0f9ff;
  --color-navy-500: #026aa2;
  --color-red-500: #b93815;
  --color-red-50: #fff4ed;
  --color-red-100: #ff543d;

  --background-image-auth: url("/assets/images/auth-img.webp");
  --background-image-hero: url("/assets/images/hero-img.png");
  --background-image-card-1: url("/assets/images/card-img-1.png");
  --background-image-card-2: url("/assets/images/card-img-2.png");
  --background-image-card-3: url("/assets/images/card-img-3.png");
  --background-image-card-4: url("/assets/images/card-img-4.png");
  --background-image-card-5: url("/assets/images/card-img-5.png");
  --background-image-card-6: url("/assets/images/card-img-6.png");
  --background-image-linear100: linear-gradient(
    105deg,
    rgba(207, 241, 255, 0.8) 14.17%,
    rgba(255, 255, 255, 0) 54.71%
  );
  --background-image-linear200: linear-gradient(
    39deg,
    rgba(3, 3, 3, 0.54) -3.66%,
    rgba(6, 6, 6, 0) 45.57%
  );
  --shadow-100:
    0px 1px 3px 0px rgba(16, 24, 40, 0.1),
    0px 1px 2px 0px rgba(16, 24, 40, 0.06);
  --shadow-200:
    0px 12px 16px -4px rgba(16, 24, 40, 0.1),
    0px 4px 20px -2px rgba(16, 24, 40, 0.2);
  --shadow-300: 0px 2px 30px 0px rgba(0, 0, 0, 0.05);
  --shadow-400: 0px 2px 6px 0px rgba(13, 10, 44, 0.08);
  --shadow-500: 0px 12px 16px -4px rgba(16, 24, 40, 0.1);
  --radius-20: 20px;
}

@layer components {
  .error {
    @apply text-red-500 text-base font-medium text-center;
  }
  .all-users {
    @apply w-full min-h-screen  flex flex-col gap-10;
  }

  .stats-card {
    @apply p-6 flex flex-col gap-6 bg-white shadow-400 rounded-20 text-dark-100;

    .content {
      @apply flex flex-row md:flex-col-reverse xl:flex-row xl:items-center gap-3 justify-between;
    }
  }

  .sign-in-card {
    @apply flex bg-white flex-col border border-light-100 md:max-w-[510px] rounded-[20px] py-10 px-6 w-full;
    header {
      @apply flex items-center gap-1.5 justify-center;
    }
    article {
      @apply mt-9 mb-[30px] flex flex-col gap-3;
    }
  }
  .info-pill {
    @apply flex items-center gap-1.5;
    img {
      @apply size-5;
    }
    figcaption {
      @apply text-sm md:text-lg font-normal truncate text-gray-100;
    }
  }

  .trip {
    @apply flex flex-col gap-10 pb-20;
    section {
      @apply flex flex-col gap-5 mt-2.5;
    }
  }
  .auth {
    @apply w-full h-screen flex bg-auth bg-cover bg-no-repeat;
  }

  .payment-success {
    @apply flex flex-col gap-10 pb-20 items-center justify-center h-screen;
    section {
      @apply flex flex-col gap-5 justify-between w-full items-center;
      article {
        @apply flex flex-col gap-3.5 w-full items-center justify-center md:max-w-[488px];
        h1 {
          @apply text-xl md:text-3xl font-semibold text-dark-100;
        }
        p {
          @apply text-gray-100 text-sm font-normal md:text-lg text-center;
        }
      }
    }
  }

  .trip-form {
    @apply flex flex-col gap-6 py-6 bg-white border border-light-200 rounded-xl shadow-100;
    div {
      @apply w-full flex flex-col gap-2.5 px-6 relative;
    }
    label {
      @apply text-sm font-normal text-gray-100;
    }
  }

  .travel-hero {
    @apply bg-hero bg-origin-content bg-cover;

    div {
      @apply flex flex-col bg-linear100 bg-cover;

      section {
        @apply py-48 justify-center items-start flex flex-col gap-6;

        article {
          @apply flex flex-col w-full md:max-w-[520px] gap-3.5;
          p {
            @apply text-lg font-normal text-dark-400;
          }
        }
      }
    }
  }
  .travel-featured {
    @apply flex flex-col lg:flex-row gap-[30px] h-2/3 lg:h-1/2;
  }

  .travel-detail {
    @apply flex flex-col gap-10 pb-20;

    .travel-div {
      @apply flex flex-col lg:flex-row gap-10;
    }

    .back-link {
      @apply flex items-center justify-center gap-2.5 py-3 px-[30px] border-gray-200 rounded-lg shadow-500 bg-white h-[50px] w-[240px];

      img {
        @apply size-[17px];
      }

      span {
        @apply text-base font-semibold text-dark-100;
      }
    }

    .container {
      @apply flex flex-col gap-9 mt-2.5;

      header {
        @apply flex flex-col gap-6 overflow-hidden;

        div {
          @apply flex items-center gap-5;
        }
      }

      .gallery {
        @apply grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-7 mt-1;
      }
    }

    .visit {
      @apply flex flex-col gap-5;

      div {
        @apply flex flex-col gap-4;

        h3 {
          @apply text-base md:text-xl text-dark-400 font-semibold;
        }

        ul {
          @apply flex flex-col gap-3;
          li {
            @apply flex justify-between gap-7 text-sm md:text-lg font-normal text-dark-400 !list-disc;
          }
        }
      }
    }

    .itinerary {
      @apply flex flex-col gap-9;

      li {
        @apply flex flex-col gap-4;

        h3 {
          @apply text-base md:text-xl font-semibold text-dark-400;
        }

        ul {
          @apply flex flex-col sm:gap-3 gap-7;

          li {
            @apply flex max-sm:flex-col flex-row justify-between sm:gap-7 gap-3 text-sm md:text-lg font-normal text-dark-400 !list-disc;

            span {
              @apply w-[90px];
            }
          }
        }
      }
    }
    .title {
      @apply flex justify-between gap-5;

      article {
        @apply flex flex-col gap-4;

        h3 {
          @apply text-xl md:text-3xl text-dark-100 font-semibold;
        }

        p {
          @apply text-base md:text-2xl text-gray-100 font-normal;
        }
      }

      h2 {
        @apply text-sm md:text-xl font-normal text-dark-100;
      }
    }
  }
  .trip-card {
    @apply shadow-300 bg-white rounded-[20px] flex-col w-full relative;
    img {
      @apply w-full h-[160px] rounded-t-xl object-cover aspect-video;
    }
    article {
      @apply flex flex-col gap-3 mt-4 pl-[18px] pr-3.5;
      h2 {
        @apply text-sm md:text-lg font-semibold text-dark-100 line-clamp-2;
      }
      figure {
        @apply flex items-center gap-2;
        figCaption {
          @apply text-xs md:text-sm font-normal text-gray-100;
        }
      }
    }
  }
  .link-logo {
    @apply flex items-center gap-1.5 py-10 border-b border-light-100;
    h1 {
      @apply text-base md:text-2xl font-bold text-dark-100;
    }
  }
  .nav-footer {
    @apply flex items-center gap-2.5 pb-8;
    img {
      @apply size-10 rounded-full aspect-square;
    }
    article {
      @apply flex flex-col gap-[2px] max-w-[115px];
      h2 {
        @apply text-sm md:text-base font-semibold text-dark-200 truncate;
      }
      p {
        @apply text-gray-100 text-xs md:text-sm font-normal truncate;
      }
    }
  }
  .mobile-sidebar {
    @apply lg:hidden flex flex-col gap-5;
    header {
      @apply flex justify-between items-center border-b border-light-100;
      h1 {
        @apply text-base md:text-2xl font-bold text-dark-100;
      }
      a {
        @apply flex items-center gap-1.5 py-10;
      }
    }
  }
  .root-nav {
    @apply flex justify-between gap-4  items-center;
    a {
      @apply flex items-center gap-1.5 py-10;
      h1 {
        @apply text-base md:text-2xl font-bold text-dark-100;
      }
    }
    aside {
      @apply flex gap-4 items-center;
      img {
        @apply size-10 rounded-full aspect-square;
      }
    }
  }
  .footer-container {
    @apply flex justify-between items-center h-full gap-5;
    a {
      @apply flex items-center gap-1.5 py-10;
      h1 {
        @apply text-base md:text-2xl font-bold text-dark-100;
      }
    }
    div {
      @apply flex items-center gap-2 sm:gap-5;
      a {
        @apply text-sm md:text-base font-normal text-gray-100;
      }
    }
  }
  .header {
    @apply flex flex-col gap-5 md:flex-row justify-between w-full;
    article {
      @apply flex flex-col gap-3.5 w-full;
    }
  }
  .nav-items {
    @apply flex flex-col px-6 h-full;
    .container {
      @apply flex flex-col justify-between h-full;
      nav {
        @apply flex flex-col gap-3.5 pt-9;
      }
    }
  }

  .admin-layout {
    @apply flex flex-col lg:flex-row h-screen w-full;
    .children {
      @apply w-full h-full bg-light-200 pt-12 lg:pt-10;
    }
  }
  .user-trip {
    @apply pb-20 flex flex-col lg:flex-row gap-5 justify-between;
  }

  .status-column {
    @apply flex justify-center items-center gap-1 w-[65px] py-[2px]  rounded-2xl mix-blend-multiply;
  }

  .dashboard {
    @apply flex flex-col gap-10 w-full  pb-20;

    .container {
      @apply flex flex-col gap-5 mt-2.5;
      h1 {
        @apply text-xl font-semibold text-dark-100;
      }
    }
  }
  .featured-card {
    @apply flex flex-col justify-between gap-3.5 p-[30px] min-h-[230px] h-full;
  }
  .featured {
    @apply flex flex-col md:flex-row gap-[30px];
    article {
      @apply flex flex-col gap-[30px] w-full;
    }
  }
}

@layer utilities {
  .wrapper {
    @apply w-full max-w-7xl mx-auto px-4 lg:px-8;
  }
  .wrapper-md {
    @apply w-full max-w-3xl px-4 lg:px-8 mx-auto;
  }
  .flex-center {
    @apply flex justify-center items-center;
  }
  .flex-between {
    @apply flex justify-between items-center;
  }
  .p-72-bold {
    @apply text-5xl md:text-7xl font-bold;
  }
  .p-40-semibold {
    @apply text-3xl md:text-[40px] md:leading-[44px] font-semibold;
  }

  .p-30-bold {
    @apply text-2xl md:text-3xl font-bold;
  }
  .p-28-bold {
    @apply text-[20px] md:text-[28px] leading-[16px] md:leading-[20px] font-bold;
  }
  .p-28-semibold {
    @apply text-[20px] text-2xl md:text-[28px] leading-[16px] md:leading-[20px] font-semibold;
  }
  .p-24-semibold {
    @apply text-lg md:text-2xl font-semibold;
  }
  .p-20-semibold {
    @apply text-base md:text-[20xp] md:leading-7 font-semibold;
  }
  .p-18-bold {
    @apply text-[14px] md:text-[18px] leading-[14px] md:leading-[16px] font-bold;
  }
  .p-18-semibold {
    @apply text-[14px] md:text-[18px] leading-[14px] md:leading-[16px] font-semibold;
  }
  .p-18-regular {
    @apply text-[14px] md:text-[18px] leading-[14px] md:leading-[16px] font-normal;
  }
  .p-16-semibold {
    @apply text-sm md:text-base font-semibold;
  }
  .button-class {
    @apply !bg-primary-100 !px-4 !rounded-lg !flex !items-center !justify-center !gap-1.5 !shadow-none;
  }
  .button-class-secondary {
    @apply !bg-white !px-4 !rounded-lg !flex !items-center !justify-center !gap-1.5 !shadow-sm;
  }
  .form-label {
    @apply text-sm font-normal text-gray-100;
  }
  .form-input {
    @apply p-3.5 border border-light-400 rounded-xl text-base text-dark-300 font-normal;
  }
  .comboBox-popup {
    @apply absolute z-10 top-24 bg-white border border-gray-200 rounded-xl shadow-200 h-[250px] w-full md:max-w-[660px] overflow-hidden;
  }
  .tripCard-pill {
    @apply bg-white py-1 px-2.5 w-fit rounded-[20px] absolute top-2.5 right-4 text-dark-100 text-sm font-semibold;
  }
  .price-pill {
    @apply bg-white py-0.5 px-2.5 w-fit rounded-[20px] top-2.5 right-4 text-dark-100 text-sm font-semibold;
  }
  .trip-grid {
    @apply grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7;
  }
  .nav-item {
    @apply flex items-center text-xs md:text-lg font-normal cursor-pointer gap-2.5 py-[18px] px-3.5 rounded-lg text-dark-200 hover:bg-primary-100 hover:text-white;
  }
  .combo-box {
    @apply !p-3.5 !border w-full !border-light-400 !rounded-xl !text-base !text-dark-300 !font-normal;
  }
}

html,
body {
  font-family: "Figtree", sans-serif;
  background-color: #f9fbfc;
  scroll-behavior: smooth;
}

.glassmorphism {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

/* ======== css overrides for syncfusion ========= */
.e-grid,
.e-table {
  border-color: #eef9ff !important;
}

.e-control {
  border-radius: 12px !important;
}

.e-grid .e-gridheader {
  border-color: #eef9ff !important;
  border-radius: 12px 12px 0 0 !important;
}

.e-grid .e-row:nth-child(odd) {
  background-color: #f9fbfc;
}

.e-grid .e-rowcell {
  padding-top: 18px !important;
  padding-bottom: 18px !important;
}

.e-sidebar.e-left {
  border-right: 1px solid #ecf2ef;
}
.e-btn,
.e-css.e-btn {
  text-transform: none;
}
.e-dropdown-btn {
  border-radius: 6px;
  border: 1px solid #f0fef9;
  background: #ffffff;
  box-shadow:
    0px 0px 3px 0px rgba(16, 24, 40, 0.1),
    0px 0px 2px 0px rgba(16, 24, 40, 0.06);
  height: 40px;
}

.e-dropdown-popup ul {
  border-radius: 8px;
  border: 1px solid #eaecf0;
  background: #fff;
  box-shadow:
    0px 12px 16px -4px rgba(16, 24, 40, 0.1),
    0px 4px 20px -2px rgba(16, 24, 40, 0.2);
}
.e-dropdown-popup ul .e-item {
  padding-left: 36px;
  padding-right: 36px;
}
/* e-input-group-icon e-ddl-icon e-search-icon */

.e-input-group-icon {
  position: absolute;
  top: 45px;
  right: 40px;
}
```

</details>

<details>
<summary><code>constants/index.ts</code></summary>

```ts
import type { AxisModel } from "@syncfusion/ej2-react-charts";

export const sidebarItems = [
  {
    id: 1,
    icon: "/assets/icons/home.svg",
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    id: 3,
    icon: "/assets/icons/users.svg",
    label: "All Users",
    href: "/all-users",
  },
  {
    id: 4,
    icon: "/assets/icons/itinerary.svg",
    label: "AI Trips",
    href: "/trips",
  },
];

export const chartOneData: object[] = [
  {
    x: "Jan",
    y1: 0.5,
    y2: 1.5,
    y3: 0.7,
  },
  {
    x: "Feb",
    y1: 0.8,
    y2: 1.2,
    y3: 0.9,
  },
  {
    x: "Mar",
    y1: 1.2,
    y2: 1.8,
    y3: 1.5,
  },
  {
    x: "Apr",
    y1: 1.5,
    y2: 2.0,
    y3: 1.8,
  },
  {
    x: "May",
    y1: 1.8,
    y2: 2.5,
    y3: 2.0,
  },
  {
    x: "Jun",
    y1: 2.0,
    y2: 2.8,
    y3: 2.5,
  },
];

export const travelStyles = [
  "Relaxed",
  "Luxury",
  "Adventure",
  "Cultural",
  "Nature & Outdoors",
  "City Exploration",
];

export const interests = [
  "Food & Culinary",
  "Historical Sites",
  "Hiking & Nature Walks",
  "Beaches & Water Activities",
  "Museums & Art",
  "Nightlife & Bars",
  "Photography Spots",
  "Shopping",
  "Local Experiences",
];

export const budgetOptions = ["Budget", "Mid-range", "Luxury", "Premium"];

export const groupTypes = ["Solo", "Couple", "Family", "Friends", "Business"];

export const footers = ["Terms & Condition", "Privacy Policy"];

export const selectItems = [
  "groupType",
  "travelStyle",
  "interest",
  "budget",
] as (keyof TripFormData)[];

export const comboBoxItems = {
  groupType: groupTypes,
  travelStyle: travelStyles,
  interest: interests,
  budget: budgetOptions,
} as Record<keyof TripFormData, string[]>;

export const userXAxis: AxisModel = { valueType: "Category", title: "Day" };
export const useryAxis: AxisModel = {
  minimum: 0,
  maximum: 10,
  interval: 2,
  title: "Count",
};

export const tripXAxis: AxisModel = {
  valueType: "Category",
  title: "Travel Styles",
  majorGridLines: { width: 0 },
};

export const tripyAxis: AxisModel = {
  minimum: 0,
  maximum: 10,
  interval: 2,
  title: "Count",
};

export const CONFETTI_SETTINGS = {
  particleCount: 200, // Number of confetti pieces
  spread: 60, // Spread of the confetti burst
  colors: ["#ff0", "#ff7f00", "#ff0044", "#4c94f4", "#f4f4f4"], // Confetti colors
  decay: 0.95, // Gravity decay of the confetti
};

export const LEFT_CONFETTI = {
  ...CONFETTI_SETTINGS,
  angle: 45, // Direction of the confetti burst (90 degrees is top)
  origin: { x: 0, y: 1 }, // Center of the screen
};

export const RIGHT_CONFETTI = {
  ...CONFETTI_SETTINGS,
  angle: 135,
  origin: { x: 1, y: 1 },
};
```


</details>

<details>
<summary><code>index.d.ts</code></summary>

```ts
declare interface BaseUser {
  id: string;
  name: string;
  email: string;
  dateJoined: string;
  imageUrl: string;
}

declare interface UserData extends BaseUser {
  itineraryCreated: number | string;
  status: "user" | "admin";
}

declare type User = BaseUser;

declare interface Country {
  name: string;
  coordinates: [number, number];
  value: string;
  openStreetMap?: string;
}

declare interface DropdownItem {
  name: string;
}

declare interface SelectProps {
  data: Country[] | DropdownItem[];
  onValueChange: (value: string) => void;
  id: string;
  label: string;
  placeholder: string;
}

declare interface PillProps {
  text: string;
  bgColor?: string;
  textColor?: string;
}

declare interface Activity {
  time: string;
  description: string;
}

declare interface DayPlan {
  day: number;
  location: string;
  activities: Activity[];
}

declare interface Location {
  city: string;
  coordinates: [number, number];
  openStreetMap: string;
}

declare interface Trip {
  id: string;
  name: string;
  description: string;
  estimatedPrice: string;
  duration: number;
  budget: string;
  travelStyle: string;
  interests: string;
  groupType: string;
  country: string;
  imageUrls: string[];
  itinerary: DayPlan[];
  bestTimeToVisit: string[];
  weatherInfo: string[];
  location: Location;
  payment_link: string;
}

declare interface TripCardProps {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  tags: string[];
  price: string;
}

declare interface StatsCard {
  headerTitle: string;
  total: number;
  lastMonthCount: number;
  currentMonthCount: number;
}

declare interface TrendResult {
  trend: "increment" | "decrement" | "no change";
  percentage: number;
}

declare interface DashboardStats {
  totalUsers: number;
  usersJoined: {
    currentMonth: number;
    lastMonth: number;
  };
  userRole: {
    total: number;
    currentMonth: number;
    lastMonth: number;
  };
  totalTrips: number;
  tripsCreated: {
    currentMonth: number;
    lastMonth: number;
  };
}

declare interface CreateTripResponse {
  id?: string;
}

declare interface DestinationProps {
  containerClass?: string;
  bigCard?: boolean;
  activityCount: number;
  rating: number;
  bgImage: string;
  title: string;
}

type GetAllTripsResponse = {
  allTrips: Models.Document[];
  total: number;
};

declare interface UsersItineraryCount {
  imageUrl: string;
  name: string;
  count: number;
}

declare interface TripsInterest {
  imageUrl: string;
  name: string;
  interest: string;
}

declare interface InfoPillProps {
  text: string;
  image: string;
}

declare interface TripFormData {
  country: string;
  travelStyle: string;
  interest: string;
  budget: string;
  duration: number;
  groupType: string;
}
```

## <a name="links">🔗 Assets</a>

- Assets used in the project can be found [here](https://drive.google.com/drive/folders/1Z-ovENYzzTQ-MEnNWyLpdPH2Bkv0M1ti)

## <a name="more">🚀 More</a>

**Advance your skills with Next.js Pro Course**

Enjoyed creating this project? Dive deeper into our PRO courses for a richer learning adventure. They're packed with
detailed explanations, cool features, and exercises to boost your skills. Give it a go!

<a href="https://beta.jsmastery.pro/" target="_blank">
  <img src="public/images/readme-bottom.png" alt="Project Banner">
</a>
