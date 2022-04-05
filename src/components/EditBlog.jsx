import React from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function EditBlog(props) {
    console.log(props)
    return (
        <div className='App'>

            <div className='card'>
                <div className='card-body'>
                    <h4 className='card-title'> Title: { props.blogsArrayProp.title }</h4>
                    <textarea onChange={ props.editTextProp } style={{ width: "1000px" }} className="card-text" cols="30" rows="10">{ props.blogsArrayProp.text }</textarea>
                    <p className="card-text">Author: { props.blogsArrayProp.author }</p>
                </div>
            </div>

            <button onClick={() => props.submitUpdateProp(props.blogsArrayProp.id) } className='btn btn-primary'>Submit</button>
        
        </div>
    )
}

export default EditBlog
