const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animameScrooll(){
    const windowTop = window.pageXOffset;
    console.log(windowTop);
    target.forEach(function(element){
        if(windowTop>element.offsetTop){
            element.classList.add(animationClass)
        }
            console.log(element.offsetTop);
    })

}
window.addEventListener('scroll', function()){
    animameScrooll();
}