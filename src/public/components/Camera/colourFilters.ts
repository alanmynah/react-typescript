export const colourEffect = (imageData: ImageData, colour: string): ImageData => {
  switch (colour) {
    case "red":
      return intensifyColour(imageData, 0);
    case "green":
      return intensifyColour(imageData, 1);
    case "blue":
      return intensifyColour(imageData, 2);
    default:
      return imageData;
  }
};

const intensifyColour = (imageData: ImageData, colourPosition: number) => {
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i + colourPosition] = 150;
  }
  return imageData;
};
