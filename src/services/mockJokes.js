const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "What did the grape say when it got stepped on? Nothing, it just let out a little wine!",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "What do you call a bear with no teeth? A gummy bear!",
  "Why did the cookie go to the doctor? Because it was feeling crumbly!",
  "What do you call a fake noodle? An impasta!",
  "Why did the math book look sad? Because it had too many problems!",
  "What do you call a can opener that doesn't work? A can't opener!",
  "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
  "What do you call a dinosaur that crashes his car? Tyrannosaurus wrecks!"
];

export function getRandomJoke() {
  return jokes[Math.floor(Math.random() * jokes.length)];
}

export function generateJokeResponse(message) {
  const lowercaseMsg = message.toLowerCase();
  let response = getRandomJoke();

  // Simple keyword matching for topic-specific jokes
  if (lowercaseMsg.includes('food') || lowercaseMsg.includes('eat')) {
    response = "Why did the cookie go to the doctor? Because it was feeling crumbly!";
  } else if (lowercaseMsg.includes('animal') || lowercaseMsg.includes('pet')) {
    response = "What do you call a bear with no teeth? A gummy bear!";
  } else if (lowercaseMsg.includes('math') || lowercaseMsg.includes('school')) {
    response = "Why did the math book look sad? Because it had too many problems!";
  }

  return response;
}
