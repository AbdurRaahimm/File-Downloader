import { toast } from 'react-toastify'

function Form() {
    const handleDownload = (e) => {
        e.preventDefault()
        const url = e.target.url.value
        if (!url) return toast.error('Please enter a valid url')
        // valid url check here
        const validUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(url)
        if (!validUrl) return toast.error('Please enter a valid url')
        downloadFile(url)
        e.target.reset()
    }

    const downloadFile = async (url) => {
        try {
            const res = await fetch(url)
            const blob = await res.blob()
            const a = document.createElement('a')
            a.href = window.URL.createObjectURL(blob)
            a.download = `newfile.${blob.type.split('/')[1]}` // file extension`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            toast.success('File downloaded successfully')

        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const handlePasteURL = () => {
        navigator.clipboard.readText().then(text => {
            document.querySelector('input[name="url"]').value = text
        })
    }

    return (
        <form onSubmit={handleDownload}>
            <div className="mt-4">
                <div className="relative rounded-lg">
                    <input className="peer rounded-lg border border-sky-600 bg-transparent px-4 py-2 text-sky-600 focus:outline-none w-full block" type="url" name="url" placeholder="" id="navigate_ui_input_33" required />
                    <label className=" absolute -top-2 left-2 rounded-md bg-sky-600 px-2 text-xs text-sky-100 duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-2 peer-focus:bg-sky-600 peer-focus:text-xs peer-focus:text-sky-100" htmlFor="navigate_ui_input_33">
                        Eg: https://example.com/image.jpg
                    </label>
                    {/* if input in fill then show delete icon otherwise paste Icon */}
                    <div className="absolute right-2 top-3 flex items-center">
                        <button type="button" onClick={handlePasteURL} className="text-sky-600 hover:text-sky-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" cursor-pointer bi bi-clipboard" viewBox="0 0 16 16">
                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
            <div className="mt-4">
                <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">Download</button>
            </div>
        </form>
    )
}

export default Form