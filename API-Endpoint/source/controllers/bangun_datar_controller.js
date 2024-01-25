const {CustomException} = require('../models/error_handling')

const persegi = (req,res)=>{
    let {hitung,sisi} = req.query

    try{
        
        if(hitung===undefined && sisi === undefined){
            throw new CustomException("Query hitung dan sisi wajib diisi!")
        }else if(sisi === undefined){
            throw new CustomException("Query sisi wajib diisi!");
        }else if(hitung===undefined ){
            throw new CustomException("Query hitung wajib diisi!")
        }else{
            hitung = hitung.toLowerCase()
        }

        if(isNaN(sisi) && sisi !== undefined){
            throw new CustomException("Masukkan query sisi dengan angka bilangan riil")
        }

        if(hitung == 'luas'){
            let luas = sisi**2
            res.json({'Luas Persegi':luas})
        }else if(hitung == 'keliling'){
            let keliling = sisi*4
            res.json({'Keliling Persegi':keliling})
        }else{
            throw new CustomException("Masukkan query hitung dengan input berupa 'Luas' atau 'Keliling'")
        }
    }catch(err){
        res.status(err.code).json(err.message)
    }  
}

const persegi_panjang = (req,res)=>{
    let {hitung,panjang,lebar} = req.query

    try{

        if(hitung===undefined && panjang === undefined && lebar === undefined){
            throw new CustomException("Query hitung, panjang, dan lebar wajib diisi!")
        }else if(panjang === undefined || lebar === undefined){
            throw new CustomException("Query panjang dan lebar wajib diisi!");
        }else if(hitung===undefined ){
            throw new CustomException("Query hitung wajib diisi!")
        }else{
            hitung = hitung.toLowerCase()
        }

        if(isNaN(panjang) || isNaN(lebar)){
            throw new CustomException("Masukkan query panjang dan lebar dengan angka bilangan riil")
        }

        if(hitung == 'luas'){
            let luas = panjang*lebar
            res.json({'Luas Persegi Panjang':luas})
        }else if(hitung == 'keliling'){
            let keliling = 2*panjang+2*lebar
            res.json({'Keliling Persegi Panjang':keliling})
        }else{
            throw new CustomException("Masukkan query hitung dengan input berupa 'Luas' atau 'Keliling'")
        }
    }catch(err){
        res.status(err.code).json(err.message)
    }   
}

const lingkaran = (req,res)=>{
    let {hitung,jariJari} = req.query

    try{
        
        if(hitung===undefined && jariJari === undefined){
            throw new CustomException("Query hitung dan jariJari wajib diisi!")
        }else if(jariJari === undefined){
            throw new CustomException("Query jariJari wajib diisi!");
        }else if(hitung===undefined ){
            throw new CustomException("Query hitung wajib diisi!")
        }else{
            hitung = hitung.toLowerCase()
        }

        if(isNaN(jariJari) && jariJari !== undefined){
            throw new CustomException("Masukkan query jariJari dengan angka bilangan riil")
        }

        if(hitung == 'luas'){
            let luas = 22/7 * jariJari**2
            res.json({'Luas Lingkaran':luas})
        }else if(hitung == 'keliling'){
            let keliling = 2*jariJari*3.14
            res.json({'Keliling Lingkaran':keliling})
        }else{
            throw new CustomException("Masukkan query hitung dengan input berupa 'Luas' atau 'Keliling'")
        }
    }catch(err){
        res.status(err.code).json(err.message)
    }  
}



module.exports = {
    persegi,
    persegi_panjang,
    lingkaran
}




