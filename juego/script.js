var juego = new Phaser.Game(180,200,Phaser.CANVAS,'bloque_juego');
var fondoJuego;
var personaje;
var persona;
var teclaDerecha;
var teclaIzquierda;
var teclaArriba;
var teclaAbajo;
var enemigos;
var balas;
var tiempoBala=0;
var botonDisparo;
var nuevo;

var estadoPrincipal = {
	preload: function(){

		juego.load.image('fondo','img/esce3.png');
		juego.load.spritesheet('animacion','img/enemigo1.png',30,30);
		//juego.load.spritesheet('enemigo','img/Spritesheet1.png',80,80);
		juego.load.image('laser','img/laser.png');
		juego.load.audio('sonidolaser','sonido/laser.ogg')
		
		

	},
	create: function(){
		//mostrar pantalla
		fondoJuego=juego.add.tileSprite(0,0,180,200,'fondo');
		nuevo = juego.add.sprite(30,30,'animacion');
		nuevo.animations.add('movi',[0,1,2,3,4,5],10,true);	
		this.sonidolaser= this.sound.add('sonidolaser');

		botonDisparo= juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		balas=juego.add.group();
		balas.enableBody=true;
		balas.physicsBodyType = Phaser.Physics.ARCADE;
		balas.createMultiple(20,'laser');
		balas.setAll('anchor.x',-3.5);
		balas.setAll('anchor.y',1);
		balas.setAll('outOfBoundsKill',true);
		balas.setAll('checkWorldBounds',true);

		

		/*enemigos = juego.add.group();
		enemigos.enableBody=true;
		enemigos.physicsBodyType=Phaser.Physics.ARCADE;
		for(var y=0; y<3; y++){
			for(var x=0 ; x<3 ; x++){
				var enemig = enemigos.create(x*75, y*75,'enemigo');
				enemig.anchor.setTo(0.5);
			}
		}
		enemigos.x=100;
		enemigos.y=100;
		var animacion = juego.add.tween(enemigos).to(
			{x:200},
			1000,Phaser.Easing.Linear.None,true,0,1000,true
			);*/

		teclaDerecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		teclaIzquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		teclaArriba = juego.input.keyboard.addKey(Phaser.Keyboard.UP);
		teclaAbajo = juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	},
	update: function(){
		//animamos el juego 
		fondoJuego.tilePosition.x-=1;

		if(teclaDerecha.isDown){
			nuevo.x++;
			nuevo.animations.play('movi');
		}else if(teclaIzquierda.isDown){
			nuevo.x--;
			nuevo.animations.play('movi');
		}else if(teclaArriba.isDown){
			nuevo.y--;
			nuevo.animations.play('movi');
		}else if(teclaAbajo.isDown){
			nuevo.y++;
			nuevo.animations.play('movi');
		}

		var bala ;
		if(botonDisparo.isDown){
			if(juego.time.now > tiempoBala){
				bala = balas.getFirstExists(false);
			}
			if(bala){
				bala.reset(nuevo.x , nuevo.y);
				bala.body.velocity.y =-300;
				tiempoBala=juego.time.now+100
				
			}
			this.sonidolaser.play();
		}
		juego.physics.arcade.overlap(balas,enemigos,colision,null,this);

	}
};

function colision(bala, enemigo){
	bala.kill();
	enemigo.kill();
	}

juego.state.add('principal',estadoPrincipal);
juego.state.start('principal');