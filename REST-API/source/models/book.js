class Book{
    constructor(id,title){
      this.id = id
      this.title= title
      this.description= ""
      this.image_url = ""
      this.release_year = 0
      this.price = ""
      this.total_page = 0
      this.thickness = ""
      this.created_at = null
      this.updated_at = null
      this.category_id = 0
    }
  }

  module.exports={
    Book
  }

