import React, { useState, useEffect } from "react";

// Button color constants for quiz choices
const QUIZ_BUTTON_COLORS = {
  SELECTED: "#87CEEB", // Blue - indicates user's current selection
  UNSELECTED: "#D3D3D3", // Light gray - default state for unselected choices
} as const;

interface QuizBlockProps {
  image: string; // URL of the image
  choices: string[]; // Array of choices
  onSubmit: (selectedChoice: string | null) => void; // Submit handler
  feedbackResult?: 'correct' | 'incorrect' | null; // Visual feedback state
}

const QuizBlock: React.FC<QuizBlockProps> = ({ image, choices, onSubmit, feedbackResult }) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleChoiceClick = (choice: string) => {
    setSelectedChoice(choice);
  };

  useEffect(() => {
    if (feedbackResult) {
      setShowFeedback(true);
      const timer = setTimeout(() => {
        setShowFeedback(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [feedbackResult]);

  const handleSubmit = () => {
    onSubmit(selectedChoice);
    setSelectedChoice(null); // Reset selection for next question
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        // position: "relative",
        // display: "inline-block",
        // borderRadius: "10px",
        // overflow: "hidden"
        position: "relative",
        display: "inline-block",
        backgroundColor: "#fff", // Card background color
        borderRadius: "10px", // Rounded corners
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
        padding: "20px", // Inner padding
        maxWidth: "650px", // Limit the card width
        width: "100%", // Make it responsive
        textAlign: "center",
        overflow: "hidden"
      }}>
        <img src={image} alt="Quiz"
          style={{
            width: "600px", // Set a fixed width
            height: "500px", // Set a fixed height
            objectFit: "cover", // Ensures the image fills the area while maintaining aspect ratio
            borderRadius: "10px", // Optional: Add rounded corners
            border: "2px solid #ccc",
            display: "block",
            margin: "0 auto",
          }} />
        {showFeedback && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: feedbackResult === 'correct'
              ? 'rgba(76, 175, 80, 0.4)'
              : 'rgba(244, 67, 54, 0.4)',
            borderRadius: "10px",
            transition: "opacity 0.4s ease-in-out",
          }} />
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoiceClick(choice)}
            style={{
              margin: "20px",
              padding: "10px 20px",
              backgroundColor: selectedChoice === choice ? QUIZ_BUTTON_COLORS.SELECTED : QUIZ_BUTTON_COLORS.UNSELECTED,
              border: "1px solid #edf3f5",
              borderRadius: "4px",
              cursor: "pointer",
              minWidth: "150px",
              fontSize: "24px",
              boxShadow: "0 16px 30px rgb(23 31 114 / 20%)",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgb(255, 130, 92)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.border = "1px solid rgb(255, 130, 92)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = selectedChoice === choice ? QUIZ_BUTTON_COLORS.SELECTED : QUIZ_BUTTON_COLORS.UNSELECTED;
              e.currentTarget.style.color = "black";
              e.currentTarget.style.border = "1px solid #edf3f5";
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
          backgroundColor: "#2e186a",
          color: "orange",
          border: "1px solid #edf3f5",
          borderRadius: "4px",
          cursor: "pointer",
          minWidth: "150px",
          fontSize: "24px",
          boxShadow: "0 16px 30px rgb(23 31 114 / 20%)",
          transition: "all 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgb(255, 130, 92)";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.border = "1px solid rgb(255, 130, 92)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#2e186a";
          e.currentTarget.style.color = "orange";
          e.currentTarget.style.border = "1px solid #edf3f5";
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default QuizBlock;
