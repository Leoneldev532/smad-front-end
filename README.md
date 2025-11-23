# 🚀 Smad - Waitlist Builder

## 🎯 Objective

The objective of Smad is to empower users to build their waitlist in just 30 seconds and start growing their audience today. Smad is a fast, all-in-one platform designed for managing multiple waitlists across different projects, allowing developers and businesses to focus on building their products rather than handling waitlist infrastructure.

## ✨ Features

- **Fast Setup**: Build your waitlist for landing pages, blogs, etc., in less than 2 minutes.
- **All-in-One Management**: Manage multiple waitlists for different projects in one centralized location.
- **Pre-built Templates**: Choose from available templates to quickly generate waitlist forms.
- **Customization**: Customize forms using the built-in editor to match your branding and requirements.
- **Data Export**: Export collected email data in CSV format for further analysis.
- **Email Integration**: Seamlessly share data with emailing services like Resend.
- **Free Plan**: Create unlimited mailing lists and waitlists at no cost, with access to all basic features.

## 🔄 Process

### Getting Started

1. Create an account on Smad and set up your first project in the dashboard.
2. Copy the integration code (basic form by default) and paste it into your website code.
   - If the project already exists, click the three dots next to the project, select "Copy Code Integration," and copy the code.

### Customizing Your Waitlist

1. Navigate to the dashboard and select your project.
2. Click the vertical three dots next to the project and select "Copy Code Integration."
3. In the modal, click the "Customize" button.
4. Use the editor to adjust styles and settings.
5. Copy the updated integration code.
6. Paste the new code into your website to apply changes.

## 🔮 Future Improvements

- **Additional Email Integrations**: Support for more email service providers like Mailchimp, SendGrid, and ConvertKit.
- **Advanced Analytics**: Enhanced reporting with conversion rates, user behavior tracking, and predictive analytics.
- **A/B Testing**: Test different form designs and messaging to optimize conversion rates.
- **API Access**: Provide a REST API for developers to integrate Smad programmatically.
- **Mobile Application**: Native mobile apps for iOS and Android to manage waitlists on the go.
- **Automation Features**: Auto-responders, drip email campaigns, and triggered notifications.
- **Enhanced Customization**: More themes, fonts, animations, and branding options.
- **Multi-language Support**: Localization for international users.
- **Performance Optimizations**: Faster loading times and better scalability.
- **GDPR Compliance Tools**: Built-in features for data privacy and consent management.

## 🛠️ Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Lucide React
- **Database**: Prisma, PostgreSQL (via Prisma ORM)
- **Authentication**: NextAuth.js
- **Charts and Analytics**: Chart.js, Recharts
- **Email Service**: Resend
- **State Management**: Recoil
- **Animations**: GSAP
- **Other Libraries**: Axios, Day.js, UUID, Bcryptjs, and more

## 🚀 Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd smad-front-end
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/smad_db
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXT_PUBLIC_API_SMAD_PROJECT_ID=your-smad-project-id
   NEXT_PUBLIC_API_SMAD_PRIVATE_KEY=your-smad-private-key
   NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   ```

4. **Set up the database:**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🎥 Video Preview

[![Smad Demo Video](https://img.youtube.com/vi/vQO3hDJEhzo/0.jpg)](https://www.youtube.com/watch?v=vQO3hDJEhzo)
