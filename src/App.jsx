import React, { Component } from 'react'
import Blog from './components/Blog'
import EditBlog from './components/EditBlog'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const url = "https://6239ddb128bcd99f02763cfe.mockapi.io/blogs"

export class App extends Component {
    state = {
        blogsArray: [],
        authorArray: [],
        author: "All",
        editText: "",
        editToggle: false
    }

    displayBlogs = async() => {
        const fetchedData = await fetch(url)
        const parsedData = await fetchedData.json()

        this.setState({
            blogsArray: parsedData,
            authorArray: parsedData
        })

        console.log("blogsArray ", this.state.blogsArray)
        return parsedData
    }

    componentDidMount() {
        this.displayBlogs()
    }

    changeAuthor = e => {
        this.setState({
            author: e.target.value
        })
    }

    changeText = e => {
        this.setState({
            editText: e.target.value
        })
    }

    clickAuthor = () => {
        if(this.state.author === "All") {
            this.setState({
                blogsArray: this.state.authorArray
            })
        }
        else {
            const newArray = this.state.authorArray.filter(blog => {
                return blog.author === this.state.author
            })
            this.setState({
                blogsArray: newArray
            })
        }
    }

    toggleEdit = () => {
        this.setState(prevState => {
            return {
                editToggle: !prevState.editToggle
            }
        })
    }

    submitUpdate = (id) => {
        const mappedBlog = this.state.authorArray.map(blog => {
            const updateBlog = blog
            if(blog.id === id) {
                updateBlog.text = this.state.editText
            }
            return updateBlog
        })
        this.setState({
            authorArray: mappedBlog
        })
    }

    render() {
        return (
        <div className='App'>

            <div className="filter">
                <label>Filter by Author:</label>
                <select onChange={ this.changeAuthor } value={ this.state.author }>
                    <option value="All">All</option>
                    { this.state.authorArray.map(blog => {
                        return <option key={ blog.id } value={ blog.author }>{ blog.author }</option>
                    }) }
                </select>
                <button onClick={ this.clickAuthor } className='btn btn-primary'>Filter</button>
                { this.state.blogsArray.length === 1
                ? <button onClick={ this.toggleEdit } className='btn btn-primary'>Edit</button>
                : ""
                }
            </div>

            { this.state.blogsArray.map(blog => {
                return <Blog
                key={ blog.id }
                blogsArrayProp={ blog }
                />
            }) }

            { this.state.editToggle === true
                ? <EditBlog
                    blogsArrayProp={ this.state.blogsArray[0] }
                    editTextProp={ this.changeText }
                    submitUpdateProp={ this.submitUpdate }
                />
                : ""
            }

        </div>
        )
    }
}

export default App