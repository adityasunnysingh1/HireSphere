import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

function ProblemPage() {
  const { id } = useParams;
  const navigate = useNavigate();
  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    PROBLEMS[currentProblemId].starterCode.javascript
  );
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const currentProblem = PROBLEMS[currentProblemId];
  //Update problem when URL param changes
  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, selectedLanguage]);
  const handleLanguageChange = (e) => {};
  const handleProblemChange = () => {};
  const triggerConfetti = () => {};
  const checkIfTestsPassed = () => {};
  const handleRunCode = () => {};
  return (
    <div className="h-screen w-screen bg-base-100 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* left panel - problem desc */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
             problem={currentProblem}
             currentProblemId={currentProblemId}
             onProblemChange={handleProblemChange}
             allProblems={Object.values(PROBLEMS)}
             />
          </Panel>

          <PanelResizeHandle
            className="w-2 bg-base-300 hover:bg-primary transition-colors 
        cursor-col-resize"/>
          {/* Right panel - problem desc */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Top panel - Code Editor */}
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel />
              </Panel>

              <PanelResizeHandle
            className="h-2 bg-base-300 hover:bg-primary transition-colors 
        cursor-row-resize"/>

              {/* Bottom panel - Output Panel */}
              <Panel defaultSize={30} minSize={30}>
                <OutputPanel />
              </Panel>
            </PanelGroup>
            <ProblemDescription />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default ProblemPage;
