import { Loader2Icon, LoaderPinwheel, LoaderPinwheelIcon } from 'lucide-react'
import React from 'react'
import { LoaderIcon } from 'react-hot-toast'

const PageLoading = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <LoaderPinwheelIcon className='animate-spin size-10 text-primary' />
        </div>
    )
}

export default PageLoading
