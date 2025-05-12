# EventOra (Event Planner & Participation System)

A secure, full-featured event management web platform developed by **Team #4b**. EvenTora empowers users to create, discover, and manage public and private events with flexible participation flows, payment integration, and strong community moderation.


**EvenTora** is a JWT-protected event platform where users can:
- Host Public or Private events (free or paid)
- Join events instantly or request access with payment
- Manage participants through approvals, bans, and invitations
- Browse featured and upcoming events
- Enjoy a well-moderated experience, thanks to Admin oversight

## Features

### User Functionality

- **User Registration & JWT Authentication**
- **Event Management**
  - Create, update, and delete events
  - Configure visibility: Public or Private
  - Set optional registration fee
- **Event Discovery**
  - Browse all events
  - Filter and search events by type or keyword
- **Participation & Requests**
  - Join Free Public Events instantly
  - Join Paid Public Events after payment → approval required
  - Request to join Free/ Paid Private Events → optional payment → pending approval
- **Invitations**
  - Invite users to events (Pay & Accept for paid)
- **Participant Management**
  - Approve or reject join requests
  - Ban users from events
- **Post-Event Feedback**
  - Leave and manage reviews/ratings

### Admin Functionality

- **Dashboard to oversee all events and user activity**
- **Delete inappropriate events or user accounts**
- **Feature specific events on the homepage slider**

---

## Pages & UI

### Global Navigation
- Home • Events • Login/Signup • Dashboard

### Footer
- About • Contact • Privacy Policy

### Home Page
- Hero section with Admin-selected featured event
- Slider of 9 upcoming public events with fee indicators

### Events Page
- Filter by: Public Free | Public Paid | Private Free | Private Paid
- Search by Title or Organizer

### Event Details
- Metadata: Title, Date/Time, Venue/Link, Description, Organizer, Fee
- Dynamic CTA based on event type:
  - Free Public → Join
  - Paid Public → Pay & Join
  - Free Private → Request to Join
  - Paid Private → Pay & Request
- Owner actions: Edit, Delete, Approve, Reject, Ban
- Reviews & Ratings section

### Dashboard
- **Sidebar:** My Events • Invitations • My Reviews • Settings
- **Main Sections:**
  - My Events (CRUD & payment statuses)
  - Invitations (Accept/Decline with refund logic)
  - My Reviews (Editable within time window)
  - Profile & Notification Settings

---

## Event Visibility & Workflow

| Type              | Listed | Join Flow                                |
|-------------------|--------|------------------------------------------|
| Public (Free)     | Yes    | Instant join                             |
| Public (Paid)     | Yes    | Pay → Pending approval                   |
| Private (Free)    | Yes    | Request → Pending approval               |
| Private (Paid)    | Yes    | Pay & Request → Pending approval         |

---

## Technology Stack

### Frontend
- **Next.js** – Server-side rendering & routing
- **Tailwind CSS** – Utility-first styling framework

### Backend
- **Node.js** with **Express.js** – RESTful API server
- **Prisma ORM** – Database query builder

### Database
- **PostgreSQL** – Relational database

### Authentication
- **JWT** – Token-based authentication system

### Payment Integration
- **SSLCommerz** or **ShurjoPay** – Secure payment processing for paid events

### Deployment
- **Frontend:** Vercel  
- **Backend:** Neon database(Vercel)

---

## Non-Functional Requirements

- **Usability:** Clean, intuitive, and responsive design
- **Maintainability:** Modular codebase with clean architecture
- **Security:** Protected routes using JWT, secure payment flow
- **Scalability:** Supports multiple concurrent users and event types

---

## Future Enhancements (Optional Ideas)

- **Subscription Plans**
- **Email Notifications**
- **Event Analytics**
- **Google Maps / Location Picker**
- **Live Chat between Hosts and Attendees**

---

## 🌐 Project Links

- 🔴 **Live Website:** [https://eventplannerfrontend.vercel.app/](https://eventplannerfrontend.vercel.app/)
- 💻 **Frontend Repository:** [https://github.com/Team-04B/Event_Planner_Team_4b/tree/main/frontend](https://github.com/Team-04B/Event_Planner_Team_4b/tree/main/frontend)
- ⚙️ **Backend Repository:** [https://github.com/Team-04B/Event_Planner_Team_4b/tree/main/backend](https://github.com/Team-04B/Event_Planner_Team_4b/tree/main/backend)

---

## Screenshots

> *(Add screenshots or screen recordings showcasing the UI and flows.)*

---

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL
- Environment variables for database, JWT secret, and payment credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/Team-04B/Event_Planner_Team_4b.git
cd event-planner

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Fill in your database, JWT, and payment gateway keys

# Run the development server
npm run dev


## Contributors

- [**Rifat Sarker**](https://github.com/your-github) – Web Developer  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin)](https://www.linkedin.com/in/rifatswd/)

- [**Amdadul Haque**](https://github.com/amdadulhaque) – Web Developer  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin)](https://www.linkedin.com/in/Amdadul-Haque-Bhuiyan/)

- [**Md Mydul Islam**](https://github.com/mydul62) – Web Developer  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin)](https://www.linkedin.com/in/mahim62/)

- [**Md Sanim Mia**](https://github.com/md-sanim-mia) – Web Developer  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin)](https://www.linkedin.com/in/sanim-mia/)



