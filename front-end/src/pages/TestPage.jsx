import React from 'react'

const TestPage = () => {
    const uploadImg = async (e) => {
        e.preventDefault()
        console.log('Upload Requested')
        console.dir(e.target)
    }

    return (
        <div>
            <form onSubmit={uploadImg}>
                <input type="file" />
                <button>Upload</button>
            </form>
        </div>
    )
}

export default TestPage