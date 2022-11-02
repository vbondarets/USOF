import React from 'react'
import CategoryItem from './CategoryItem'

const CategoriesList = ({categories, className, callback}) => {
  return (
    <div className={className}>
        {/* {console.log(categories)} */}
        <h1>Categories:</h1>
        {categories.map((category, index) =>
            <div key={category.id}>
                <CategoryItem
                    callback={callback}
                    category={category}
                />
            </div>
        )}
    </div>
  )
}

export default CategoriesList