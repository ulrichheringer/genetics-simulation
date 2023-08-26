const canvas = document.getElementById("simulation");
const ctx = canvas.getContext("2d");

function randomSort(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let k = array[i];
        array[i] = array[j];
        array[j] = k;
    }
    return array;
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
}

class Species {
    constructor(color) {
        this.males = new Array();
        this.females = new Array();
        this.color = color;
        this.generate();
        console.log("generated one male and one female");
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let mili = now.getMilliseconds();
        console.log(
            "Impresso:",
            hours + ":" + minutes + ":" + seconds + ":" + mili + ", machos:",
            this.males
        );
        now = new Date();
        hours = now.getHours();
        minutes = now.getMinutes();
        seconds = now.getSeconds();
        mili = now.getMilliseconds();
        console.log(
            "Impresso:",
            hours + ":" + minutes + ":" + seconds + ":" + mili + ", femeas:",
            this.females
        );
        this.procriate();
    }
    print() {
        console.log("males:", this.males);
        console.log("females:", this.females);
    }
    procriate() {
        this.males = randomSort(this.males);
        this.females = randomSort(this.females);
        let child = this.males[0].createChild(this.females[0]);
        if (child == null) {
            this.generate();
            this.procriate();
            return;
        }
        if (child.sex == true) {
            this.females.push(child);
        } else {
            this.males.push(child);
        }
    }
    generate() {
        let male = new Personagem(this.color);
        console.log("é um?", male.sex);
        if (male.sex != false) {
            this.generate();
            return;
            // male = new Personagem(this.color);
        }
        console.log("mandei um macho");

        this.males.push(male);
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let mili = now.getMilliseconds();
        console.log(
            "Impresso @ generate:",
            hours + ":" + minutes + ":" + seconds + ":" + mili + ", machos:",
            this.males
        );
        let female = new Personagem(this.color);
        while (female.sex == false) {
            female = new Personagem(this.color);
        }
        console.log("mandei uma femea");
        this.females.push(female);
        now = new Date();
        hours = now.getHours();
        minutes = now.getMinutes();
        seconds = now.getSeconds();
        mili = now.getMilliseconds();
        console.log(
            "Impresso @ generate:",
            hours + ":" + minutes + ":" + seconds + ":" + mili + ", femeas:",
            this.females
        );
    }
    age() {
        for (let i = 0; i < this.males.length; i++) {
            this.males[i].next();
        }
        for (let i = 0; i < this.females.length; i++) {
            this.females[i].next();
        }
        this.males = randomSort(this.males);
        this.females = randomSort(this.females);
        for (let i = 0; i < this.males.length; i++) {
            if (this.females[i]) {
                let child = this.males[i].createChild(this.females[i]);
                if (child == null) continue;
                console.log("Um filho foi gerado");
                if (child.sex == true) {
                    console.log("É mulher");
                    this.females.push(child);
                } else {
                    console.log("É Homem");
                    this.males.push(child);
                }
            }
        }
    }
}

class Personagem {
    constructor(color) {
        this.isDead = false;
        this.id = uuidv4();
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let mili = now.getMilliseconds();
        console.log(
            "Comecei a gerar:",
            hours + ":" + minutes + ":" + seconds + ":" + mili + ", id:",
            this.id
        );
        this.x = Math.floor(Math.random() * 1000) + 10;
        this.y = Math.floor(Math.random() * 600) + 10;
        this.color = color;
        //this.chance = Math.random() * 1;
        this.vegetarian = null; // Boolean
        this.procriate = null; // Boolean
        this.sex = null; // Boolean
        this.canibal = false; // Boolean
        this.necessity = 10; // Número float randômico
        this.procriate_rate = 1;
        this.death_rate = 1; // Número float randômico
        this.lifetime = Math.floor(Math.random() * 100 + 75); // Número int randômico
        this.age = 0; // Número int randômico
        this.food_finding = Math.random() * 2; // Número float randômico
        // for(let i = 0; i<array.length;i++){array[i]=Math.floor(Math.random()*9);}
        this.genes = new Array(8);
        this.children = new Array();
        for (let i = 0; i < this.genes.length; i++) {
            let random = Math.floor(Math.random() * 9);
            if (i == 1) random = Math.floor(Math.random() * 6);
            if (i == 0 || i == 2) random = Math.floor(Math.random() * 2);
            this.genes[i] = random;
        }
        this.process();
        //console.log(this);
        now = new Date();
        hours = now.getHours();
        minutes = now.getMinutes();
        seconds = now.getSeconds();
        mili = now.getMilliseconds();
        console.log(
            "Foi gerado um agora:",
            hours +
                ":" +
                minutes +
                ":" +
                seconds +
                ":" +
                mili +
                ", id:" +
                this.id
        );
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    process() {
        switch (this.genes[0]) {
            case 0:
                this.genes[0] = 0;
                this.vegetarian = true;
                break;
            default:
                this.genes[0] = 1;
                this.vegetarian = false;
                break;
        }
        switch (this.genes[1]) {
            case 0:
                this.genes[1] = 0;
                this.procriate = false;
                break;
            default:
                this.genes[1] = 1;
                this.procriate = true;
                break;
        }
        switch (this.genes[2]) {
            case 0:
                this.genes[2] = 0;
                this.sex = false;
                break;
            default:
                this.genes[2] = 1;
                this.sex = true;
                break;
        }
        for (let i = 3; i < this.genes.length; i++) {
            switch (this.genes[i]) {
                case 0:
                    this.canibal = !this.canibal;
                    break;
                case 1:
                    this.necessity -= this.necessity * Math.random();
                    break;
                case 2:
                    this.necessity += this.necessity * Math.random();
                    break;
                case 3:
                    this.procriate_rate += this.procriate_rate * Math.random();
                    break;
                case 4:
                    this.death_rate += this.death_rate * Math.random();
                    break;
                case 5:
                    this.lifetime += this.lifetime * Math.random();
                    break;
                case 6:
                    this.lifetime -= this.lifetime * Math.random();
                    break;
                case 7:
                    this.food_finding += this.food_finding * Math.random();
                    break;
                case 8:
                    this.food_finding -= this.food_finding * Math.random();
                    break;
                default:
                    console.log("default:", this.genes[i]);
                    break;
            }
        }
        //console.log(this.genes);
    }
    createChild(female) {
        if (this.sex != false) return;
        if (this.procriate == false) {
            console.log("male cant procriate");
            return;
        }
        if (female.sex == false) return;
        if (female.procriate == false) {
            console.log("female cant procriate");
            return;
        }
        let child = new Personagem(this.color);
        if (this.vegetarian != female.vegetarian) {
            // console.log("mom and dad are different");
            let dadOrMom = Math.random();
            if (dadOrMom < 0.5) {
                // console.log("dad won");
                child.vegetarian = this.vegetarian;
            } else {
                // console.log("mom won");
                child.vegetarian = female.vegetarian;
            }
        } else {
            child.vegetarian = this.vegetarian;
        }
        child.genes[0] = child.vegetarian ? 0 : 1;
        let dadGenes = child.genes.splice(3, 2);
        child.genes[6] = child.genes[3];
        child.genes[7] = child.genes[4];
        child.genes[8] = child.genes[5];
        child.genes[3] = 0;
        child.genes[4] = 0;
        child.genes[5] = 0;
        let momGenes = child.genes.splice(5, 2);
        let temp = child.genes[5];
        child.genes[5] = 0;
        child.genes[6] = 0;
        child.genes[7] = temp;
        //console.log(child.genes);
        //return;
        dadGenes = randomSort(this.genes.slice(3, 8)).splice(0, 2);
        momGenes = randomSort(female.genes.slice(3, 8)).splice(0, 2);
        child.genes[3] = dadGenes[0];
        child.genes[4] = dadGenes[1];
        child.genes[5] = momGenes[0];
        child.genes[6] = momGenes[1];
        // console.log("dad genes:", this.genes);
        // console.log("mom genes:", female.genes);
        // console.log("dad random genes chose:", dadGenes);
        // console.log("mom random genes chose:", momGenes);
        console.log("Alguém nasceu:", child.genes);
        this.children.push(child);
        female.children.push(child);
        // console.log(this);
        // console.log(female);
        //console.log(child);
        return child;
    }
    next() {
        this.age += 1;
        if (this.age >= this.lifetime) {
            this.isDead = true;
            return;
        }
        // if (this.necessity >= (Math.random() * 20 + 7) * this.food_finding) {
        //     this.isDead = true;
        //     return;
        // }
    }
}

let s = new Species("black");
//s.age();
//s.print();

//let specie = new Species("black");
// let p = new Personagem("black");
// p.lifetime = 10;
// for (let i = 0; i <= 1000000; i++) {
//     if (p == null) {
//         break;
//     }
//     p.draw();
//     console.log(p);
//     p.next();
//     if (p.isDead) {
//         p = null;
//     }
// }
// console.log(p);
// let ser = new Personagem("black");
// ser.draw();
// console.log(ser.genes);
// ser.process();
// console.log(ser.sex ? "female" : "male");
// console.log(ser.food_finding);
// console.log(ser);

// for (let i = 0; i < 10; i += 1) {
//     let p = new Personagem("black");
//     console.log("p" + i + " chance: " + p.chance);
//     p.draw();
// }

// Personagem tem que encontrar comida
// Personagem tem genes, um array de 8 genes, genes são simbolizados por números
// Gene[0]: Gene que define se é vegetariano, valores vão de 0 a 9, sendo 0 vegetariano
// Gene[1]: Gene que define se procria, valores vão de 0 a 9, sendo 0 não poder procriar
// Gene [2]: Homem ou mulher, valores vão de 0 a 1, sendo 0 Homem e 1 Mulher
// Gene[3] a Gene [7]: define caracteristicas variadas, que se somam para aumentar a chance daquela caracteristica, valores vão de 0 a 9.
// Tipo de gene 0 -> Canibal
// Tipo de Gene 1 -> Menos necessidade de comer
// Tipo de Gene 2 -> Mais necessidade de comer
// Tipo de Gene 3 -> Procria mais, com um valor random definido na hora.
// Tipo de Gene 4 -> Mais chance de morrer
// Tipo de Gene 5 -> Vive mais tempo.
// Tipo de Gene 6 -> Vive menos tempo.
// Tipo de Gene 7 -> Facilidade para achar comida.
// Tipo de gene 8 -> Dificuldade de achar comida.

// [0,0,0,1,1,1,1,1]
// O tipo 0 nesse caso aí, é de que é um espaço reservado para um gene "especial": que define o sexo, se é vegetariano ou se pode procriar
// O tipo 1 são genes aleatórios, aqueles de canibal, viver mais ou menos tempo e tals.
// O gene que define se é vegetariano sempre passa para os filhos. (tipo 0)
// O gene que define se procria ou não, não se passa, pois é uma mutação. (tipo 0)
// 4 genes serão passados para o filho, de forma aleatória. (os genes do tipo 1)
