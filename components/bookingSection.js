class BookingSection extends HTMLElement {

    constructor() { 
      super();
     
    }
  
    connectedCallback() {
        var row;
        for(let i=1;i<=this.getAttribute('rows');i++){
        row = document.createElement('booking-row');
        row.id = this.id +" row"+i
        row.className = "row";
        if(i>4){
        row.setAttribute('seats',12);
        }else{
        row.setAttribute('seats',9);
        }
        this.appendChild(row);
        }
    }
  
  }
  
  customElements.define('booking-section', BookingSection);