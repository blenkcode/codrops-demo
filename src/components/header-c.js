class Header extends HTMLElement {
  constructor() {
    super();
    this._rendered = false;
  }

  connectedCallback() {
    if (!this._rendered) {
      this.render();
      this._rendered = true;
    }
  }

  disconnectedCallback() {
    this._rendered = false;
  }

  render() {
    this.innerHTML = /*html*/ `
      <nav class="nav">
      <div class="overflow"> 
        <link-c href="/">Home</link-c>
         </div>
         <div class="overflow">
        <link-c href="/alternative-page">Alternative page</link-c>
        </div>
      </nav>
    `;
  }
}

customElements.define("header-c", Header);
