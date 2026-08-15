# 🏥 CarePulse — Healthcare Management System

CarePulse is a **web-based healthcare management platform** designed to simplify and streamline patient and healthcare workflows. It enables patients to register, schedule appointments, manage prescriptions and laboratory tests, while providing administrators with tools to manage healthcare operations efficiently.

## 🚀 Features

* 👤 **Patient Registration** – Secure registration and management of patient information.
* 📅 **Appointment Scheduling** – Patients can book appointments and administrators can manage appointment requests.
* 🧪 **Lab Test Management** – Manage laboratory test requests and patient-related information.
* 💊 **Prescription Management** – Create and manage digital prescriptions.
* 🔐 **Authentication** – Secure user authentication using Appwrite.
* 📁 **File Storage** – Store and manage healthcare-related documents using Appwrite Storage.
* 📱 **Responsive UI** – User-friendly interface designed for different screen sizes.
* 📋 **Form Validation** – Reliable form handling and validation using React Hook Form and Zod.

## 🛠️ Technologies Used

| Technology          | Purpose                               |
| ------------------- | ------------------------------------- |
| **Next.js**         | Frontend and application framework    |
| **TypeScript**      | Type-safe development                 |
| **Tailwind CSS**    | Responsive UI and styling             |
| **Appwrite**        | Authentication, database, and storage |
| **React Hook Form** | Form management                       |
| **Zod**             | Form and schema validation            |

## 🏗️ System Architecture

```text
                    CarePulse
                       │
        ┌──────────────┼──────────────┐
        │              │              │
     Patient       Admin/Doctor   Healthcare
        │              │              │
        ↓              ↓              ↓
 Registration     Appointment     Lab Tests
        │           Management     & Prescriptions
        │              │              │
        └──────────────┼──────────────┘
                       ↓
                    Appwrite
                ┌──────┼──────┐
                ↓      ↓      ↓
          Authentication Database Storage
```

## 🔄 Application Workflow

```text
Patient Registration
        ↓
User Authentication
        ↓
Book Appointment
        ↓
Admin Reviews Appointment
        ↓
Appointment Management
        ↓
Lab Test / Prescription Management
        ↓
Patient Healthcare Information
```

## 📂 Project Structure

```text
CarePulse/
│
├── public/                 # Static assets
├── app/                    # Next.js application routes
├── components/             # Reusable UI components
├── lib/                    # Utility functions and configurations
├── types/                  # TypeScript types
│
├── .env.local              # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/CarePulse.git
```

### 2. Navigate to the project

```bash
cd CarePulse
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and add the required Appwrite configuration.

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_STORAGE_ID=your_storage_id
```

> **Important:** Never commit API keys, credentials, or other sensitive information to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

## 🎯 Project Objectives

* Reduce manual effort in healthcare administration.
* Simplify patient registration and appointment scheduling.
* Digitize prescriptions and laboratory test management.
* Centralize important patient and appointment information.
* Provide a responsive and user-friendly healthcare platform.
* Improve data accuracy through structured form validation.

## 🔮 Future Enhancements

* 🤖 AI-powered symptom analysis
* 📹 Online video consultation
* 📊 Patient health analytics dashboard
* ⌚ Wearable device integration
* 💬 Real-time patient-doctor communication
* 🔔 Medication and appointment reminders
* 💳 Online billing and payment integration
* 📱 Progressive Web App support

## 📸 Screenshots

Add screenshots of your major application screens here:

```text
Home Page
Patient Registration
Appointment Booking
Admin Dashboard
Lab Test Management
Prescription Management
```

Example:

```markdown
![CarePulse Dashboard](./screenshots/dashboard.png)
```

## 👩‍💻 Author

**Sejal Patole**

MCA Student | Full-Stack Developer | AI Enthusiast

## 📄 License

This project was developed for **educational and portfolio purposes**.
