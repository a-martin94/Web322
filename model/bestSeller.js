const bestSeller=
{
    bSfakeDB:[],

    init()
    {
        
        
        this.fakeDB.push({title:'One room rental',description:`ROOOM!`,price:`ROom$`, src: `img/ball.jpg`, bestSeller: true});
    
        this. fakeDB.push({title:'Blender',description:`Kitchen!`, price:`170.00$`, src: `img/blender.jpg`});
    
        this.fakeDB.push({title:'chips',description:`Food!`, price:`5.00$`, src: `img/chips.jpg`});

        this.fakeDB.push({title:'Coke',description:`Food!`, price:`2.00$`, src: `img/coke.jpg`});


    },

    getAllProducts()
    {

        return this.bSfakeDB;
    }
}




bestSeller.init();
module.exports=bestSeller;