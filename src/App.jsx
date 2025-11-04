import { useRef, useEffect, forwardRef } from "react";
import "./App.css";

// --- 1. Simple focus example ---
function FocusExample() {
  const inputRef = useRef(null);

  function handleFocusClick() {
    inputRef.current?.focus();
  }

  return (
    <div className="card">
      <h2>Focus Example</h2>
      <input ref={inputRef} placeholder="Click the button to focus me" />
      <button onClick={handleFocusClick}>Focus Input</button>
    </div>
  );
}

// --- 2. Scroll into view example ---
function ScrollExample() {
  const targetRef = useRef(null);

  function handleScrollClick() {
    targetRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="card">
      <h2>Scroll Example</h2>
      <div style={{ height: "150px", overflowY: "scroll", border: "1px solid #ccc" }}>
        <div style={{ height: "300px", padding: "10px" }}>
          <p>Scroll down to find the target...</p>
          <div ref={targetRef} style={{ marginTop: "200px", background: "#e0f7fa", padding: "10px" }}>
            🎯 Target element
          </div>
        </div>
      </div>
      <button onClick={handleScrollClick}>Scroll to Target</button>
    </div>
  );
}

// --- 3. Forwarding refs example ---
const ChildInput = forwardRef((props, ref) => (
  <input ref={ref} placeholder="Controlled from parent" />
));

function ForwardRefExample() {
  const childRef = useRef(null);

  function handleChildFocus() {
    childRef.current?.focus();
  }

  return (
    <div className="card">
      <h2>ForwardRef Example</h2>
      <ChildInput ref={childRef} />
      <button onClick={handleChildFocus}>Focus Child Input</button>
    </div>
  );
}

// --- 4. Measuring element size ---
function MeasureExample() {
  const boxRef = useRef(null);
  const dimsRef = useRef(null);

  useEffect(() => {
    if (boxRef.current && dimsRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      dimsRef.current.textContent = `${Math.round(rect.width)}×${Math.round(rect.height)} px`;
      console.log("Box dimensions:", rect);
    }
  }, []);

  return (
    <div className="card">
      <h2>Measure Example</h2>
      <div
        ref={boxRef}
        className="box"
      >
        Box
      </div>
      <p>
        Size: <span ref={dimsRef}>–</span>
      </p>
      <p>Open console to see the full DOMRect logged from useEffect.</p>
    </div>
  );
}

// --- Main App ---
export default function App() {
  return (
    <div className="App">
      <h1>Manipulating the DOM with Refs</h1>
      <FocusExample />
      <ScrollExample />
      <ForwardRefExample />
      <MeasureExample />
    </div>
  );
}
