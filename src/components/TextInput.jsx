
const TextInput = ({string, name, inputType, placeholder, error, onUpdate}) => {

  
  return (
    <div>
      <input type={inputType} 
      autoComplete="off"
      name={name}
      className="block w-full border-gray-300 focus:outline-none bg-[#f1f1f2] text-gray-800  border py-2.5 px-3 rounded-md " 
      placeholder={placeholder} 
      value={string || ""} 
      onChange={(event) => onUpdate(event?.target.value) } 
      />

      <div className="text-red-500 text-sm font-semibold">{error && (error)}</div>
    </div>
  )
}

export default TextInput
