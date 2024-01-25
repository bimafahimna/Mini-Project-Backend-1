const {connectionPool} = require('../config/database')
const {Category} = require('../models/category')
const {Book} = require('../models/book')
const { CustomException } = require('../models/error_handling')
const { isValidUrl } = require('../models/IsURL')
const { total_page_to_thickness } = require('../models/totalpage_to_thickness')
const { year_url_validation } = require('../models/year_url_validation')

const getBooks = (req, res) => {
    let {title,minYear,maxYear,minPage,maxPage,sortByTitle} = req.query
    let field = req.query
    console.log(field)
    try{
        // Filter
        let filter = 'WHERE'
        let and = ' AND'
        let i = Object.keys(field).length
        console.log(i)


        if(title !== undefined){
            let txt = `title = '${title}'`
            if(i>=2){
                txt = txt.concat(and)
                i--
            }
            filter=filter.concat(" ",txt)
        }

        if(minYear !== undefined){
            let txt = `release_year >= '${minYear}'`
            if(i>=2){
                txt = txt.concat(and)
                i--
            }
            filter=filter.concat(" ",txt)
        }

        if(maxYear !== undefined){
            let txt = `release_year <= '${maxYear}'`
            if(i>=2){
                txt = txt.concat(and)
                i--
            }
            filter=filter.concat(" ",txt)
        }

        if(minPage !== undefined){
            let txt = `total_page >= '${minPage}'`
            if(i>=2){
                txt = txt.concat(and)
                i--
            }
            filter=filter.concat(" ",txt)
        }

        if(maxPage !== undefined){
            let txt = `total_page <= '${maxPage}'`
            if(i>=2){
                txt = txt.concat(and)
                i--
            }
            filter=filter.concat(" ",txt)
        }

        if(sortByTitle !== undefined){
            if(filter === "WHERE"){
                filter=""
            }else{
                filter = filter.slice(0,filter.length-3)
            }
            if(sortByTitle === 'asc'){
                let txt = `ORDER BY title ASC`
                filter = filter.concat(txt)
            }else if (sortByTitle === 'desc'){
                let txt = `ORDER BY title DESC`
                filter = filter.concat(txt)
            }
        }

        if (i === 0){
            filter = ""
        }else{
            console.log(filter)
        }

        // QUERY
        connectionPool.query(`SELECT * FROM books ${filter}`,(err, data) => {
            try{
                if(err){
                    throw err
                }
                if (data.length === 0 ){
                    throw new CustomException("No Data",404)
                  }
                let hasil = data.map(el=>{
                    let {id, title, description,image_url,release_year,price,
                        total_page,thickness, created_at, updated_at,category_id} = el
                    let book = new Book(id, title)
                    book.description = description
                    book.image_url = image_url
                    book.release_year = release_year
                    book.price = price
                    book.total_page = total_page
                    book.thickness = thickness
                    book.category_id = category_id
                    book.created_at = created_at
                    book.updated_at = updated_at
                    book.category_id = category_id
                    return book
                })
                res.json(hasil)
            }catch(err){
                res.status(err.code).json(err.message)
            }
        })
    }catch(err){
            res.status(500).json(err.message)
    }
}

const createBooks = (req,res) =>{
    let {title,description,image_url,release_year,price ,total_page,category_id }= req.body

    // Konversi total page menjadi thickness
    let thickness = total_page_to_thickness(total_page)

    let field = {"title":title,"description":description,"image_url":image_url,
        "release_year":release_year,"price":price,"total_page":total_page,"thickness":thickness,"category_id":category_id}
    
    try{
        // Validasi Release Year dan Image URL
        let text = year_url_validation(release_year,image_url)
        if(text.length !== 0){
            res.status(400).json(text)
            return;
        }

        // Query
        Object.keys(field).forEach(key => {
            if(field[key] === undefined){
                console.log(field[key])
                throw new CustomException(`Insert ${key}`)
            }
        })

        connectionPool.query(`INSERT INTO books (title,description,image_url,release_year,price,
            total_page,thickness,created_at, updated_at,category_id) 
            VALUES ('${title}','${description}','${image_url}',${release_year},'${price}',${total_page},
            '${thickness}', NOW(), NOW(), ${category_id})`,(err, data) => {
            res.json("Book data was successfully added")
        })
    }catch(err){
        if(err.code === 500){
            console.log(err.message)
            return;
        }
        res.status(err.code).json(err.message)
    }
}

const updateBooks = (req, res) => {
    
    let {total_page,release_year,image_url}= req.body

    // Konversi total page menjadi thickness
    let thickness = total_page_to_thickness(total_page)

    let field = req.body
    field.thickness=thickness
    let {id}= req.params
    
    // console.log(field)

    try{
        if(isNaN(id) === true){
            throw new CustomException("Insert id with integer number! (id not valid)")
        }

        // Validasi Release Year and Image URL
        let text = year_url_validation(release_year,image_url)
        if(text.length !== 0){
            res.status(400).json(text)
            return;
        }


        connectionPool.query(`SELECT COUNT(*) FROM books WHERE id = ${id}`, (err,data) =>{
            try{
            let count = data[0]['COUNT(*)']
                if(count == 0){
                    throw new CustomException("books failed to update (id not found)")
                }else{
                    Object.keys(field).forEach(key => {
                        if(field[key] !== undefined){
                            // console.log(field[key])
                                if(isNaN(field[key])){
                                    connectionPool.query(`UPDATE books SET ${key}='${field[key]}', updated_at=NOW() WHERE id=${id}`,(err, data) => {
                                    })
                                }else{
                                    connectionPool.query(`UPDATE books SET ${key}=${field[key]}, updated_at=NOW() WHERE id=${id}`,(err, data) => {
                                    })
                                } 
                        }
                    })
                    res.json("Book was successfully updated")
                }
            }catch(err){
                res.status(err.code).json(err.message)
            }
        })
        
        

    }catch(err){
        res.status(err.code).json(err.message)
    }
}

const deleteBooks = (req, res) => {
    let {id}= req.params
    try{
        if(isNaN(id) === true){
            throw new CustomException("Insert id with integer number! (id not valid)")
        }

        connectionPool.query(`SELECT COUNT(*) FROM books WHERE id = ${id}`, (err,data) =>{
            try{
            let count = data[0]['COUNT(*)']
            if(count == 0){
                throw new CustomException("books failed to delete (id not found)")
            }else{
                connectionPool.query(`DELETE FROM books WHERE id=${id}`,(err, data) => {
                    res.json("Book was successfully deleted")
                    })
                    // connectionPool.query(`SET  @num := 0`,(err,data)=>{
                    //     connectionPool.query(`UPDATE db_books_category.category SET id = @num := (@num+1)`,(err,data)=>{
                    //         connectionPool.query(`ALTER TABLE db_books_category.category AUTO_INCREMENT = 1`,(err,data)=>{
                    //             if(err){
                    //                 console.log(err)
                    //             }
                    //         })
                    //     })
                    // })
                    connectionPool.query(`ALTER TABLE db_books_category.books AUTO_INCREMENT = 1`,(err, data) => {
                    })
            }
            }catch(err){
                res.status(err.code).json(err.message)
            }
        })
        
    }catch(err){
        res.status(err.code).json(err.message)
    }
    
  }


module.exports = {
    getBooks,
    createBooks,
    updateBooks,
    deleteBooks
}

