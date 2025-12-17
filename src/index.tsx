import { furnituresPictures } from "./Pictures/furnitures/furnituresPictures";
import "./App.css";

import { root } from "@lynx-js/react";
import Gallery from "./Gallery";

function PictureList() {
  return <Gallery pictureData={furnituresPictures} />;
}

root.render(<PictureList />);
