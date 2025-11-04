import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Successfully created!');
function Homepage() {
    return (
        <div>
            <button onClick={notify}>Make me a toast</button>
        </div>
    )
}

export default Homepage
