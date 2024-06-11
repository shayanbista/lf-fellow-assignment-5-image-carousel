// style the container
function setStyleContainer(
  element: HTMLElement,
  width: number,
  height: number
) {
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  element.style.border = "1px solid black";
  element.style.position = "relative";
  element.style.overflow = "hidden"; // Ensure overflow is hidden
}
// style the wrapper
function setStyleWrapper(element: HTMLElement, width: number, height: number) {
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  element.style.overflow = "hidden";
  element.style.position = "relative";
}

// style the arrow button
function setStyleArrow(
  button: HTMLButtonElement,
  text: string,
  position: string
) {
  button.textContent = text;
  button.style.position = "absolute";
  button.style.top = "50%";
  button.style.transform = "translateY(-50%)";
  button.style.zIndex = "10";
  button.style.border = "none";
  button.style.background = "rgba(0, 0, 0, 0.5)";
  button.style.color = "white";
  button.style.padding = "10px";
  button.style.cursor = "pointer";
  button.style.borderRadius = "50%";
  button.style.fontSize = "20px";
  if (position === "left") {
    button.style.left = "10px";
  } else {
    button.style.right = "10px";
  }
}

// style the dot container
function setStyleDotsContainer(dotsContainer: HTMLDivElement): void {
  dotsContainer.style.position = "absolute";
  dotsContainer.style.bottom = "20px";
  dotsContainer.style.left = "50%";
  dotsContainer.style.transform = "translateX(-50%)";
  dotsContainer.style.display = "flex";
  dotsContainer.style.gap = "10px";
}

function setStyleImage(image: HTMLElement, index: number): void {
  image.style.position = "absolute";
  image.style.top = "0";
  image.style.left = `${index * 100}%`;
}

// function to animate the images
function animateImage(
  images: NodeListOf<HTMLElement>,
  currentIndex: number
): void {
  images.forEach((image, index) => {
    image.style.transition = "left 2s ease";
    image.style.left = `${(index - currentIndex) * 100}%`;
    image.style.width = "100%";
    image.style.height = "100%";
    image.style.objectFit = "cover";
  });
}

class ImageCarousel {
  width: number;
  height: number;
  containerElement: HTMLElement;
  containerWrapper: HTMLElement;
  arrowLeft: HTMLButtonElement;
  arrowRight: HTMLButtonElement;
  images: NodeListOf<HTMLImageElement>;
  currentIndex: number;
  dotsContainer: HTMLDivElement;
  dots: HTMLSpanElement[];
  isAnimating: boolean;
  autoSlideInterval: number | undefined;
  intervalTime: number;

  constructor(
    width: number,
    height: number,
    containerElement: HTMLElement,
    containerWrapper: HTMLElement,
    intervalTime: number
  ) {
    this.width = width;
    this.height = height;
    this.containerElement = containerElement;
    this.containerWrapper = containerWrapper;
    this.arrowLeft = document.createElement("button");
    this.arrowRight = document.createElement("button");
    this.currentIndex = 0;
    this.isAnimating = true;
    this.intervalTime = intervalTime;

    this.dotsContainer = document.createElement("div");
    this.dots = [];
    this.images = document.querySelectorAll(
      `#${containerWrapper.id} .img`
    ) as NodeListOf<HTMLImageElement>;

    this.CarouselStyle();
    this.eventTriggers();
    this.updateDots();
    this.displayImage();
    this.startAutoSlide();
  }

  // this section hold the styling parts of the container
  CarouselStyle() {
    setStyleContainer(this.containerElement, this.width, this.height);
    setStyleWrapper(this.containerWrapper, this.width, this.height);
    setStyleArrow(this.arrowLeft, "<", "left");
    setStyleArrow(this.arrowRight, ">", "right");
    this.containerElement.appendChild(this.arrowLeft);
    this.containerElement.appendChild(this.arrowRight);
    this.containerElement.appendChild(this.dotsContainer);

    setStyleDotsContainer(this.dotsContainer);

    this.images.forEach((image, index) => {
      image.style.position = "absolute";
      image.style.top = "0";
      image.style.left = `${index * 100}%`;

      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.style.width = "12px";
      dot.style.height = "12px";
      dot.style.borderRadius = "50%";
      dot.style.background = "gray";
      dot.style.cursor = "pointer";
      dot.style.transition = "background 0.3s ease";
      dot.style.display = "inline-block";
      dot.addEventListener("click", () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
      this.dots.push(dot);
    });
  }

  // this section triggers events
  eventTriggers() {
    this.arrowLeft.addEventListener("click", () => this.changeSlide(-1));
    this.arrowRight.addEventListener("click", () => this.changeSlide(1));
  }

  // this method helps to change slide

  changeSlide(direction: number) {
    if (this.isAnimating) {
      this.stopAutoSlide();
      this.currentIndex += direction;
      this.currentIndex =
        this.currentIndex < 0
          ? this.images.length - 1
          : this.currentIndex >= this.images.length
          ? 0
          : this.currentIndex;
      animateImage(this.images, this.currentIndex);
      this.updateDots();
      this.startAutoSlide();
    }
  }
  // this secition helps to select the slide from ball

  goToSlide(index: number) {
    this.currentIndex = index;
    this.displayImage();
    this.updateDots();
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  displayImage() {
    animateImage(this.images, this.currentIndex);
  }

  // update the dots
  updateDots() {
    this.dots.forEach((dot, index) => {
      dot.style.background = index === this.currentIndex ? "white" : "gray";
    });
  }

  // start animation
  startAutoSlide() {
    this.autoSlideInterval = window.setInterval(
      () => this.changeSlide(1),
      this.intervalTime
    );
  }

  stopAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }
}

// this section creates the multiple instances
const container1 = document.getElementById(
  "carousel-container-id1"
) as HTMLElement;
const containerWrapper1 = document.getElementById(
  "carousel-wrapper-id1"
) as HTMLElement;
const container2 = document.getElementById(
  "carousel-container-id2"
) as HTMLElement;
const containerWrapper2 = document.getElementById(
  "carousel-wrapper-id2"
) as HTMLElement;
const container3 = document.getElementById(
  "carousel-container-id3"
) as HTMLElement;
const containerWrapper3 = document.getElementById(
  "carousel-wrapper-id3"
) as HTMLElement;
const container4 = document.getElementById(
  "carousel-container-id4"
) as HTMLElement;
const containerWrapper4 = document.getElementById(
  "carousel-wrapper-id4"
) as HTMLElement;

const carousel1 = new ImageCarousel(
  300,
  400,
  container1,
  containerWrapper1,
  2000
);
const carousel2 = new ImageCarousel(
  300,
  400,
  container2,
  containerWrapper2,
  3000
);
const carousel3 = new ImageCarousel(
  300,
  400,
  container3,
  containerWrapper3,
  4000
);
const carousel4 = new ImageCarousel(
  300,
  400,
  container4,
  containerWrapper4,
  5000
);
