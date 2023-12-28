import React, { useState } from 'react';

const Chatbot = () => {
  const questions = [
    'What is your favorite color?',
    'How can I assist you today?',
    'Tell me about your interests.',
    // Add more questions as needed
  ];

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  const [expanded, setExpanded] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messageChain, setMessageChain] = useState([]);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = () => {
    const newMessageChain = [...messageChain, { type: 'user', text: userInput }];
    setMessageChain(newMessageChain);

    // You can add additional logic or send the user input to an API here

    // Reset the user input field
    setUserInput('');
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const renderMessages = () => {
    return messageChain.map((message, index) => (
      <div key={index} className={`mb-2 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
        <span className={`p-2 rounded ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
          {message.text}
        </span>
      </div>
    ));
  };

  return (
    <div className={`fixed bottom-0 right-0 m-4 ${expanded ? 'w-72' : 'w-16'}`}>
      {/* Chatbot Icon */}
      <div
        className="bg-blue-500 text-white p-4 rounded-full cursor-pointer flex items-center justify-center"
        onClick={handleExpand}
      >
        <span role="img" aria-label="robot" className="text-2xl">
          🤖
        </span>
      </div>

      {/* Chat Window */}
      {expanded && (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="mb-4">
            {/* Display Message Chain */}
            {renderMessages()}

            {/* Chatbot Question */}
            <p className="text-gray-700 mb-2">{getRandomQuestion()}</p>
          </div>

          {/* User Input */}
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Type your response..."
            className="w-full border p-2 mb-4"
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-3 rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;