import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import Login from "../components/Login"
import Register from "../components/Register"


const AuthOverlay = ({setShowAuthOverlay}) => {
    const[isRegistered, setIsRegistered] = useState(false)
    // const[authOpen, setAuthOpen] = useState(false)

	const handleOverlayClick = (event) => {
        // Check if the click target is the overlay div itself
        if (event.target === event.currentTarget) {
            setShowAuthOverlay(false)
        }
    }
  return (
    <>
		<div id="AuthOverlay" onClick={handleOverlayClick} className="fixed flex items-center justify-center z-50 top-0 bg-black bg-opacity-50 w-full h-full left-0 ">
			<div id="formContainer" className="relative max-w-[450px] bg-white w-full mx-2 sm:mx-0 p-4 z-[100] rounded-lg">

				<div className="w-full justify-end flex">
					<button onClick={() => setShowAuthOverlay(false)} className="rounded-full bg-gray-500 p-1.5">

						<AiOutlineClose size={20} color="white" />
					</button>
				</div>

				{isRegistered ? <Register /> : <Login />}

				<div className="text-center mt-3 pt-3 border-t w-[90%] mx-auto">
					<span className="text-sm text-gray-600">{!isRegistered ? "Don't" : 'Already'} have an account?</span>
					<button onClick={() => setIsRegistered(!isRegistered)} className="text-sm text-[#f02c56] pl-1 font-semibold" ><span>{!isRegistered ? 'Sign Up' : 'Log in'}</span></button>
				</div>
			</div>
		</div>
      
    </>
  )
}

export default AuthOverlay
	