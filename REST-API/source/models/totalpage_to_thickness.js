function total_page_to_thickness(total_page){
    if(total_page <= 100){
        var thickness = "tipis"
    }else if(total_page >= 101  &&  total_page <= 200){
        var thickness = "sedang"
    }else if(total_page>=201){
        var thickness = "tebal"
    }
    return thickness
}


module.exports={
    total_page_to_thickness
}