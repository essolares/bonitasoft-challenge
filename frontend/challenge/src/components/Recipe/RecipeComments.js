import React from 'react'
import CommentsList from './CommentsList'

const RecipeComments = ({selectedId}) => {
    return (
        <div className="p-5">
            <h1>Recipe Comments</h1>
            <CommentsList recipeId={selectedId} />
        </div>
    )
}

export default RecipeComments
