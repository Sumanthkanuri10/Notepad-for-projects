import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import ProjectSidebar from "./components/ProjectSidebar.jsx";
import NoProjectSelected from "./components/noProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

export default function App() {
  const [projectState,setProjectState]=useState({
    selectedProjectId:undefined,
    projects:[],
    tasks:[]
}
);
function handleAddTask(text){
  setProjectState((prevState)=>{
    const taskId=Math.random()
    const newTasks={
      text:text,
      projectId:prevState.selectedProjectId,
      id:taskId
    };
    return{
      ...prevState,

       tasks:[newTasks, ...prevState.tasks]
  
    };
  });
}
function handleDeleteTask(){

}
function handleSelectProject(id){
  setProjectState(prevState=>{
    return{
        ...prevState
        ,selectedProjectId:id,
    };
}); 
}
function handleStartAddProject(){
   setProjectState(prevState=>{
        return{
            ...prevState
            ,selectedProjectId:null,
        };
    }); 
}
 
function handleCancelStartProject(){
  setProjectState(prevState=>{
    return{
        ...prevState
        ,selectedProjectId:undefined,
    };
});
}
function handleAddProject(projectData){
setProjectState(prevState=>{
  const projectId=Math.random()
  const newProject={
    ...projectData,
    id:projectId
  };
  return{
    ...prevState,
    selectedProjectId:undefined, projects:[...prevState.projects, newProject]

  };
});
}
function handleDeleteProject(){
  setProjectState(prevState=>{
    return{
        ...prevState
        ,selectedProjectId:undefined,
        projects:prevState.projects.filter((project)=> project.id!==prevState.selectedProjectId),
    };
}); 
}
const selectedProject=projectState.projects.find(project=>project.id===projectState.selectedProjectId);
let content=<SelectedProject project={selectedProject} onDelete={handleDeleteProject}
 onAddTask={handleAddTask} onDeleteTask={handleDeleteProject} tasks={projectState.tasks}/>;
if (projectState.selectedProjectId===null){
  content=<NewProject onAdd={handleAddProject} onCancel={handleCancelStartProject}/>
} else if (projectState.selectedProjectId===undefined){
  content=<NoProjectSelected onStartAddProject={handleStartAddProject}/>
}
  return (
    <main className="h-screen my-8 flex gap-8 ">
      <ProjectSidebar onStartAddProject={handleStartAddProject} 
      projects={projectState.projects}
      onSelectProject={handleSelectProject}/>
      {content}
     </main>)
}

;
