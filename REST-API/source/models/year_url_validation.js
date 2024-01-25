const {isValidUrl} = require('./IsURL')

function year_url_validation(year,url){
    // Validasi Release Year dan Image URL
    if(year<1980 || year>2021){
        var r_y_err = {error_release_year:"Can only accept release years between 1999 and 2021"}
    }

    if(isValidUrl(url)=== false && url !== undefined){
        var url_err = {error_image_url_error:"Can only accept URL"}
    }
    
    let text  = []
    text.push(r_y_err)
    text.push(url_err)

    for(let i = text.length-1;i>=0;i--){
        if(text[i]===undefined){
            text.splice(i,1)
        }
    }

    return text
    
}



module.exports = {
    year_url_validation
}
