class Booking extends HTMLElement {

    constructor() { 
      super();
      this.onSeatClicked = this.onSeatClicked.bind(this);
      this.seats=[];
      this.sectionSelected ="";
      window.addEventListener('SeatClicked',this.onSeatClicked);
    }
    onSeatSelected(seat){
        var totalbookingReq = window.sessionStorage.getItem('tbooking');
        
        if(this.sectionSelected!=="" && this.sectionSelected !== seat.id.split(' ')[0]){
          return;
          // to do
        }
        if(this.seats.length===0){
            var rowid = seat.id.split(' ')[0]+" "+seat.id.split(' ')[1];
            if(document.getElementById(rowid).checkRightEmpty(seat,totalbookingReq)){
                let aSeatids = document.getElementById(rowid).addAllSelection(seat,totalbookingReq);
                this.sectionSelected = this.sectionSelected ? this.sectionSelected : seat.id.split(' ')[0];
                this.seats.push(...aSeatids); 
                return;
            }
        }
        if(this.seats.length == totalbookingReq){
            let removedSeat =  this.seats.shift();
            document.getElementById(removedSeat).removeSelection();
            
        }
        seat.addSelection();

        //onfirst time seat is selected
        this.sectionSelected = this.sectionSelected ? this.sectionSelected : seat.id.split(' ')[0];
        this.seats.push(seat.id);
        
    }

    calculateAndUpdatePrice(){
        var price=0;

        for(let i=0;i< this.seats.length;i++){
            price  =  price + parseInt(document.getElementById(this.seats[i]).getAttribute('price'));
        }

        this.price.innerHTML= "Total Price" + price;

    }
    onSeatUnSelected(seat){
        let id = seat.id;
        let index =  this.seats.indexOf(id);
        this.seats.splice(index, 1);
        seat.removeSelection();
        if(this.seats.length===0){
            this.sectionSelected = "";
        }
    }

    onSeatClicked(oData){
        debugger;
        if(oData.detail && oData.detail.seat){
        let seat = oData.detail.seat;
            if(!seat.getAttribute("reserved")){
                this.onSeatSelected(seat);
            }
        else{
            this.onSeatUnSelected(seat);
            }
        }
        this.calculateAndUpdatePrice();
    }
  
    connectedCallback() {
debugger;
      // main section which has all the lists 
      var exectiveSection = document.createElement('booking-section');
      exectiveSection.id = "exectiveSection"
      exectiveSection.className = "section";
      exectiveSection.setAttribute('seats',85);
      exectiveSection.setAttribute('rows',8);
      exectiveSection.setAttribute('title',"Exective Section");

      var clubSection = document.createElement('booking-section');
      clubSection.id = "clubSection"
      clubSection.className = "section";
      clubSection.setAttribute('seats',27);
      clubSection.setAttribute('rows',2);
      clubSection.setAttribute('title',"Club Section");

      
      this.price = document.createElement('div');


      this.appendChild(clubSection);
      this.appendChild(exectiveSection);
      this.appendChild(this.price);

    }
  
  }
  customElements.define('ankit-booking', Booking);