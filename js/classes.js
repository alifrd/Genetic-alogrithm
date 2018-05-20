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



//build random factor
function SetRandomFactor(num,min,max){
	for (var i = 0; i < num; i++)
		GetFactor(getRandom(min,max));
}

// set factor
function GetFactor(fac){
	Factor.push(fac);
}


function CalucateFitness(){
	var sum_fitness=0;
	for (var i = 0; i < Chermosmes.length; i++) {
		sum_fitness = 0;
		for (var j = 0; j < Factor.length; j++)
			sum_fitness += Chermosmes[i].gens[j]*Factor[j];
		Chermosmes[i].fitness = sum_fitness;
		if (Math.abs(sum_fitness) < Math.abs(Best.fitness)  ) {
			Best.fitness = sum_fitness;
			Best.gen = Chermosmes[i].gens.slice(0);
		} 
	}		
}


function GenerationBuild(){
	Generation.push(Chermosmes);
	
	Clear();
}

function Clear(){
	Chermosmes=[];
	choosen=[];
}

function SortbyFitness(Cherom){
	Cherom.sort(function(obj1, obj2) {
		// Ascending: first age less than the previous
		return Math.abs(obj1.fitness) - Math.abs(obj2.fitness);
	});
	return Cherom;
}

function Elitism(percentage){
	var selected_size = Math.floor(Generation[Generation.length -1].length*(percentage/100));
	console.log(selected_size);
	var lastgeretion = Generation.length;
	var lastchrom=Generation[lastgeretion-1].slice(0);
	var sortedchrom=SortbyFitness(lastchrom);
	var updated_generation
	for (var i = 0 ; i < selected_size ; i++) {
		Chermosmes.push(sortedchrom[i]);
		updated_generation=CheckMark(Generation[lastgeretion-1],sortedchrom[i])
		Generation[lastgeretion-1]=updated_generation;
	}
}


function CheckUnmark(){
	for (var i = 0; i < Chermosmes.length; i++)
			Chermosmes[i].check = 0;
}

function CheckMark(genetaration,chorm){

	for (var i = 0; i < genetaration.length; i++)
		if (genetaration[i].gens ===chorm.gens)
			genetaration[i].check = 1;
			
	return genetaration
	
}

function SelectionTournament(slice){
	var lastgeretion = Generation.length;
	var sliced = [];
	for (var i = 0 , j=1 ; i < Generation[lastgeretion-1].length; i++) {
		
		if (j>slice) {
			var sortedsliced=SortbyFitness(sliced);
			slected_by_tournent.push(sortedsliced[0]);	
			sliced = [];
			j=1;
		}
		sliced.push(Generation[lastgeretion-1][i]);
		j++;
	}
	var sortedsliced=SortbyFitness(sliced);
	slected_by_tournent.push(sortedsliced[0]);
	updated_generation=CheckMark(Generation[lastgeretion-1],sortedsliced[0])
	Generation[lastgeretion-1]=updated_generation;
		
		
}




