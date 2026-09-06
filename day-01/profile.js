const name = "Menna";
const city = "Alexandria";
const reason = "I joined to improve my JavaScript skills";

function createProfile(name, city, reason) {
  return `My name is ${name}, I live in ${city}, and I joined because ${reason}.`;
}

const sentence = createProfile(name, city, reason);

console.log(sentence);
console.log(`Node version: ${process.version}`);
