class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.isOpen = false;
        this.shadowRoot.innerHTML = `
        <style>
            #backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(0,0,0,0.25);
                z-index: 10;
                opacity: 0;
                pointer-events: none;
            }
            #modal {
                position: fixed;
                top: 10vh;
                left: 25%;
                width: 50%;
                z-index: 100;
                background: white;
                border-radious: 3px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.26);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease-out;
            }
            header {
                padding: 1rem;
                border-bottom: 1px solid #ccc;
            }

            /*header h1 {
                font-size: 1.25rem;
            }*/

            ::slotted(h1) {
                font-size: 1.25rem;
                margin: 0;
            }
            :host([opened]) #backdrop,
            :host([opened]) #modal
             {
                opacity: 1;
                pointer-events: all;
            }

            :host([opened]) #modal {
                top: 15vh;
            }

            #main {
                padding: 1rem;
            }

            #actions {
                border-top: 1px solid #ccc;
                padding: 1rem;
                display: flex;
                justify-content: flex-end;
            }

            #action button {
                margin: 0 .25rem;
            }


        </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <!--<h1>Please confirm</h1>-->
                    <slot name="title"></slot>
                </header>
                <section id="main">
                    <slot name="main"></slot>
                </section>
                <section id="actions">
                    <button id="cancel-button">Cancel</button>
                    <button id="confirm-button">Okay</button>
                </section>
            </div>
        `;

        const slots = this.shadowRoot.querySelectorAll('slots');

        const cancelButton = this.shadowRoot.getElementById("cancel-button");
        const confirmButton = this.shadowRoot.getElementById("confirm-button");
        const backDrop = this.shadowRoot.getElementById('backdrop');
        cancelButton.addEventListener('click', this._cancel.bind(this));
        confirmButton.addEventListener('click', this._confirm.bind(this));
        backDrop.addEventListener('click',this._cancel.bind(this));

        
    }

    attributeChangedCallback(name, oldValue, newValue) {
       // if (name === 'opened') {
            if (this.hasAttribute('opened')) {
                // this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
                // this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
                // this.shadowRoot.querySelector('#modal').style.opacity = 1;
                // this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
                this.isOpen = true;

            } else {
                this.isOpen = false;
            }
       // }
    }

    // static get observedAttribute() {
    //     return ['opened'];
    // }
    open() {
        this.setAttribute('opened','');
        this.isOpen = true;
    }

    hide() {
        if (this.hasAttribute('opened')) {
            this.removeAttribute('opened');
            this.isOpen = false;
        }
            
    }

    _cancel(event) {
        this.hide();
        const cancelEvent = new Event('cancelled');
        this.dispatchEvent(cancelEvent)
    }

    _confirm(event) {
        this.hide();
        const confirmedEvent = new Event('confirmed');
        this.dispatchEvent(confirmedEvent)
      
    }
}

customElements.define('dk-modal',Modal)