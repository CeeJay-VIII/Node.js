$(document).ready(function(){
    /**-----------------Get URL params-------------------------- */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const value = urlParams.get('param');
    const feedback = $('span#feedback');
    if (value.includes('success')) {
        feedback.attr('class','text-success');
        feedback.text(':'+value);
    }
    else{
        feedback.attr('class','text-danger');
        feedback.text(':'+value);
    }
    setTimeout(() => {
        feedback.fadeOut();
    }, 3000);
})