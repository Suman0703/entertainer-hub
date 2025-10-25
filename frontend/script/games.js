document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const sidebar = document.getElementById("sidebar");
  const container = document.getElementById("games-container");
  const gameButtons = document.querySelectorAll(".genre-filter button");

  // Maximum number of items to show initially
  const maxInitialItems = 20;

  // Sidebar toggle (Retained from main.js)
  menuIcon.addEventListener("click", () => sidebar.classList.add("active"));
  document.addEventListener("click", (e) => {
    if (sidebar.classList.contains("active") && !sidebar.contains(e.target) && !menuIcon.contains(e.target)) {
      sidebar.classList.remove("active");
    }
  });

  // --- Game Data (Riddles and Quiz only) ---
  const riddles = [
    { q: "What has keys but can’t open locks?", a: "A piano" },
    { q: "I speak without a mouth and hear without ears. What am I?", a: "An echo" },
    { q: "The more of me you take, the more you leave behind. What am I?", a: "Footsteps" },
    { q: "What is full of holes but still holds water?", a: "A sponge" },
    { q: "What has an eye but cannot see?", a: "A needle" },
    { q: "What is always in front of you but can’t be seen?", a: "The future" },
    { q: "What question can you never answer yes to?", a: "Are you asleep yet?" },
    { q: "What has one head, one foot, and four legs?", a: "A bed" },
    { q: "What is lighter than a feather, but even the strongest man can't hold it for long?", a: "Breath" },
    { q: "What has to be broken before you can use it?", a: "An egg" },
    { q: "What is made of water but can be used to set a watch on fire?", a: "Ice" },
    { q: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", "a": "A map" },
    { q: "What runs all day but never walks, has a bed but never sleeps, and has a mouth but never eats?", a: "A river" },
    { q: "What is always coming, but never arrives?", a: "Tomorrow" },
    { q: "What can be measured, but has no length, width, or thickness?", a: "Temperature" },
    { q: "What is always wet and goes up the stairs backwards?", a: "A mop" },
    { q: "What has a neck but no head, and a body but no legs?", a: "A bottle" },
    { q: "What can you catch but not throw?", a: "A cold" },
    { q: "I am always hungry, I must always be fed, The finger I lick will soon turn red. What am I?", a: "Fire" },
    { q: "What kind of room has no doors or windows?", a: "A mushroom" },
    { q: "What invention lets you look right through a wall?", a: "A window" },
    { q: "What is the longest word in the English language?", a: "Smiles (because there’s a mile between the two S’s)" },
    { q: "What has an eye, but cannot see?", a: "A needle" },
    { q: "What is black when you buy it, red when you use it, and grey when you throw it away?", a: "Charcoal" },
    { q: "What belongs to you, but other people use it more than you do?", a: "Your name" },
    { q: "What word is spelled wrong in every dictionary?", a: "Wrong" },
    { q: "What can you put in a bucket to make it lighter?", a: "A hole" },
    { q: "I have lakes but no water, mountains but no stone, and cities but no buildings. What am I?", "a": "A map" },
    { q: "What occurs once in a minute, twice in a moment, but never in a thousand years?", a: "The letter M" },
    { q: "What is easy to get into, but hard to get out of?", a: "Trouble" },
    { q: "What has a heart that doesn't beat?", a: "An artichoke" },
    { q: "What has many teeth, but cannot eat?", a: "A comb" },
    { q: "What has no voice, but can tell you a lot?", a: "A book" },
    { q: "What building has the most stories?", a: "A library" },
    { q: "What has a thumb and four fingers, but is not alive?", "a": "A glove" },
    { q: "I am tall when I am young, and I am short when I am old. What am I?", a: "A candle" },
    { q: "What goes up but never comes down?", a: "Your age" },
    { q: "What can fill a room but takes up no space?", a: "Light" },
    { q: "What is full of holes but is still strong?", a: "A chain" },
    { q: "What has rings, but no fingers?", a: "A telephone" },
    { q: "What word begins with E and ends with E but has only one letter?", a: "An envelope" },
    { q: "What is always in a state of motion but never moves?", a: "A road" },
    { q: "What is always coming, but never arrives?", a: "Tomorrow" },
    { q: "What can be measured, but has no length, width, or thickness?", a: "Temperature" },
    { q: "What is always wet and goes up the stairs backwards?", a: "A mop" },
    { q: "What has a neck but no head, and a body but no legs?", a: "A bottle" },
    { q: "What can you catch but not throw?", a: "A cold" },
    { q: "I am always hungry, I must always be fed, The finger I lick will soon turn red. What am I?", a: "Fire" },
    { q: "What kind of room has no doors or windows?", a: "A mushroom" },
    { q: "What invention lets you look right through a wall?", a: "A window" },
    { q: "What is the longest word in the English language?", a: "Smiles (because there’s a mile between the two S’s)" },
    { q: "What has an eye, but cannot see?", a: "A needle" },
    { q: "What is black when you buy it, red when you use it, and grey when you throw it away?", a: "Charcoal" },
    { q: "What has many teeth, but cannot eat?", a: "A comb" },
    { q: "What question can you never answer yes to?", a: "Are you asleep yet?" },
    { q: "What is lighter than a feather, but even the strongest man can't hold it for long?", a: "Breath" },
    { q: "What has to be broken before you can use it?", a: "An egg" },
    { q: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", "a": "A map" },
    { q: "What runs all day but never walks, has a bed but never sleeps, and has a mouth but never eats?", a: "A river" },
    { q: "What is always coming, but never arrives?", a: "Tomorrow" },
    { q: "What can be measured, but has no length, width, or thickness?", a: "Temperature" },
    { q: "What is always wet and goes up the stairs backwards?", a: "A mop" },
    { q: "What has a neck but no head, and a body but no legs?", a: "A bottle" },
    { q: "What can you catch but not throw?", a: "A cold" },
    { q: "I am always hungry, I must always be fed, The finger I lick will soon turn red. What am I?", a: "Fire" },
    { q: "What kind of room has no doors or windows?", a: "A mushroom" },
    { q: "What invention lets you look right through a wall?", a: "A window" },
    { q: "What is the longest word in the English language?", a: "Smiles (because there’s a mile between the two S’s)" },
    { q: "What has an eye, but cannot see?", a: "A needle" },
    { q: "What is black when you buy it, red when you use it, and grey when you throw it away?", a: "Charcoal" },
    { q: "What belongs to you, but other people use it more than you do?", a: "Your name" },
    { q: "What word is spelled wrong in every dictionary?", a: "Wrong" },
    { q: "What can you put in a bucket to make it lighter?", a: "A hole" },
    { q: "I have lakes but no water, mountains but no stone, and cities but no buildings. What am I?", "a": "A map" },
    { q: "What occurs once in a minute, twice in a moment, but never in a thousand years?", a: "The letter M" },
    { q: "What is easy to get into, but hard to get out of?", a: "Trouble" },
    { q: "What has a heart that doesn't beat?", a: "An artichoke" },
    { q: "What has many teeth, but cannot eat?", a: "A comb" },
    { q: "What has no voice, but can tell you a lot?", a: "A book" },
    { q: "What building has the most stories?", a: "A library" },
    { q: "What has a thumb and four fingers, but is not alive?", "a": "A glove" },
    { q: "I am tall when I am young, and I am short when I am old. What am I?", a: "A candle" },
    { q: "What goes up but never comes down?", a: "Your age" },
    { q: "What can fill a room but takes up no space?", a: "Light" },
    { q: "What is full of holes but is still strong?", a: "A chain" },
    { q: "What has rings, but no fingers?", a: "A telephone" },
    { q: "What word begins with E and ends with E but has only one letter?", a: "An envelope" },
    { q: "What is always in a state of motion but never moves?", a: "A road" },
    { q: "What is always coming, but never arrives?", a: "Tomorrow" },
    { q: "What can be measured, but has no length, width, or thickness?", a: "Temperature" },
    { q: "What is always wet and goes up the stairs backwards?", a: "A mop" },
    { q: "What has a neck but no head, and a body but no legs?", a: "A bottle" },
    { q: "What can you catch but not throw?", a: "A cold" },
    { q: "I am always hungry, I must always be fed, The finger I lick will soon turn red. What am I?", a: "Fire" },
    { q: "What kind of room has no doors or windows?", a: "A mushroom" },
    { q: "What invention lets you look right through a wall?", a: "A window" },
    { q: "What is the longest word in the English language?", a: "Smiles (because there’s a mile between the two S’s)" },
    { q: "What has an eye, but cannot see?", a: "A needle" },
    { q: "What is black when you buy it, red when you use it, and grey when you throw it away?", a: "Charcoal" }
  ];

  const quiz = [
    { q: "What is the capital of Japan?", options: ["Tokyo", "Kyoto", "Osaka"], ans: "Tokyo" },
    { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter"], ans: "Mars" },
    { q: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Charles Dickens", "Homer"], ans: "Shakespeare" },
    { q: "What element does 'O' represent on the periodic table?", options: ["Gold", "Oxygen", "Iron"], ans: "Oxygen" },
    { q: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific"], ans: "Pacific" },
    { q: "How many sides does a hexagon have?", options: ["Five", "Six", "Seven"], ans: "Six" },
    { q: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris"], ans: "Paris" },
    { q: "What is the chemical symbol for water?", options: ["W", "H2O", "O2"], ans: "H2O" },
    { q: "What is the process by which plants make their food?", options: ["Respiration", "Photosynthesis", "Transpiration"], ans: "Photosynthesis" },
    { q: "Which country is home to the kangaroo?", options: ["New Zealand", "Australia", "South Africa"], ans: "Australia" },
    { q: "How many continents are there?", options: ["Five", "Six", "Seven"], ans: "Seven" },
    { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Leonardo da Vinci"], ans: "Leonardo da Vinci" },
    { q: "What is the hardest natural substance on Earth?", options: ["Gold", "Diamond", "Quartz"], ans: "Diamond" },
    { q: "What is the smallest prime number?", options: ["Zero", "One", "Two"], ans: "Two" },
    { q: "In what year did the Titanic sink?", options: ["1912", "1905", "1921"], ans: "1912" },
    { q: "What is the main ingredient in guacamole?", options: ["Tomato", "Avocado", "Lime"], ans: "Avocado" },
    { q: "What language is spoken in Brazil?", options: ["Spanish", "Portuguese", "English"], ans: "Portuguese" },
    { q: "What unit measures electric current?", options: ["Volt", "Ohm", "Ampere"], ans: "Ampere" },
    { q: "Which gas do plants primarily absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide"], ans: "Carbon Dioxide" },
    { q: "What is a group of crows called?", options: ["Flock", "Murder", "Coven"], ans: "Murder" },
    { q: "The Great Barrier Reef is off the coast of which country?", options: ["Brazil", "Australia", "Mexico"], ans: "Australia" },
    { q: "What is the power source for all life on Earth?", options: ["Moon", "Sun", "Geothermal"], ans: "Sun" },
    { q: "How many bones are in the adult human body?", options: ["206", "180", "220"], ans: "206" },
    { q: "Which planet is closest to the Sun?", options: ["Venus", "Mars", "Mercury"], ans: "Mercury" },
    { q: "What is the main function of the heart?", options: ["Digest food", "Pump blood", "Process thoughts"], ans: "Pump blood" },
    { q: "Who developed the theory of relativity?", options: ["Newton", "Einstein", "Galileo"], ans: "Einstein" },
    { q: "Which fictional city is the home of Batman?", options: ["Metropolis", "Gotham City", "Star City"], ans: "Gotham City" },
    { q: "What is the term for a word that reads the same backward as forward?", options: ["Anagram", "Palindrome", "Homonym"], ans: "Palindrome" },
    { q: "In which year did the first man walk on the moon?", options: ["1969", "1971", "1965"], ans: "1969" },
    { q: "What is the primary color of a tennis ball?", options: ["White", "Yellow/Green", "Blue"], ans: "Yellow/Green" },
    { q: "What is the largest organ in the human body?", options: ["Heart", "Liver", "Skin"], ans: "Skin" },
    { q: "What is the opposite of 'compression'?", options: ["Tension", "Expansion", "Friction"], ans: "Expansion" },
    { q: "Which metal is liquid at room temperature?", options: ["Gold", "Mercury", "Lead"], ans: "Mercury" },
    { q: "What is the currency of the UK?", options: ["Euro", "Dollar", "Pound Sterling"], ans: "Pound Sterling" },
    { q: "What type of star is the Sun?", options: ["Red Giant", "White Dwarf", "Yellow Dwarf"], ans: "Yellow Dwarf" },
    { q: "What is the common name for sodium chloride?", options: ["Baking Soda", "Table Salt", "Sugar"], ans: "Table Salt" },
    { q: "What is the distance around a circle called?", options: ["Diameter", "Circumference", "Radius"], ans: "Circumference" },
    { q: "Which musical instrument has black and white keys?", options: ["Violin", "Guitar", "Piano"], ans: "Piano" },
    { q: "What is the largest land animal?", options: ["Rhino", "African Elephant", "Giraffe"], ans: "African Elephant" },
    { q: "Which famous structure was built by the Roman Empire?", options: ["Great Wall", "Eiffel Tower", "Colosseum"], ans: "Colosseum" },
    { q: "The study of earthquakes is known as what?", options: ["Geology", "Seismology", "Meteorology"], ans: "Seismology" },
    { q: "What is the chemical symbol for gold?", options: ["Gd", "Au", "Ag"], ans: "Au" },
    { q: "Who wrote 'The Odyssey'?", options: ["Virgil", "Homer", "Socrates"], ans: "Homer" },
    { q: "What country gifted the Statue of Liberty to the US?", options: ["Spain", "France", "England"], ans: "France" },
    { q: "What is the world's highest mountain?", options: ["K2", "Mount Everest", "Fuji"], ans: "Mount Everest" },
    { q: "How many legs does a butterfly have?", options: ["Four", "Six", "Eight"], ans: "Six" },
    { q: "What force keeps planets in orbit around the sun?", options: ["Magnetism", "Gravity", "Atmosphere"], ans: "Gravity" },
    { q: "What does 'HTTP' stand for in web addresses?", options: ["Hyper Text Transfer Protocol", "High Tech Testing Program", "Home Tool Tracking Protocol"], ans: "Hyper Text Transfer Protocol" },
    { q: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria"], ans: "Mitochondria" },
    { q: "What is the boiling point of water in Celsius?", options: ["90°C", "100°C", "110°C"], ans: "100°C" },
    { q: "What is the longest river in the world?", options: ["Amazon", "Nile", "Mississippi"], ans: "Nile" },
    { q: "Which primary color is not used in the CMYK printing model?", options: ["Red", "Blue", "Green"], ans: "Red" },
    { q: "Who was the first President of the United States?", options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington"], ans: "George Washington" },
    { q: "What kind of animal is a killer whale?", options: ["Shark", "Whale", "Dolphin"], ans: "Dolphin" },
    { q: "What is the fear of heights called?", options: ["Claustrophobia", "Arachnophobia", "Acrophobia"], ans: "Acrophobia" },
    { q: "What is the largest land mammal native to North America?", options: ["Moose", "Bison", "Grizzly Bear"], ans: "Bison" },
    { q: "What nutrient do plants primarily need to grow tall?", options: ["Potassium", "Phosphorus", "Nitrogen"], ans: "Nitrogen" },
    { q: "What geometric shape has four equal sides and four right angles?", options: ["Rectangle", "Square", "Rhombus"], ans: "Square" },
    { q: "What famous structure is located in Pisa, Italy?", options: ["Colosseum", "Leaning Tower", "Duomo"], ans: "Leaning Tower" },
    { q: "Which celestial body is responsible for tides on Earth?", options: ["Sun", "Moon", "Mars"], ans: "Moon" },
    { q: "What is the lightest element?", options: ["Helium", "Hydrogen", "Lithium"], ans: "Hydrogen" },
    { q: "In which sport is the 'alley-oop' performed?", options: ["Football", "Hockey", "Basketball"], ans: "Basketball" },
    { q: "What is the main component of Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Argon"], ans: "Nitrogen" },
    { q: "What is the chemical symbol for table salt?", options: ["KCl", "NaCl", "CaCl"], ans: "NaCl" },
    { q: "Which planet is known for its prominent rings?", options: ["Jupiter", "Uranus", "Saturn"], ans: "Saturn" },
    { q: "What is the human body's largest bone?", options: ["Humerus", "Femur", "Tibia"], ans: "Femur" },
    { q: "What type of scientist studies rocks?", options: ["Biologist", "Geologist", "Meteorologist"], ans: "Geologist" },
    { q: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra"], ans: "Canberra" },
    { q: "Which continent is the Sahara Desert located on?", options: ["Asia", "Africa", "South America"], ans: "Africa" },
    { q: "What is the name of the author who wrote 'The Hunger Games' series?", options: ["J.K. Rowling", "Suzanne Collins", "Stephenie Meyer"], ans: "Suzanne Collins" },
    { q: "What is the name of the fictional superhero created by Stan Lee and Steve Ditko who gains spider-like abilities?", options: ["Batman", "Superman", "Spider-Man"], ans: "Spider-Man" },
    { q: "What is the process of turning a liquid into a gas called?", options: ["Condensation", "Evaporation", "Sublimation"], ans: "Evaporation" },
    { q: "Which country is the origin of the Olympic Games?", options: ["Italy", "Greece", "China"], ans: "Greece" },
    { q: "What is the unit of measure for frequency?", options: ["Watt", "Hertz", "Volt"], ans: "Hertz" },
    { q: "What is the currency of Japan?", options: ["Yuan", "Won", "Yen"], ans: "Yen" },
    { q: "Which ocean is the deepest?", options: ["Atlantic", "Pacific", "Indian"], ans: "Pacific" },
    { q: "What famous war included the Battle of Gettysburg?", options: ["WWI", "American Civil War", "WWII"], ans: "American Civil War" },
    { q: "How many strings does a standard guitar have?", options: ["Five", "Six", "Seven"], ans: "Six" },
    { q: "Which material is a good conductor of electricity?", options: ["Rubber", "Wood", "Copper"], ans: "Copper" },
    { q: "What is the collective name for a group of lions?", options: ["Pack", "Pride", "Herd"], ans: "Pride" },
    { q: "What is the official language of Russia?", options: ["Polish", "Russian", "Ukrainian"], ans: "Russian" },
    { q: "What is the process of generating energy from atomic nuclei called?", options: ["Solar Power", "Nuclear Fission", "Chemical Reaction"], ans: "Nuclear Fission" },
    { q: "Which type of animal is a python?", options: ["Lizard", "Snake", "Alligator"], ans: "Snake" },
    { q: "What is the world's most populous country (as of the context of this data)?", options: ["India", "China", "USA"], ans: "China" },
    { q: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa"], ans: "Ottawa" },
    { q: "What is the highest-grossing film of all time (excluding inflation) (as of the context of this data)?", options: ["Titanic", "Avatar", "Avengers: Endgame"], ans: "Avatar" },
    { q: "Which fictional world is home to the characters Frodo Baggins and Gandalf?", options: ["Narnia", "Middle-earth", "Westeros"], ans: "Middle-earth" },
    { q: "What is the primary function of chlorophyll in plants?", options: ["Water storage", "Energy absorption", "Structural support"], ans: "Energy absorption" },
    { q: "What is the square root of 64?", options: ["7", "8", "9"], ans: "8" },
    { q: "What celestial object orbits the Earth?", options: ["Sun", "Moon", "Mars"], ans: "Moon" },
    { q: "What is the name of the famous clock tower in London?", options: ["Tower Bridge", "London Eye", "Big Ben"], ans: "Big Ben" },
    { q: "What is the largest country by land area?", options: ["USA", "Canada", "Russia"], ans: "Russia" },
    { q: "What is the outermost layer of the Earth called?", options: ["Mantle", "Core", "Crust"], ans: "Crust" },
    { q: "What is the name of the galaxy that contains our solar system?", options: ["Andromeda", "Triangulum", "Milky Way"], ans: "Milky Way" },
    { q: "What is the main gas in the air we breathe?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide"], ans: "Nitrogen" },
    { q: "How many years are in a decade?", options: ["5", "10", "20"], ans: "10" },
    { q: "Who invented the telephone?", options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla"], ans: "Alexander Graham Bell" },
    { q: "What is the name of the fictional detective who lives at 221B Baker Street?", options: ["Hercule Poirot", "Sherlock Holmes", "Miss Marple"], ans: "Sherlock Holmes" },
    { q: "What type of tree produces acorns?", options: ["Maple", "Pine", "Oak"], ans: "Oak" },
    { q: "What is the smallest country in the world?", options: ["Monaco", "Nauru", "Vatican City"], ans: "Vatican City" },
    { q: "What is the primary solvent in the human body?", options: ["Alcohol", "Oil", "Water"], ans: "Water" },
    { q: "In what year did World War II end?", options: ["1945", "1942", "1950"], ans: "1945" },
    { q: "What is the softest mineral on the Mohs scale?", options: ["Gypsum", "Talc", "Calcite"], ans: "Talc" },
    { q: "What is the term for a word that sounds the same as another but has a different meaning and spelling?", options: ["Synonym", "Homophone", "Antonym"], ans: "Homophone" },
    { q: "How many valves does the human heart have?", options: ["Two", "Three", "Four"], ans: "Four" },
    { q: "What famous band released the album 'The Dark Side of the Moon'?", options: ["The Beatles", "Led Zeppelin", "Pink Floyd"], ans: "Pink Floyd" },
    { q: "What is the primary ingredient in cement?", options: ["Sand", "Limestone", "Clay"], ans: "Limestone" },
    { q: "Which sea is located between Europe and Africa?", options: ["Red Sea", "Mediterranean Sea", "Black Sea"], ans: "Mediterranean Sea" },
    { q: "What is the name of the process when water vapor turns into liquid water?", options: ["Evaporation", "Condensation", "Precipitation"], ans: "Condensation" },
    { q: "Which planet is commonly referred to as Earth's twin?", options: ["Mars", "Venus", "Mercury"], ans: "Venus" },
    { q: "What is the main metal in stainless steel?", options: ["Aluminum", "Iron", "Copper"], options: ["Iron", "Copper", "Nickel"], ans: "Iron" },
    { q: "What is the largest country in South America?", options: ["Argentina", "Brazil", "Colombia"], ans: "Brazil" },
    { q: "What is the primary energy source for stars?", options: ["Chemical combustion", "Nuclear fusion", "Friction"], ans: "Nuclear fusion" }
  ];

  // --- Game Rendering Functions (Riddles and Quiz only) ---

  function renderRiddles(showAll = false) {
    container.innerHTML = "";
    const itemsToShow = showAll ? riddles : riddles.slice(0, maxInitialItems);

    itemsToShow.forEach((r, i) => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
<h2>Riddle ${i + 1}</h2>
<p>${r.q}</p>
<p id="answer-${i}" style="display:none;"><b>Answer:</b> ${r.a}</p>
<button class="game-btn" onclick="document.getElementById('answer-${i}').style.display='block'; this.style.display='none';">Show Answer</button>
`;
      container.appendChild(card);
    });

    if (!showAll && riddles.length > maxInitialItems) {
      const showMoreButton = document.createElement("button");
      showMoreButton.className = "game-btn show-more-btn";
      showMoreButton.textContent = `Show More`;
      showMoreButton.onclick = () => {
        renderRiddles(true);
      };
      const buttonWrapper = document.createElement("div");
      buttonWrapper.style.cssText = "width: 100%; text-align: center; margin-top: 20px;";
      buttonWrapper.appendChild(showMoreButton);
      container.appendChild(buttonWrapper);
    }
  }

  function renderQuiz(showAll = false) {
    container.innerHTML = "";
    const itemsToShow = showAll ? quiz : quiz.slice(0, maxInitialItems);

    itemsToShow.forEach((q, i) => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
 <h2>Question ${i + 1}</h2>
 <p>${q.q}</p>
<div class="quiz-feedback" style="margin: 10px 0; font-weight: bold;"></div>
${q.options.map(opt => `<button class="game-btn" onclick="checkAnswer('${opt}','${q.ans}', this)">${opt}</button>`).join(" ")}
`;
      container.appendChild(card);
    });

    if (!showAll && quiz.length > maxInitialItems) {
      const showMoreButton = document.createElement("button");
      showMoreButton.className = "game-btn show-more-btn";
      showMoreButton.textContent = `Show More`;
      showMoreButton.onclick = () => {
        renderQuiz(true);
      };
      const buttonWrapper = document.createElement("div");
      buttonWrapper.style.cssText = "width: 100%; text-align: center; margin-top: 20px;";
      buttonWrapper.appendChild(showMoreButton);
      container.appendChild(buttonWrapper);
    }
  }

  // --- Combined Game Logic ---

  // Quiz Answer Check (Visual Feedback)
  window.checkAnswer = function (selected, correct, btn) {
    const card = btn.parentElement;
    const buttons = card.querySelectorAll('.game-btn');
    const feedbackElement = card.querySelector('.quiz-feedback');

    // Disable all buttons in this card after selection
    buttons.forEach(b => b.disabled = true);

    if (selected === correct) {
      // Highlight correct answer and show success message
      btn.style.background = "#4ad991";
      btn.style.color = "#0d2c1f";
      if (feedbackElement) {
        feedbackElement.innerHTML = '🎉 **Correct!**';
        feedbackElement.style.color = '#4ad991';
      }
    } else {
      // Highlight incorrect choice and show failure message
      btn.style.background = "red";
      if (feedbackElement) {
        feedbackElement.innerHTML = `❌ **Wrong!** The correct answer was: <b>${correct}</b>`;
        feedbackElement.style.color = 'red';
      }

      // Highlight the correct answer
      buttons.forEach(b => {
        if (b.textContent === correct) {
          b.style.background = "#4ad991";
          b.style.color = "#0d2c1f";
        }
      });
    }
  };


  // Button switching (Only includes the 2 desired games)
  gameButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      gameButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const gameType = btn.dataset.game;

      if (gameType === "riddles") renderRiddles();
      else if (gameType === "quiz") renderQuiz();
    });
  });

  // Initial load
  renderRiddles();
});