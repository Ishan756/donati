# Donati

Donati is a modern, secure, and community-driven crowdfunding platform built with Next.js. It empowers individuals, NGOs, and organizations to raise funds for meaningful causes, with a professional dark-themed UI and interactive features.

## Features
- Secure authentication (Google, GitHub) via NextAuth
- Razorpay integration for payments
- MongoDB for data storage
- Create, browse, and donate to fundraisers
- Interactive dashboard with dummy campaigns and payment flow
- Animated, responsive UI with Tailwind CSS
- Email notifications to donors via Nodemailer
- Resource/documentation links for donation best practices

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account
- Razorpay account (for payment integration)
- Google & GitHub OAuth credentials

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Ishan756/donati.git
   cd donati
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file:
   - Add MongoDB URI, Razorpay keys, NextAuth secrets, and email credentials.
   - Example:
     ```env
     MONGODB_URI=your_mongodb_uri
     RAZORPAY_KEY_ID=your_razorpay_key_id
     RAZORPAY_KEY_SECRET=your_razorpay_key_secret
     NEXTAUTH_SECRET=your_nextauth_secret
     NEXTAUTH_URL=http://localhost:3000
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     GITHUB_CLIENT_ID=your_github_client_id
     GITHUB_CLIENT_SECRET=your_github_client_secret
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASS=your_email_app_password
     ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Usage
- Visit `/` for the home page
- `/about` for platform info and donation resources
- `/projects` to browse campaigns and donation tips
- `/dashboard` to view and manage fundraisers, make payments
- `/signup` and `/login` for authentication

## Documentation & Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Razorpay Docs](https://razorpay.com/docs/)
- [NextAuth Docs](https://next-auth.js.org/getting-started/introduction)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [PM CARES Fund](https://www.pmcares.gov.in/en/)
- [GiveIndia](https://www.giveindia.org/)
- [Charity Navigator](https://www.charitynavigator.org/)
- [UNICEF Donation Portal](https://www.unicef.org/donate)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
