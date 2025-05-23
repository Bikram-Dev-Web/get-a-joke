const jokeBox = document.querySelector('.box');
const generateBtn = document.querySelector('.container button');
const categoryButtons = document.querySelectorAll('.category-btn');

let selectedCategory = 'Any';
let btnDisable = false;

const btnMsg = [
  "Want another one? Haha.",
  "Hope I made your day! Another one?!",
  "The next one will be way funnier haha!",
  "Did you get it? Haha",
  "Haha! Another one?",
  "Bruh, I'm dead haha. Another one?!",
  "I swear the next one be funnier! Again? ",
  "You’re on a roll! How about one more?",
  "Still up for a laugh? Let’s go!",
  "Craving more? I’ve got you covered!",
  "Don’t stop now, here comes another!",
  "Ready for round two? Let’s do it!",
  "One more for the road? Haha!",
  "Feeling lucky? Try another!",
  "How about another chuckle? Click away!",
  "You’re unstoppable! Here’s another one!",
  "Another one? You’re on fire!",
  "Can’t get enough, huh? Here’s more!",
  "Still laughing? Let’s keep it going!",
  "You’re a comedy machine! More?",
  "The fun never stops! Click for more!",
];

// Handle category button selection
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedCategory = btn.dataset.category;
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Disable button temporarily and update its text
function disableButtonWithMsg() {
  if (!btnDisable) {
    generateBtn.disabled = true;
    btnDisable = true;
    generateBtn.style.backgroundColor = "#faf2f2";
    generateBtn.style.transform = "translateY(-5px)";
    generateBtn.style.transition = "0.4s ease";
    generateBtn.style.color = "#faf2f2";

    // Re-enable button immediately, change label
    generateBtn.disabled = false;
    btnDisable = false;
    generateBtn.style.backgroundColor = "";
    generateBtn.style.transform = "translateY(0px)";
    generateBtn.style.color = "";

    const randomMsg = btnMsg[Math.floor(Math.random() * btnMsg.length)];
    generateBtn.textContent = randomMsg;
  }
}

// Handle joke fetch and display
generateBtn.addEventListener('click', () => {
  fetch(`https://v2.jokeapi.dev/joke/${selectedCategory}`)
    .then(response => response.json())
    .then(data => {
      let jokeText = '';
      if (data.type === 'single') {
        jokeText = `${data.joke}`;
      } else {
        jokeText = `${data.setup}<br>${data.delivery} 😂`;
      }

      jokeBox.innerHTML = jokeText;
      jokeBox.style.animation = 'none';
      void jokeBox.offsetWidth; // force reflow
      jokeBox.style.animation = 'fadeIn 0.4s ease-in-out';
    })
    .catch(err => {
      jokeBox.innerText = 'Oops! Failed to load joke. Try again.';
      console.error(err);
    });

  disableButtonWithMsg();
});
