import { toast } from "react-toastify"


function App() {

  const handleDownload = (e) => {
    e.preventDefault()
    const url = e.target.url.value
    if (!url) return toast.error('Please enter a valid url')
    // valid url check here
    const validUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(url)
    if (!validUrl) return toast.error('Please enter a valid url')
    downloadFile(url)
  // downloading... in button text
    e.target.querySelector('button').textContent = 'Downloading...'
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
      // download success in button text
      document.querySelector('button').textContent = 'Download'
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <section className="bg-gradient-to-r from-red-500 to-orange-500 h-screen flex justify-center items-center">
      <div className="bg-white text-black p-4 rounded-md">
        <div className="flex justify-center items-center">
          <div className=""><img src="/download.svg" alt="Download Icon" width={140} /></div>
          <div className="">
            <h1 className="text-2xl font-bold">Download File</h1>
            <p className="text-sm text-gray-400">Download image, video, pdf or any file  </p>
          </div>
        </div>
        <form onSubmit={handleDownload}>
          <div className="mt-4">
            <div className="relative rounded-lg">
              <input className="peer rounded-lg border border-sky-600 bg-transparent px-4 py-2 text-sky-600 focus:outline-none w-full block" type="url" name="url" placeholder="" id="navigate_ui_input_33" required />
              <label className=" absolute -top-2 left-2 rounded-md bg-sky-600 px-2 text-xs text-sky-100 duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-2 peer-focus:bg-sky-600 peer-focus:text-xs peer-focus:text-sky-100" htmlFor="navigate_ui_input_33">
                Eg: https://example.com/image.jpg
              </label>
            </div>

          </div>
          <div className="mt-4">
            <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">Download</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default App
