import React from 'react';

function ColorContainer({ setBody, setColor, body }) {
  return (
    <div className="colorContainer">
      <textarea
        placeholder="Take a note..."
        rows="5"
        onChange={(e) => setBody(e.target.value)}
        value={body}
      ></textarea>
      <div className="selectColor">
        <div className="colors">
          <input
            type="radio"
            style={{ backgroundColor: '#3FC1C9' }}
            name="color"
            value="#3FC1C9"
            defaultChecked={true}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="radio"
            style={{ backgroundColor: '#FC5185' }}
            name="color"
            value="#FC5185"
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="radio"
            style={{ backgroundColor: '#AA96DA' }}
            name="color"
            value="#AA96DA"
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="radio"
            style={{ backgroundColor: '#F07B3F' }}
            name="color"
            value="#F07B3F"
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="radio"
            style={{ backgroundColor: '#FFDE7D' }}
            name="color"
            value="#FFDE7D"
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <button type="submit">Add Note</button>
      </div>
    </div>
  );
}

export default ColorContainer;
