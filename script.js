const letter = document.querySelector(".letter");
const openButton=document.getElementById('openButton'),intro=document.getElementById('intro'),envelopeStage=document.getElementById('envelopeStage'),envelope=document.getElementById('envelope'),letterText=document.getElementById('letterText'),softLine=document.getElementById('softLine'),photos=document.getElementById('photos'),lastButton=document.getElementById('lastButton'),finalMessage=document.getElementById('finalMessage'),musicButton=document.getElementById('musicButton'),music=document.getElementById('music'),stars=document.getElementById('stars'),shootingStar=document.getElementById('shootingStar');

const message=`Feliz cumpleaños.

Hoy quería regalarte algo un poco diferente.

Vivimos en un mundo donde casi todo ocurre muy rápido. Un mensaje dura unos segundos, una conversación termina y los días siguen su camino. Por eso quise dedicar un poco de tiempo para crear algo que permaneciera un poco más.

No porque sea un gran regalo, sino porque creo que las cosas hechas con tiempo y dedicación tienen un valor especial.

Con el paso del tiempo he aprendido que algunas personas llegan a nuestra vida de manera muy sencilla, casi sin hacer ruido, y aun así terminan dejando una huella difícil de explicar.

Tú eres una de esas personas.

Siempre admiré la forma en que intentas hacer bien las cosas, el esfuerzo que pones incluso cuando los días parecen pesados y esa sonrisa que, aun en los momentos difíciles, consigue aparecer de vez en cuando.

Quizá nunca imaginaste que pequeños momentos, conversaciones sencillas o una simple sonrisa podían convertirse en recuerdos bonitos para alguien más. Pero así fue.

No escribo esto esperando cambiar nada, ni buscando que esta carta signifique más de lo que realmente es. Solo quería ser sincero y decirte que conocerte fue una de esas coincidencias que agradezco.

A veces las personas aparecen para quedarse. Otras solo comparten un tramo del camino. Y creo que ambas formas pueden ser igual de valiosas.

Por eso, más allá de cualquier circunstancia, deseo de corazón que seas feliz.

Que este año te regale tranquilidad cuando la necesites, fuerza para superar los días difíciles, personas que sepan valorar todo lo bueno que hay en ti y muchísimos motivos para sonreír.

Si algún día recuerdas este detalle, me bastará con que te saque una pequeña sonrisa.

Porque, al final, creo que los recuerdos más bonitos no siempre nacen de los grandes momentos, sino de los gestos sencillos hechos con sinceridad.

Gracias por formar parte de algunos de esos recuerdos.

Feliz cumpleaños.

✨ Con mucho cariño.`;

for(let i=0;i<170;i++){
    const star=document.createElement('span');
    star.className='star';
    star.style.left=Math.random()*100+'%';
    star.style.top=Math.random()*100+'%';
    star.style.animationDelay=Math.random()*3+'s';
    star.style.animationDuration=1.8+Math.random()*2.5+'s';
    stars.appendChild(star);
}

function fadeInMusic(){
    music.volume=0;
    music.play().then(()=>{
        musicButton.classList.add("playing");
        musicButton.textContent="⏸";

        let volumen=0;
        const fade=setInterval(()=>{
            volumen+=0.02;
            if(volumen>=0.6){
                volumen=0.6;
                clearInterval(fade);
            }
            music.volume=volumen;
        },120);
    }).catch(()=>{});
}

function fadeOutMusic(){
    let volumen=music.volume;
    const fade=setInterval(()=>{
        volumen-=0.02;
        if(volumen<=0){
            volumen=0;
            clearInterval(fade);
            music.pause();
        }
        music.volume=volumen;
    },120);
}

openButton.addEventListener('click',()=>{
    fadeInMusic();

    intro.classList.add('fade-out');

    setTimeout(()=>{
        intro.classList.add('hidden');
        envelopeStage.classList.remove('hidden');
    },700);

    setTimeout(()=>{
        envelope.classList.add('open');
    },1200);

    setTimeout(()=>{
        typeLetter();
    },2300);
});

function typeLetter(){
    let index=0;
    letterText.textContent='';
    letterText.classList.add('typing');

    const carta = document.querySelector(".letter");

    const typing=setInterval(()=>{
        letterText.textContent += message.charAt(index);

        carta.scrollTo({
            top: carta.scrollHeight,
            behavior: "smooth"
        });

        index++;

        if(index>=message.length){
            clearInterval(typing);
            letterText.classList.remove('typing');
            showEnding();
        }
    },24);
}

function showEnding(){
    setTimeout(()=>{
        softLine.classList.remove('hidden');
        setTimeout(()=>softLine.classList.add('show'),100);
    },500);

    setTimeout(()=>{
        photos.classList.remove('hidden');
        setTimeout(()=>photos.classList.add('show'),120);
    },1900);

    setTimeout(()=>{
        goldenSparks();
        launchShootingStar();
    },3300);

    setTimeout(()=>{
        lastButton.classList.remove('hidden');
        setTimeout(()=>lastButton.classList.add('show'),100);
    },4800);
}

function goldenSparks(){
    for(let i=0;i<36;i++){
        const spark=document.createElement('span');
        spark.className='spark';
        spark.style.left=42+Math.random()*16+'%';
        spark.style.top=52+Math.random()*18+'%';
        spark.style.animationDelay=Math.random()*.6+'s';
        document.body.appendChild(spark);
        setTimeout(()=>spark.remove(),2600);
    }
}

function launchShootingStar(){
    shootingStar.style.opacity='1';
    shootingStar.animate([
        {transform:'translate(-250px,-180px)',opacity:0},
        {transform:'translate(25vw,18vh)',opacity:1},
        {transform:'translate(120vw,75vh)',opacity:0}
    ],{
        duration:2200,
        easing:'ease-out'
    });
}

lastButton.addEventListener('click',()=>{
    fadeOutMusic();
    finalMessage.classList.remove('hidden');
});

musicButton.addEventListener('click',async()=>{
    try{
        if(music.paused){
            await music.play();
            music.volume=0.6;
            musicButton.classList.add('playing');
            musicButton.textContent='⏸';
        }else{
            music.pause();
            musicButton.classList.remove('playing');
            musicButton.textContent='🎵';
        }
    }catch(e){
        alert('Agrega una canción en la carpeta musica con el nombre cancion.mp3');
    }
});