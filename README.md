## Eventino Frontend

This is the React + Vite frontend for Eventino, an event management platform that allows staff to create events and users to explore and join them. Built for simplicity, responsiveness, and real-time feedback.

## Features

-- Auth-protected routes using JWT cookies

-- Staff dashboard for creating and managing events

-- Public event listing and details

-- Join functionality for users

-- Capacity-based event status (open/full)

-- Image uploads (base64)

-- Real-time progress bar showing attendee count

-- Tech Stack

-- React with Vite

-- Tailwind CSS + custom theming

-- Framer Motion for animations

-- Axios for API communication

-- React Router DOM for routing

## Installation

git clone https://github.com/AnastasiaKaldi/Launchpad-Event-Platform.git
cd eventorg
npm install

## Environment Setup

Please ask me directly at kaldianastasia@gmail.com, for security purposes.

## Running Locally

npm run dev

Then open http://localhost:5173 in your browser.

## Scripts

Command

Description

npm run dev

Start dev server

npm run build

Build for production

npm run preview

Preview production build

## Project Structure

src/
├── assets/ # Static images used across the app
├── App.jsx # Root component with route definitions
├── main.jsx # React app entry point (mounts App to DOM)
├── EditEvent.jsx # Staff view for editing existing events
├── Event.jsx # Page showing full event details and join button
├── EventsPage.jsx # Lists all events (Ticketmaster + custom)
├── Footer.jsx # Footer for homepage layout
├── Homepage.jsx # Welcome landing page
├── index.css # Global CSS and Tailwind directives
├── JoinedEvents.jsx # Page for users to view events they've joined
├── LoadingPage.jsx # Temporary loading state
├── Manage.jsx # Dashboard for staff to manage their own events
├── Navbar.jsx # Site navigation header
├── OrgEvent.jsx # Event creation form (staff only)
├── SignIn.jsx # Login page for users and staff
├── SignUp.jsx # Signup/registration page for new users

## Roles & Access

Staff: Can create, edit, delete events; see progress stats.

Users: Can browse and join events.

## Feedback

Please feel free to submit pull requests or open issues. For questions, contact kaldianastasia@gmail.com
