const {CustomException} = require('../models/error_handling')

const kubus = (req,res)=>{
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

        if(hitung == 'volume'){
            let volume = sisi**3
            res.json({'Volume Kubus':volume})
        }else if(hitung == 'luaspermukaan'){
            let luasPermukaan = 6*sisi**2
            res.json({'Luas Permukaan Kubus':luasPermukaan})
        }else{
            throw new CustomException("Masukkan query hitung dengan input berupa 'luasPermukaan' atau 'volume'")
        }
    }catch(err){
        res.status(err.code).json(err.message)
    }  
}

const balok = (req,res)=>{
    let {hitung,panjang,lebar,tinggi} = req.query

    try{
        
        if(hitung===undefined && panjang === undefined && lebar === undefined && tinggi === undefined){
            throw new CustomException("Query hitung, panjang, lebar, dan tinggi wajib diisi!")
        }else if(hitung===undefined ){
            throw new CustomException("Query hitung wajib diisi!")
        }else if(panjang === undefined || lebar === undefined || tinggi === undefined){
            throw new CustomException("Query panjang, lebar, dan tinggi wajib diisi!");
        }else{
            hitung = hitung.toLowerCase()
        }

        if(isNaN(panjang) || isNaN(lebar || isNaN(tinggi))){
            throw new CustomException("Masukkan query panjang, lebar, dan tinggi dengan angka bilangan riil")
        }

        if(hitung == 'volume'){
            let volume = panjang*lebar*tinggi
            res.json({'Volume Balok':volume})
        }else if(hitung == 'luaspermukaan'){
            let luasPermukaan = 2*panjang*lebar+2*panjang*tinggi+2*lebar*tinggi
            res.json({'Luas Permukaan Balok':luasPermukaan})
        }else{
            throw new CustomException("Masukkan query hitung dengan input berupa 'luasPermukaan' atau 'volume'")
        }
    }catch(err){
        res.status(err.code).json(err.message)
    }  
}


const tabung = (req,res)=>{
    let {hitung,jariJari,tinggi} = req.query

    try{
        
        if(hitung===undefined && jariJari === undefined && tinggi === undefined){
            throw new CustomException("Query hitung, jariJari, dan tinggi wajib diisi!")
        }else if(jariJari === undefined && tinggi === undefined){
            throw new CustomException("Query jariJari dan tinggi wajib diisi!");
        }else if(hitung===undefined ){
            throw new CustomException("Query hitung wajib diisi!")
        }else{
            hitung = hitung.toLowerCase()
        }

        if(isNaN(jariJari) && isNaN(tinggi)){
            throw new CustomException("Masukkan query jariJari dan tinggi dengan angka bilangan riil")
        }

        if(hitung == 'volume'){
            let volume = tinggi*22/7*jariJari**2
            res.json({'Volume Tabung':volume})
        }else if(hitung == 'luaspermukaan'){
            let luasPermukaan = 2*22/7*jariJari*(jariJari+tinggi)
            res.json({'Luas Permukaan Tabung':luasPermukaan})
        }else{
            throw new CustomException("Masukkan query hitung dengan input berupa 'luasPermukaan' atau 'volume'")
        }
    }catch(err){
        res.status(err.code).json(err.message)
    }  
}


module.exports ={
    kubus,
    balok,
    tabung
}