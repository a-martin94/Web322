const products=
{
    fakeDB:[],

    init()
    {
        
        
        this.fakeDB.push({title:'Room1',description:`One bed, new finish`,price:`$99.00 CAD/night`, src: `img/room2.jpg`, bestSeller: true});
    
        this. fakeDB.push({title:'Room2',description:`Nice room!`, price:`$170.00 CAD/night`, src: `img/room3.jpg`});
    
        this.fakeDB.push({title:'Room3',description:`Fair price!`, price:`$75.00 CAD/night`, src: `img/room4.jpg`});

        
        this.fakeDB.push({title:'Room4',description:`Very clean`, price:`$95.00 CAD/night`, src: `img/room5.jpg`});

        this.fakeDB.push({title:'Room5',description:`Kitchen included`, price:`$200.00 CAD/night`, src: `img/room6.jpg`});

        this.fakeDB.push({title:'Room6',description:`Excellent views`, price:`$120.00 CAD/night`, src: `img/room7.jpg`});


    },

    getAllProducts()
    {

        return this.fakeDB;
    }
}




products.init();
module.exports=products;