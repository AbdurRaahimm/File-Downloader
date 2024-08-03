import Form from "./components/Form"

function App() {

  const handleShare = async() => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Download File',
          text: 'Download image, video, pdf or any file',
          url: window.location.href
        })
      }
      catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      alert('Web Share API not supported in your browser')
    }
  }

  return (
    <>
      <div className="relative">
        {/* share button */}
        <div className="fixed bottom-4 right-4">
          <button onClick={handleShare} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Share
          </button>
        </div>
      </div>
      <section className=" bg-gradient-to-r from-red-500 to-orange-500 h-screen flex justify-center items-center">
        <div className="bg-white text-black p-4 rounded-md">
          <div className="flex justify-center items-center">
            <div className=""><img src="/download.svg" alt="Download Icon" width={140} /></div>
            <div className="">
              <h1 className="text-2xl font-bold">Download File</h1>
              <p className="text-sm text-gray-400">Download image, video, pdf or any file  </p>
            </div>
          </div>
          <Form />
        </div>
      </section>
    </>
  )
}

export default App
