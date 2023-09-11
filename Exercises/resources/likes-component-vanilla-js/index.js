class LikesComponent {
  constructor(numberOfLikes = 0, like = false) {
    // List of initial input values
    this.numberOfLikes = numberOfLikes;
    this.like = like;

    this.init();
  }

  // List of instructions to create the template and attach the events handlers
  init() {
    this.button = document.createElement('button');

    this.text = document.createTextNode('');

    this.icon = document.createElement('i');
    this.icon.classList.add('icon');
    this.icon.textContent = ' ❤ ';

    this.button.appendChild(this.text);
    this.button.appendChild(this.icon);

    this.updateView();

    // Attach "event binding" (from view to component)
    this.button.addEventListener('click', () => this.toggleLike());
  }

  // "Event binding" handler
  toggleLike() {
    this.like = !this.like;

    this.updateView();
  }

  // Run "property binding" (from component to view)
  updateView() {
    this.text.textContent = this.numberOfLikes + (this.like ? 1 : 0);
    this.icon.classList[this.like ? 'add' : 'remove']('liked');
  }

  // Return the root element of the component
  get element() {
    return this.button;
  }
}

function bootstrap(componentInstance, rootElement) {
  rootElement.appendChild(componentInstance.element);
}

const componentInstance = new LikesComponent(3, false);
const rootElement = document.getElementById('root');
bootstrap(componentInstance, rootElement);
