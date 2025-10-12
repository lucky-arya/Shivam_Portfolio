export const adBreaks = [
  "We'll be right back after these messages...",
  "Stay tuned for more amazing content!",
  "Don't touch that dial!",
  "This broadcast brought to you by: Coffee & Code™",
  "Coming up next: More incredible features!",
  "Please stand by... Technical difficulties",
];

export const voiceOverScripts = {
  powerOn: "Welcome to the future... of the past.",
  channel1: "Tonight on Late Night: An exclusive interview with a talented developer.",
  channel2: "Are you tired of boring portfolios? Call now!",
  channel3: "Accessing skills database... Please wait.",
  channel4: "This just in: Breaking news from the development world.",
  channel5: "Your call is important to us. Please hold.",
  channel404: "We apologize for the interruption. Signal will return shortly.",
};

export const getRandomAdBreak = () => {
  return adBreaks[Math.floor(Math.random() * adBreaks.length)];
};
