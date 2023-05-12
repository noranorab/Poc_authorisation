var ulElement = document.querySelector('.sideBar ul');

var liElements = ulElement.querySelectorAll('li');


console.log('hello from admin dashboard js')
liElements.forEach(function(li) {
    li.addEventListener('click', function() {
        if (li.name == 'first'){
            location.href = '/adminDashboard'
        }else if(li.name == 'second'){
            location.href='/filieres'
        }else if(li.name == 'third'){
            location.href='/modules'
        }else if(li.name == 'fourth'){
            location.href='/cours'
        }else{
            location.href='/Parameters'
        }

    });
});
