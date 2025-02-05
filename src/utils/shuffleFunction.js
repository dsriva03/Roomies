// Function to shuffle an array

export function shuffle (choresArray) {
  const shuffledArray = [];
  while(choresArray.length !== 0){
    const arrayLength = choresArray.length-1;
    const randomNum = Math.floor(Math.random() * (arrayLength + 1));
    shuffledArray.push(choresArray[randomNum]);
    choresArray.splice(randomNum, 1);
  }

  return shuffledArray;
}

