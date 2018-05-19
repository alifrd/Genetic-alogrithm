//chromsome
var Generation=[]
var Chermosmes=[]
var Factor=[]
var Best = {
	gen : [] ,
	fitness : 9999999999
}
var slected_by_tournent = [];
var Rate_mutaion = 10;
var Rate_crossover=20;


//chromsome class 
function Chermosme(){
	this.gens = [];
	this.fitness = [];
	this.num = 0;
	this.check = 0;
	this.addgen = function(gen){
		this.gens.push(gen);
		this.num++;
	}
}

//build random 
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


//build random chromsome
function ChormoseBuilder(chrom_num,gen_num,min,max){
	for (var i = 0; i < chrom_num; i++) {
		Chermosmes[i] = new Chermosme();	
		for (var j = 0; j < gen_num; j++)
				Chermosmes[i].addgen(getRandom(-10,10));	
	}
}
