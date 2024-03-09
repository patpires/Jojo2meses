function startGame() {
    document.getElementById('startButton').style.display = 'none';
    const canvas = document.getElementById('myCanvas');
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    let foundCount = 0;
    const ladybugImage = new Image();
   ladybugImage.src = 'https://raw.githubusercontent.com/patpires/Jojo2meses/main/Ladybug.png';
 ladybugImage.onload = function() {
   drawLadybugs();
 };
   const ladybugs = [];
   while (ladybugs.length < 10) {
       let x = Math.random() * (width - 30), y = Math.random() * (height - 30);
       let overlapping = false;
       for (let j = 0; j < ladybugs.length; j++) {
           let other = ladybugs[j];
           let d = Math.sqrt((x - other.x) ** 2 + (y - other.y) ** 2);
           if (d < 30) { // Check if the new ladybug is too close to any existing one
               overlapping = true;
               break;
           }
       }
       if (!overlapping && y >= 50) { // Ensure ladybugs do not appear in the position of the counter
           ladybugs.push({x: x, y: y});
       }
   }
   function drawLadybugs() {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       ladybugs.forEach(ladybug => {
           ctx.drawImage(ladybugImage, ladybug.x - 15, ladybug.y - 15, 30, 30);
       });
   }
   function updateFoundCount() {
       document.getElementById('foundCount').innerText = 'Joaninhas encontradas: ' + foundCount;
   }
   canvas.addEventListener('click', (event) => {
       const rect = canvas.getBoundingClientRect();
       const x = event.clientX - rect.left;
       const y = event.clientY - rect.top;
       ladybugs.forEach((ladybug, index) => {
           const distance = Math.sqrt((x - ladybug.x) ** 2 + (y - ladybug.y) ** 2);
           if (distance < 30) { // Ampliada a zona de clique para uma margem maior de acerto
               ladybugs.splice(index, 1);
               foundCount++;
               updateFoundCount();
               if (foundCount === 10) {
                   alert('Parabéns! Você encontrou todas as joaninhas!');
                   location.reload(); // Recarrega a página para reiniciar o jogo
               }
               drawLadybugs();
           }
       });
   });
   drawLadybugs();
   updateFoundCount();
}
