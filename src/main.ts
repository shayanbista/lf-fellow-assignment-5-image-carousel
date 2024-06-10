class Carousel {
  width: number;
  height: number;
  containerElement: HTMLElement;
  containerWrapper: HTMLElement;
  arrowLeft: HTMLButtonElement;
  arrowRight: HTMLButtonElement;

  constructor(
    width: number,
    height: number,
    containerElement: HTMLElement,
    containerWrapper: HTMLElement
  ) {
    this.width = width;
    this.height = height;
    this.containerElement = containerElement;
    this.containerWrapper = containerWrapper;
    this.arrowLeft = document.createElement("button");
    this.arrowRight = document.createElement("button");
    console.log(
      this.height,
      this.width,
      this.containerElement,
      this.containerWrapper
    );
  }

  ContainerStyling() {
    // container styling
    this.containerElement.style.width = `${this.width}px`;
    this.containerElement.style.height = `${this.height}px`;
    this.containerElement.style.border = "1px solid black";
    this.containerElement.style.position = "relative";
    this.containerWrapper.style.width = `${this.width - 100}px`;
    this.containerWrapper.style.height = `${this.height - 100}px`;
    this.containerWrapper.style.backgroundColor = "green";

    this.arrowLeft.innerHTML = "&#8656";
    this.arrowRight.innerHTML = "&#8658";

    this.arrowLeft.style.position = "absolute";
    this.arrowLeft.style.top = `${this.height / 2}px`;
    this.arrowLeft.style.left = "0px";
    this.arrowLeft.style.cursor = "pointer";

    this.arrowRight.style.cursor = "pointer";
    this.arrowRight.style.position = "absolute";
    this.arrowRight.style.top = `${this.height / 2}px`;
    this.arrowRight.style.left = `${this.width - 25}px`;

    // appending the arrows
    this.containerElement.appendChild(this.arrowLeft);
    this.containerElement.appendChild(this.arrowRight);

    // event listners
    this.arrowLeft.addEventListener("click", this.slideLeft.bind(this));
    this.arrowRight.addEventListener("click", this.slideRight.bind(this));
  }

  slideLeft() {
    console.log("left slide called");
  }

  slideRight() {
    console.log("right slide called");
  }
}

const container = document.getElementById(
  "carousel-container-id"
) as HTMLElement;

const containerWrapper = document.getElementById(
  "carousel-wrapper-id"
) as HTMLElement;

const carousel = new Carousel(500, 500, container, containerWrapper);
carousel.ContainerStyling();
