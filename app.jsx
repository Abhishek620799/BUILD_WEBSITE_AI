import React, { useState } from "react";
import "./App.css";

function App() {

  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("Portfolio Website");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [features, setFeatures] = useState("");
  const [design, setDesign] = useState("Modern");
  const [theme, setTheme] = useState("Dark");
  const [responsive, setResponsive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [preview, setPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ||
    (import.meta.env.DEV ? "http://localhost:8005" : "");

  const generateProject = async () => {

    if (!apiBaseUrl) {
      setResult(
        "Backend is not configured. Set VITE_API_BASE_URL to your deployed backend URL in Vercel project settings."
      );
      return;
    }

    setLoading(true);
    setPreview(false);
    setResult("");

    const prompt = `
Create a complete website/project according to the following requirements.

PROJECT NAME:
${projectName}

PROJECT TYPE:
${projectType}

PROJECT DESCRIPTION:
${description}

TECHNOLOGIES:
${technologies}

REQUIRED FEATURES:
${features}

DESIGN STYLE:
${design}

THEME:
${theme}

RESPONSIVE:
${responsive}

IMPORTANT REQUIREMENTS:

1. Actually create the project using the Website Tool.
2. Do not just give me code in the response.
3. Create all required folders and files.
4. Write complete working code into the files.
5. Create index.html.
6. Create css/style.css.
7. Create js/script.js.
8. Make the UI professional and visually attractive.
9. Make the website responsive.
10. Add suitable animations and interactions.
11. Use clean and maintainable code.
12. Keep HTML, CSS and JavaScript properly organized.
13. Use the requested technologies where applicable.
14. If an existing project is being modified, read the existing files first.
15. Do not create unnecessary duplicate files.

After completing the project, provide a short summary containing:
- Project name
- Project type
- Technologies used
- Main features
- Files created or modified
- Short description
`;

    try {

      const response = await fetch(
        `${apiBaseUrl}/api/project`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain"
          },
          body: prompt
        }
      );

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const data = await response.text();

      setResult(data);

      setPreviewUrl(`${apiBaseUrl}/api/preview`);
      setPreview(true);

    } catch (error) {

      setResult(
        "Backend error: " + error.message
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="app">

      <div className="builder">

        <h1>WebForge AI</h1>

        <p>
          Build your website using AI
        </p>

        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) =>
            setProjectName(e.target.value)
          }
        />

        <select
          value={projectType}
          onChange={(e) =>
            setProjectType(e.target.value)
          }
        >
          <option>Portfolio Website</option>
          <option>Business Website</option>
          <option>Landing Page</option>
          <option>E-Commerce Website</option>
          <option>Blog Website</option>
          <option>Dashboard</option>
          <option>College Project</option>
          <option>Custom Website</option>
        </select>

        <textarea
          placeholder="Describe your project..."
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Technologies e.g. HTML, CSS, JavaScript"
          value={technologies}
          onChange={(e) =>
            setTechnologies(e.target.value)
          }
        />

        <textarea
          placeholder="Required Features"
          value={features}
          onChange={(e) =>
            setFeatures(e.target.value)
          }
        />

        <select
          value={design}
          onChange={(e) =>
            setDesign(e.target.value)
          }
        >
          <option>Modern</option>
          <option>Minimal</option>
          <option>Professional</option>
          <option>Creative</option>
          <option>Corporate</option>
          <option>Futuristic</option>
        </select>

        <select
          value={theme}
          onChange={(e) =>
            setTheme(e.target.value)
          }
        >
          <option>Dark</option>
          <option>Light</option>
          <option>Auto</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={responsive}
            onChange={(e) =>
              setResponsive(e.target.checked)
            }
          />

          Responsive Website
        </label>

        <button
          onClick={generateProject}
          disabled={loading}
        >

          {loading
            ? "AI is building..."
            : "Generate Website"}

        </button>

      </div>


      <div className="result">

        <h2>AI Build Result</h2>

        {loading && (
          <div className="loading">

            <h3>
              AI is building your website...
            </h3>

            <p>
              Creating files and writing code.
            </p>

          </div>
        )}


        {!loading && result && (

          <div className="report">

            <h3>Build Completed</h3>

            <pre>
              {result}
            </pre>

          </div>

        )}


        {preview && !loading && (

          <div className="preview-container">

            <div className="preview-header">

              <h2>
                Live Preview
              </h2>

              <button
                onClick={() => {
                  const iframe =
                    document.getElementById(
                      "website-preview"
                    );

                  iframe.src = `${previewUrl}?t=${Date.now()}`;
                }}
              >
                Refresh
              </button>

            </div>


            <iframe
              id="website-preview"
              src={previewUrl}
              title="Generated Website Preview"
              className="preview-frame"
            />

          </div>

        )}

      </div>

    </div>
  );
}

export default App;