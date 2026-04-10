# Beach Focus Board
**ISM 3232 – Module 10: My Task Manager**

A premium, coastal inspired productivity manager built with Next.js 16 and React 19. This project demonstrates state management, persistent storage, and modern UI/UX principles.

https://github.com/NataliaCraig/task-manager.git

For this project, I worked to create a Beach Focused aesthetic. Key decisions included:

Typography: Paired Outfit, a bold, modern sans serif for clear easy to read headers with Inter for clean, legible task data.

Visual Style: Implemented Glassmorphism using Tailwind's backdrop blur and semi transparent white backgrounds (bg-white/80) to create a light header look over the coastal gradient.

Color Palette: I utilized a custom cyan-500 to blue-700 gradient for the brand headers to simulate ocean colors, providing high contrast. 

User Experience: Added a "Dashboard" style stats bar to give the user immediate feedback on their productivity metrics.

Lifting State Up: Managed all task data in TaskBoard.js and passed functions down as props to children.

Immutability: Used .map(), .filter(), and the spread operator [...] to update state without direct mutation.

Hydration Management: Implemented a hasMounted state guard to prevent Next.js hydration errors when reading from localStorage.

Derived Values: Calculated total, active, and done counts effeciently during render to ensure data consistency.

## Setup Instructions

1. Clone the repository:
   git clone https://github.com/NataliaCraig/task-manager.git

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

4. Open http://localhost:3000 in your browser


## AI Useage Log 

Question-
"How to structure a Next.js task manager following the 'Lifting State Up' pattern.

AI answer-
Explained the parent-child data flow and the need for a central 'Brain' component.

Result-
I moved all state to TaskBoard.js and passed handlers like onToggle as props to keep child components reusable.

Question-
"How to pair Google Fonts in Next.js 16 to get a premium coastal/beach vibe."

AI answer-
Recommended pairing Outfit (display) with Inter (sans) and using CSS variables in Tailwind v4.

Result-
I learned how to use next/font/google to optimize loading and applied font-black with wide letter-spacing for a high-end look.

Question-
"Fixing the 'Hydration failed' error when reading from localStorage."

AI answer-
Explained the mismatch between server-rendered HTML and client-side storage.

Result-
I implemented a hasMounted useEffect hook. This ensures the app only renders client-specific data after the initial mount, resolving the error.

Question-
"How to create a glassmorphism effect using Tailwind CSS."

AI answer-
Suggested using bg-white/80 combined with backdrop-blur-md and thin white borders.

Result-
I applied this to the main container to create a effect that looks good against the blue background.

Question-
"Why should I use .map() instead of .push() when updating task list?"

AI answer-
Explained React’s reconciliation process and the need for immutable state.

Result-
I avoided direct mutation and used .map() and [...] spread operators to ensure React detects every state change and re-renders correctly.

Question-
"Brainstorm a creative way to show task statistics that isn't just a basic list."

AI answer-
Suggested a dashboard-style grid with varying weights and specific accent colors.

Result-
I built a custom grid with cyan-50/30 background highlights to make the active vs. completed tasks stand out visually.