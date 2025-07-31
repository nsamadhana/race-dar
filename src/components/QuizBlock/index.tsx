import React, { useState } from "react";

interface QuizBlockProps {
  image: string; // URL of the image
  choices: string[]; // Array of choices
  onSubmit: (selectedChoice: string | null) => void; // Submit handler
}

const QuizBlock: React.FC<QuizBlockProps> = ({ image, choices, onSubmit }) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleChoiceClick = (choice: string) => {
    setSelectedChoice(choice);
  };

  const handleSubmit = () => {
    onSubmit(selectedChoice);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <img src={image} alt="Quiz" 
        style={{ 
          width: "600px", // Set a fixed width
          height: "500px", // Set a fixed height
         objectFit: "cover", // Ensures the image fills the area while maintaining aspect ratio
          borderRadius: "10px", // Optional: Add rounded corners
          border: "2px solid #ccc", // Optional: Add a border
          }} />
      <div style={{ marginTop: "20px" }}>
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoiceClick(choice)}
            style={{
              margin: "20px",
              padding: "10px 20px",
              backgroundColor: selectedChoice === choice ? "#4CAF50" : "#f0f0f0",
              border: "3px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
              minWidth: "150px", 
              fontSize: "24px",
            }}
          >
            {choice}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          minWidth: "150px", 
          fontSize: "24px",
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default QuizBlock;