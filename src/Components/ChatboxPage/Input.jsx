function Input(props) {
  return (
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <form onSubmit={props.handleFormSubmit}>
        <input
          type="text"
          value={props.apiKey}
          onChange={props.handleApiKeyChange}
          placeholder="Enter your API key"
        />
        <button class="text-gray-100" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Input;
