'use client'
import toast, { Toaster } from 'react-hot-toast';
import { LinkIcon } from '@heroicons/react/24/solid'
const ShareBtn = () => {
    const handleShare = ()=>{
        navigator.clipboard.writeText(window.location.href)
        toast.success('Copied')
    }
    return (
        <>
        <button
            className="text-slate-600 inline-block font-bold hover:cursor-pointer hover:text-slate-300"
         onClick={handleShare}
        >
            <LinkIcon className='inline-block mr-2 w-5 h-5' />
            Share Link
        </button>
        <Toaster />
        </>
    )
}

export default ShareBtn