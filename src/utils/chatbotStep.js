export const steps = [
  {
    id: "1",
    message:
      "Welcome to Bengkala Journey! I’m here to help you explore the unique culture of Bengkala Village. What would you like to do today?",
    trigger: "options",
  },
  {
    id: "options",
    options: [
      { value: "dashboard", label: "View Dashboard", trigger: "dashboard" },
      { value: "contributors", label: "Learn About Contributors", trigger: "contributors" },
      { value: "forum", label: "Join the Discussion Forum", trigger: "forum" },
      { value: "culture", label: "Discover Local Culture", trigger: "culture-heritage" },
    ],
  },
  {
    id: "dashboard",
    message: "Here’s your dashboard! Would you like to view recent updates or check your activity history?",
    trigger: "dashboard-options",
  },
  {
    id: "dashboard-options",
    options: [
      { value: "updates", label: "View Recent Updates", trigger: "recent-updates" },
      { value: "history", label: "Check Activity History", trigger: "activity-history" },
      { value: "back", label: "Go Back", trigger: "back-to-options" },
    ],
  },
  {
    id: "recent-updates",
    message: "Recent updates include new cultural insights and community discussions. What next?",
    trigger: "back-to-options",
  },
  {
    id: "activity-history",
    message: "Your activity history shows recent forum posts and cultural explorations. Anything else?",
    trigger: "back-to-options",
  },
  {
    id: "contributors",
    message: "Contributors are essential to this platform. Would you like to learn how to contribute or view contributor profiles?",
    trigger: "contributors-options",
  },
  {
    id: "contributors-options",
    options: [
      { value: "learn", label: "Learn How to Contribute", trigger: "how-to-contribute" },
      { value: "profiles", label: "View Contributor Profiles", trigger: "contributor-profiles" },
      { value: "back", label: "Go Back", trigger: "back-to-options" },
    ],
  },
  {
    id: "how-to-contribute",
    message: "You can contribute by sharing stories, uploading media, or participating in forums. Ready to get started?",
    trigger: "back-to-options",
  },
  {
    id: "contributor-profiles",
    message: "Here are some of our top contributors! Explore their profiles to learn more.",
    trigger: "back-to-options",
  },
  {
    id: "forum",
    message: "The forum is where the community gathers to discuss various topics. Would you like to start a new discussion or join an existing one?",
    trigger: "forum-options",
  },
  {
    id: "forum-options",
    options: [
      { value: "new", label: "Start a New Discussion", trigger: "new-discussion" },
      { value: "join", label: "Join an Existing Discussion", trigger: "existing-discussions" },
      { value: "back", label: "Go Back", trigger: "back-to-options" },
    ],
  },
  {
    id: "new-discussion",
    message: "Great! What's the topic of your discussion?",
    trigger: "back-to-options",
  },
  {
    id: "existing-discussions",
    message: "Here are the current discussions. Pick one to join!",
    trigger: "back-to-options",
  },
  {
    id: "culture-heritage",
    message: "Bengkala Village has a rich heritage, including the Kolok culture. Would you like to learn about traditions or explore events?",
    trigger: "culture-options",
  },
  {
    id: "culture-options",
    options: [
      { value: "traditions", label: "Learn About Traditions", trigger: "traditions" },
      { value: "events", label: "Explore Events", trigger: "events" },
      { value: "back", label: "Go Back", trigger: "back-to-options" },
    ],
  },
  {
    id: "traditions",
    message: "Bengkala is known for its unique sign language and cultural customs. Want to dive deeper?",
    trigger: "back-to-options",
  },
  {
    id: "events",
    message: "Upcoming events include cultural festivals and workshops. Check them out soon!",
    trigger: "back-to-options",
  },
  {
    id: "back-to-options",
    message: "What would you like to do next?",
    trigger: "options",
  },
];
