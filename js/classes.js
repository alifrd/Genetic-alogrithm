
/*
//Test value
var Rate_mutaion = 10;
var Rate_crossover=20;
var Rate_elitism= 10;
var period = 10;
var genetaration_number = 100;
var number_gen = 5 ;
var choromse_number = 10 ;
var tournoment_size = 5;
*/

var Rate_mutaion ;
var Rate_crossover;
var Rate_elitism;
var period;
var genetaration_number;
var number_gen;
var choromse_number;
var tournoment_size;

//chromsome
var Generation=[]
var Chermosmes=[]
var Factor=[]
var slected_by_tournent = [];
var Generation_AVG = [];
var Best = {
	gen : [] ,
	fitness : 9999999999
}

//chromsome class 
function Chermosme(){
	this.gens = [];
	this.fitness = [];
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

//Calucate Fitness
function CalucateFitness(){
	var sum_fitness=0;
	for (var i = 0; i < Chermosmes.length; i++) {
		sum_fitness = 0;
		for (var j = 0; j < Factor.length; j++)
			sum_fitness += Chermosmes[i].gens[j]*Factor[j];
		Chermosmes[i].fitness = sum_fitness;
		if (Math.abs(sum_fitness) < Math.abs(Best.fitness)  ) {
			Best.fitness = sum_fitness;
			Best.gen = [];
			Best.gen = Chermosmes[i].gens.slice(0);
		} 
	}		
}

//Build Generation
function GenerationBuild(){
	Generation.push(Chermosmes);
	if (Generation.length != 1)
		for (var i = 0; i < Generation[Generation.length - 2 ].length; i++)
			if (!Generation[Generation.length - 2 ][i].check)
				Generation[Generation.length - 1 ].push(Generation[Generation.length - 2 ][i])
			
	Clear();
}

//Clear Staged After Build Generation
function Clear(){
	Chermosmes=[];
	choosen=[];
	slected_by_tournent=[];
}

//Sort Choromsom by Fitness
function SortbyFitness(Cherom){
	Cherom.sort(function(obj1, obj2) {
		// Ascending: first age less than the previous
		return Math.abs(obj1.fitness) - Math.abs(obj2.fitness);
	});
	return Cherom;
}

//Elistim 
function Elitism(percentage){
	var selected_size = Math.floor(Generation[Generation.length -1].length*(percentage/100));
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

//Just for test
function CheckUnmark(){
	for (var i = 0; i < Generation[Generation.length -1].length; i++)
			Generation[Generation.length -1][i].check = 0;
}

//Mark Crossed Chromosome 
function CheckMark(genetaration,chorm){

	for (var i = 0; i < genetaration.length; i++)
		if (genetaration[i].gens ===chorm.gens)
			genetaration[i].check = 1;
			
	return genetaration
	
}

//Selection(Tournoment)
function SelectionTournament(slice){
	var lastgeretion = Generation.length;
	var sliced = [];
	for (var i = 0 , j=1 ; i < Generation[lastgeretion-1].length; i++) {
		
		if (j>slice) {
			var sortedsliced=SortbyFitness(sliced);
			slected_by_tournent.push(sortedsliced[0]);
			updated_generation=CheckMark(Generation[lastgeretion-1],sortedsliced[0])
			Generation[lastgeretion-1]=updated_generation;
			sliced = [];
			j=1;
		}
		sliced.push(Generation[lastgeretion-1][i]);
		j++;
	}
	var sortedsliced=SortbyFitness(sliced);
	slected_by_tournent.push(sortedsliced[0]);
			
}


//Crossed Two Chromosme 
function Crossed(parent_one,parent_two){
	var pointer = getRandom(1,Factor.length);
	var children
	//slice
	var slice_one_parent_one=parent_one.gens.slice(0,pointer);
	var slice_two_parent_one=parent_one.gens.slice(pointer,parent_one.length);
	var slice_one_parent_two=parent_two.gens.slice(0,pointer);
	var slice_two_parent_two=parent_two.gens.slice(pointer,parent_two.length);
	//concnat
	var child_one_gen=slice_one_parent_one.concat(slice_two_parent_two);
	var child_two_gen=slice_one_parent_two.concat(slice_two_parent_one);
	
		 
	parent_one.gens=child_one_gen;
	parent_two.gens=child_two_gen;


	return [parent_one,parent_two]
}

//Build Rand Rate
function RateRand(percentage){
	var Rand = getRandom(0,100);
	if (percentage > Rand)
		return true;
	else
		return false;
}

//Cross Over Selection
function CrossOver(){
	var parent_one ;
	var parent_two ;
	var children;
	for (var i = 0; i < slected_by_tournent.length; i++) {
		if (i%2==1 ) {
		  parent_one = Object.assign({}, slected_by_tournent[i-1]) ;
		  parent_two = Object.assign({}, slected_by_tournent[i]);
	
	
		 children = Crossed(parent_one,parent_two);	 
		 if (RateRand(Rate_mutaion))
		 	children[0]=Mutaion(children[0]);	
		 if (RateRand(Rate_mutaion))
		 	children[1]=Mutaion(children[1]);
		 Chermosmes.push(children[0]);
		 Chermosmes.push(children[1]);
		}
	}
}

// Mutation
function Mutaion(child){
	var pointer = getRandom(0,Factor.length);
	child.gens[pointer]=getRandom(-10,10);
	return child;
}

// Avarage Of Generation
function AVG(){
	var sum=0
	for (var i = 0; i < Generation.length  ; i++) {
		sum=0;
		for (var j = 0; j < Generation[i].length; j++)
			sum += Generation[i][j].fitness;	
		Generation_AVG.push(sum/Generation[i].length) 
	}

}




// Run Function
function START(){

	
	 Rate_mutaion = document.getElementById("Mutaion").value ;
	 Rate_crossover=document.getElementById("Crossover").value;
	 Rate_elitism=document.getElementById("Elitism").value;
	 period = document.getElementById("RandPeriod").value;
	 genetaration_number = document.getElementById("Generation").value;
	 number_gen = document.getElementById("Gen").value;
	 choromse_number = document.getElementById("Chromosome").value;
	 tournoment_size = document.getElementById("Tournoment").value;
	

				
		
	SetRandomFactor(number_gen,-period,period);
	ChormoseBuilder(choromse_number,number_gen,-period,period); //(chromsome number , gen number , min gen number , max gen number)
	CalucateFitness();
	GenerationBuild();

	for (var i = 0; i < genetaration_number; i++) {
		Elitism(Rate_elitism);	
		SelectionTournament(tournoment_size);		
		CrossOver();
		CalucateFitness();
		GenerationBuild();
		if (Best.fitness == 0)
			break;
		CheckUnmark();	
	}

	AVG();

	text=document.getElementById("FACTOR").innerHTML;
	text+="[ ";
	for (var i = 0; i < Factor.length; i++) {
		text+=Factor[i];
		text+=",";
	}
	text+="]";
	document.getElementById("FACTOR").innerHTML=text;

	
	text=document.getElementById("BESTFIT").innerHTML;
	document.getElementById("BESTFIT").innerHTML=text+Best.fitness;
	
	text=document.getElementById("BESTGEN").innerHTML;
	text+="[ ";
	for (var i = 0; i < Best.gen.length; i++) {
		text+=Best.gen[i];
		text+=",";
	}
	text+="]";
	
	document.getElementById("BESTGEN").innerHTML=text;
	text=document.getElementById("FITNESS").innerHTML;
	text+="[ ";
	for (var i = 0; i < Generation_AVG.length; i++) {
		text+=Generation_AVG[i];
		text+="<br>";
	}
	text+="]";
	
	document.getElementById("FITNESS").innerHTML=text;
	window.scrollBy(0, 900);
	
}


START();




