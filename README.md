# Cipi Notes

A modern, feature-rich notes application designed to help users organize their personal thoughts and ideas, practice real-time data management, and leverage AI-driven insights. Built with **Next.js**, **Supabase**, and **Stripe**, this project focuses on seamless user experience, data caching, and offers a subscription model for additional features. The project aims to combine efficient note management with cutting-edge technology to create a valuable tool for both personal and collaborative use.

---

## Features

- **User Authentication**: Secure login using Supabase Auth for private and shared notes.
- **Personal Note Management**: Users can create, edit, and organize their personal notes in a dedicated, private workspace.
- **Public Notes Feed**: Allows users to connect with eachother by publishing notes on a Public Notes Feed. (One note per day limit).
- **Subscription Plans with Stripe**:
  - **Free Tier**: Basic note-taking functionality with limited note length and/or a restricted number of notes.
  - **Premium Tier**: Expanded note length and number of notes, and access to exclusive features like Autosave.
- **AI Insights & Summarization**: Offers AI-driven insights or summaries for each note to help users understand or review their notes quickly.
- **AI Content Moderation**: Uses AI to detect inappropriate language in public notes to maintain a positive environment.
- **Real-Time Collaboration**: Allow multiple users to edit and view notes in real time (available for pro users).

---

## Technologies

- **Next.js** (with App Router) - For a modern, efficient frontend.
- **Supabase** - Handles backend, real-time features, and authentication.
- **Stripe** - Manages subscription plans and payments.
