function styleContainer(element: HTMLElement, width: number, height: number) {
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  element.style.border = "1px solid black";
  element.style.position = "relative";
  element.style.overflow = "hidden";
}

function styleWrapper(element: HTMLElement, width: number, height: number) {
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  element.style.overflow = "hidden";
  element.style.position = "relative";
}

function animateImage(images: NodeList, currentIndex: number) {
  const slidingImages = images as NodeListOf<HTMLElement>;

  slidingImages.forEach((image, index) => {
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
    this.currentIndex = 0;
    this.isAnimating = true;

    this.dotsContainer = document.createElement("div");
    this.dots = [];
    this.images = document.querySelectorAll(
      ".img"
    ) as NodeListOf<HTMLImageElement>;

    this.CarouselStyle();
    this.addEventListeners();
    this.updateDots();
    this.displayImage();

    this.startAutoSlide();
  }

  // style the whole carousel
  CarouselStyle() {
    styleContainer(this.containerElement, this.height, this.width);
    styleWrapper(this.containerWrapper, this.height, this.width);
    this.styleArrow(this.arrowLeft, "<");
    this.styleArrow(this.arrowRight, ">");
    this.styleDotsContainer();

    this.containerElement.appendChild(this.arrowLeft);
    this.containerElement.appendChild(this.arrowRight);
    this.containerElement.appendChild(this.dotsContainer);

    this.images.forEach((image, index) => {
      image.style.position = "absolute";
      image.style.top = "0";
      image.style.left = `${index * 100}%`;
      image.style.objectFit = "cover";
      image.style.transition = "left 2s ease";

      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.style.width = "10px";
      dot.style.height = "10px";
      dot.style.borderRadius = "50%";
      dot.style.background = "gray";
      dot.style.cursor = "pointer";
      dot.addEventListener("click", () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
      this.dots.push(dot);
    });
  }

  addEventListeners() {
    this.arrowLeft.addEventListener("click", () => this.changeSlide(-1, true));
    this.arrowRight.addEventListener("click", () => this.changeSlide(1, true));
  }

  changeSlide(direction: number, event: boolean) {
    this.currentIndex += direction;

    this.currentIndex =
      this.currentIndex < 0
        ? this.images.length - 1
        : this.currentIndex >= this.images.length
        ? 0
        : this.currentIndex;

    this.isAnimating = true;

    if (event) {
      console.log("event is called");
      this.stopAutoSlide();
      this.startAutoSlide();
    }
    animateImage(this.images, this.currentIndex);
    this.updateDots();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.displayImage();
    this.updateDots();
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  displayImage() {
    this.images.forEach((image, index) => {
      image.style.left = `${(index - this.currentIndex) * 100}%`;
    });
  }

  updateDots() {
    this.dots.forEach((dot, index) => {
      dot.style.background = index === this.currentIndex ? "black" : "orange";
    });
  }

  startAutoSlide() {
    this.autoSlideInterval = window.setInterval(() => {
      this.changeSlide(1, false);
    }, 4000);
  }

  stopAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }

  styleArrow(button: HTMLButtonElement, text: string) {
    button.textContent = text;
    button.style.position = "absolute";
    button.style.top = "50%";
    button.style.transform = "translateY(-50%)";
    button.style.background = "rgba(0, 0, 0, 0.5)";
    button.style.color = "white";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.style.zIndex = "1";
    if (text === "<") {
      button.style.left = "0";
    } else {
      button.style.right = "0";
    }
  }

  styleDotsContainer() {
    this.dotsContainer.style.position = "absolute";
    this.dotsContainer.style.bottom = "10px";
    this.dotsContainer.style.left = "50%";
    this.dotsContainer.style.transform = "translateX(-50%)";
    this.dotsContainer.style.display = "flex";
    this.dotsContainer.style.gap = "10px";
  }
}

const container = document.getElementById(
  "carousel-container-id"
) as HTMLElement;

const containerWrapper = document.getElementById(
  "carousel-wrapper-id"
) as HTMLElement;

const carousel = new ImageCarousel(500, 500, container, containerWrapper);
