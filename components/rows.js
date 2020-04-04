class Row extends HTMLElement {

    constructor() { 
      super();
     this.checkRightEmpty =this.checkRightEmpty.bind(this);
     this.addAllSelection =this.addAllSelection.bind(this);
    }

    addAllSelection(seat,totalBooking){
        var seatid = Number(seat.getAttribute('index'));
        var seats = [];
        for(let i=0;i<totalBooking;i++){
            document.getElementById(this.id+" seat"+(seatid+i)).addSelection();
            seats.push(this.id+" seat"+(seatid+i));   
        }
        return seats;
    }
    checkRightEmpty(seat,totalBooking){
        
        var seatid = Number(seat.getAttribute('index'));
        for(let i=1;i<totalBooking;i++){
            if(document.getElementById(this.id+" seat"+(seatid+i)).getAttribute('booked')=="true"){
                return false;
            }
            return true;

        }

    }
    connectedCallback() {
        var seat;
        var content = document.createElement('div');
        for(let i=1;i<this.getAttribute('seats');i++){
        seat = document.createElement('booking-seat');
        seat.id = this.id+" seat"+i
        seat.className = "seat";
        seat.setAttribute('index',i);
        if(i==3){
        seat.setAttribute('booked',"true");
        }else{
            seat.setAttribute('booked',"false");
        }
        if(i==1 || i== this.getAttribute('seats')-1){
        seat.setAttribute('price',250);
        seat.setAttribute('chrages','ex');
        }else{
            seat.setAttribute('price',150); 
        }
        
        content.appendChild(seat);
        }
        this.appendChild(content);
    }
  
  }
  
  customElements.define('booking-row', Row);