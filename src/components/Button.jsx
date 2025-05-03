function Button(props) {
    return (
      <button {...props} className="bg-gray-500 p-2 rounded-md text-white w-48">
        {props.children}
      </button>
    );
  }
  
  export default Button;