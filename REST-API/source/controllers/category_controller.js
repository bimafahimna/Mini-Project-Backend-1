const {connectionPool} = require('../config/database')
const {Category} = require('../models/category')
const {Book} = require('../models/book')
const { CustomException } = require('../models/error_handling')


const getCategory = (req, res) => {
    try{
        connectionPool.query("SELECT * FROM category",(err, data) => {
          try{
            if(err){
                throw err
            }
            if (data.length === 0 ){
                throw new CustomException("No Data",404)
              }
            let hasil = data.map(el=>{
                let {id, name, created_at, updated_at} = el 
                let cat = new Category(id, name)
                cat.created_at = created_at
                cat.updated_at = updated_at
                return cat
            })
            res.json(hasil)
          }catch(err){
            res.status(err.code).json(err.message)
          }
        })
    }catch(err){
            res.status(500).json(err)
    }
}

const getCategoryBooks = (req,res) => {
    let {id} = req.params
    let {title,minYear,maxYear,minPage,maxPage,sortByTitle} = req.query
    let field = req.query
    try{

         // Filter
        let filter = 'WHERE'
        let and = ' AND'
        let i = Object.keys(field).length
        console.log(i)

        if(isNaN(id) === true){
            throw new CustomException("Insert id with integer number! (id not valid)")
        }else{
            let txt = `category_id=${id}`
            filter = filter.concat(" ",txt)
            if(i>=1){
                filter = filter.concat(and)
            }
        }

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
            filter = filter.slice(0,filter.length-3)
            if(sortByTitle === 'asc'){
                let txt = `ORDER BY title ASC`
                filter = filter.concat(" ",txt)
            }else if (sortByTitle === 'desc'){
                let txt = `ORDER BY title DESC`
                filter = filter.concat(" ",txt)
            }
        }


        console.log(filter)
        connectionPool.query(`SELECT * FROM books ${filter}`,(err, data) => {
            if(err) {
                console.error(err);
                return;
            }
            if (data.length === 0 ){
              res.status(404).json("No Data")
              return;
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
          })
    }catch(err){
        res.status(err.code).json(err.message)
    }

}

const createCategory = (req,res) =>{
    let {name}= req.body
    try{
        if(name === undefined){
            throw new CustomException("Insert name!")
        }
        connectionPool.query(`INSERT INTO category (name,created_at, updated_at) VALUES ('${name}', NOW(), NOW())`,(err, data) => {
        res.json("Category was successfully created")
  })
    }catch(err){
        res.status(err.code).json(err.message)
    }
}

const updateCategory = (req, res) => {
    let {name}= req.body
    let {id}= req.params
    try{
        if(name === undefined){
            throw new CustomException("Insert name!")
        }

        if(isNaN(id) === true){
            throw new CustomException("Insert id with integer number! (id not valid)")
        }

        connectionPool.query(`SELECT COUNT(*) FROM category WHERE id = ${id}`, (err,data) =>{
            try{
            let count = data[0]['COUNT(*)']
            if(count == 0){
                throw new CustomException("category failed to update (id not found)")
            }else{
                connectionPool.query(`UPDATE category SET name='${name}', updated_at=NOW() WHERE id=${id}`,(err, data) => {
                    res.json("category was successfully updated")
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


const deleteCategory = (req, res) => {
    let {id}= req.params
    try{
        if(isNaN(id) === true){
            throw new CustomException("Insert id with integer number! (id not valid)")
        }
        connectionPool.query(`DELETE FROM category WHERE id=${id}`,(err, data) => {
            res.json("Category was successfully deleted")
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
            connectionPool.query(`ALTER TABLE db_books_category.category AUTO_INCREMENT = 1`,(err, data) => {
            })
    }catch(err){
        res.status(err.code).json(err.message)
    }
    
  }


module.exports={
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryBooks
}

// title varchar(255) not null,
// description varchar(255) not null,
// image_url varchar(255) not null,
// release_year int not null,
// price varchar(255) not null,
// total_page int not null,
// thickness varchar(255) not null,
// created_at datetime not null,
// updated_at datetime not null,
// category_id int
// );

