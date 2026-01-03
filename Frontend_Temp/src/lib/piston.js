//Piston API is a service for code execution
const PISTON_API = "https://emkc.org/api/v2/piston";
const LANGUAGE_VERSIONS = {
  javascript: { name: "javascript", version: "14" },
  python: { name: "python", version: "3.9" },
  java: { name: "java", version: "11" },
  c: { name: "c", version: "11" },
  cpp: { name: "cpp", version: "11" },
  csharp: { name: "csharp", version: "11" },
  ruby: { name: "ruby", version: "11" },
  php: { name: "php", version: "11" },
  swift: { name: "swift", version: "11" },
  typescript: { name: "typescript", version: "14" },
};
/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?:string}>} 
 */
export async function executeCode(language,code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language]
    if(!languageConfig){
      return{
        success: false,
        error: `Unsupported Language: ${language}`
      }
    }
    const response = await fetch(`${PISTON_API}/execute`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        language: languageConfig.language,
        version: languageConfig.version,
        files: [
          {
            name:`main.${getFileExtension(language)}`,
            content: code
          }
        ]
      })
    });

    if(!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`
      }
    }
    const data = await response.json()
    const output = data.run.output || ""
    const stderr = data.run.stderr || ""
    if(!stderr){
      return{
        success:false,
        output:output,
        error:stderr
      }
    }
    return {
      success:true,
      output: output || "No Output"
    }
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}
function getFileExtension(language){
  const extensions = {
    javascript: "js",
    python:"py",
    java:"java",
  };
  return extensions[language] || "txt";
}