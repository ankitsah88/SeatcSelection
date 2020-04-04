class Seat extends HTMLElement {

    constructor() { 
      super();
      this.onSeatClicked = this.onSeatClicked.bind(this);
    }

    onSeatClicked(){
      
      window.dispatchEvent(new CustomEvent('SeatClicked', { detail:{seat:this}}));
    }
    
    removeSelection(){
      
      this.removeAttribute('reserved');
      this.classList.remove("reserved"); 
    }

    addSelection(){
      this.setAttribute('reserved',"true");
      this.classList.add('reserved'); 
    }

    connectedCallback() {
      var content = document.createElement('span');
      content.innerHTML=this.getAttribute('index');
      if(this.getAttribute('chrages')){
        content.innerHTML = content.innerHTML +" ex";
      }
      content.class="seat";
      if(this.getAttribute("booked")==="false"){
        this.onclick = this.onSeatClicked;
      }else{
        this.classList.add("booked");
      }
      this.appendChild(content);

    }
  
  }
  
  customElements.define('booking-seat', Seat);