const selectBreed = document.getElementById("breed-name");
const fetchButton = document.getElementById("fetch-btn");
const dogBreedImageList = document.getElementById("breed-images-list");

// console.log(inputField, fetchButton, dogBreedList);

const fetchedData = async () => {
  const fetchResponse = await fetch("https://dog.ceo/api/breeds/list/all");
  const fetchList = await fetchResponse.json();

  let dogList = fetchList.message;
  // console.log(dogList);

  let defaultOption = document.createElement("option");
  defaultOption.innerText = "Choose breed";
  selectBreed.appendChild(defaultOption);

  for (let breed in dogList) {
    let dogName = document.createElement("option");
    dogName.innerText = breed;
    selectBreed.appendChild(dogName);
    // console.log(breed);
  }

  fetchButton.addEventListener("click", () => {
    fetchedRandomImageData();
  });

  selectBreed.addEventListener("change", (e) => {
    // console.log(e.target.value);

    let dogBreed = e.target.value;
    // console.log(dogBreed);

    const fetchedImageData = async () => {
      const imageDataResponse = await fetch(
        `https://dog.ceo/api/breed/${dogBreed}/images/random`
      );
      const imageData = await imageDataResponse.json();
      // console.log(imageData.message);
      let dogImageUrl = imageData.message;

      const breedName = extractBreedFromUrl(dogImageUrl);
      console.log(breedName);

      let listItem = document.createElement("li");
      let dogTitle = document.createElement("h3");
      dogTitle.innerText = breedName;

      let dogImage = document.createElement("img");
      dogImage.src = dogImageUrl;
      dogImage.width = 200;
      dogImage.height = 200;
      dogBreedImageList.appendChild(listItem);
      listItem.appendChild(dogImage);
      listItem.appendChild(dogTitle);
    };
    fetchedImageData();
  });
};

const fetchedRandomImageData = async () => {
  let randomImageData = await fetch("https://dog.ceo/api/breeds/image/random");
  let randomImage = await randomImageData.json();
  let randomImageUrl = randomImage.message;

  const breedName = extractBreedFromUrl(randomImageUrl);
  console.log(breedName);

  let dogImage = document.createElement("img");
  let dogTitle = document.createElement("h3");
  let listItem = document.createElement("li");
  dogTitle.innerText = breedName;

  dogImage.src = randomImageUrl;
  dogImage.width = 200;
  dogImage.height = 200;
  dogBreedImageList.appendChild(listItem);
  listItem.appendChild(dogImage);
  listItem.appendChild(dogTitle);
};

const extractBreedFromUrl = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 2];
};

fetchedRandomImageData();
fetchedData();
