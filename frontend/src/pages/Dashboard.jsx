import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import API from "../api/axios";
import {
    FaTasks,
    FaCheckCircle,
    FaClock,
    FaSearch,
    FaPlus,
    FaSignOutAlt,
    FaEdit,
    FaTrash,
    FaSave,
    FaClipboardList,
    FaUser,
    FaCog
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));
  const hour = new Date().getHours();

let greeting = "Good Evening";

if (hour < 12) {
    greeting = "Good Morning";
}
else if (hour < 17) {
    greeting = "Good Afternoon";
}
const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});

  const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
const [category, setCategory] = useState("");
const [priority, setPriority] = useState("");
const [dueDate, setDueDate] = useState("");
const [stats, setStats] = useState({});

  const [editId, setEditId] = useState(null);

  const [editTitle, setEditTitle] = useState("");

  const [search, setSearch] = useState("");
  const [editDescription, setEditDescription] = useState("");
const [editCategory, setEditCategory] = useState("");
const [editPriority, setEditPriority] = useState("");
const [editDueDate, setEditDueDate] = useState("");

const [filterCategory, setFilterCategory] = useState("All");

const [filterPriority, setFilterPriority] = useState("All");
  if (!token) {
    return <Navigate to="/login" />;
  }

  // =======================
  // GET TASKS
  // =======================
 
  const getTasks = async () => {
setLoading(true);
    try {

      const res = await API.get("/tasks");
 console.log(res.data);
      setTasks(res.data);
      setLoading(false);

    } catch (error) {
setLoading(false);
      console.log(error);

    }

  };
  const getStats = async () => {

  try {

    const res = await API.get("/stats");

    setStats(res.data);

  }

  catch(error){

    console.log(error);

  }

};


  useEffect(() => {
document.title = "Task Manager Dashboard";
    getTasks();
    getStats();

  }, []);

  // =======================
  // ADD TASK
  // =======================

  const addTask = async () => {


console.log("res.data");
    if (title.trim() === "") {

      alert("Please enter a task");

      return;

    }

    try {

     const res = await API.post("/tasks", {

    title: title.trim(),

    description,

    category,

    priority,

    dueDate

});
      console.log(res.data);

      setTitle("");
setDescription("");
setCategory("Personal");
setPriority("Medium");
setDueDate("");

getTasks();
getStats();

    }

    catch (error) {

      console.log(error);

    }

  };

  // =======================
  // DELETE TASK
  // =======================

  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      getTasks();
      getStats();
    }

    catch (error) {

      console.log(error);

    }

  };

  // =======================
  // COMPLETE TASK
  // =======================

  const completeTask = async (task) => {

    try {

      await API.put(`/tasks/${task._id}`, {

        completed: !task.completed

      });

      getTasks();
      getStats();

    }

    catch (error) {

      console.log(error);

    }

  };

  // =======================
  // START EDIT
  // =======================

  const startEdit = (task) => {

    setEditId(task._id);

    setEditTitle(task.title);

    setEditDescription(task.description || "");

    setEditCategory(task.category || "Personal");

    setEditPriority(task.priority || "Medium");

    setEditDueDate(
        task.dueDate
            ? task.dueDate.substring(0,10)
            : ""
    );

};

  // =======================
  // UPDATE TASK
  // =======================

  const updateTask = async (id) => {

    if (editTitle.trim() === "") {

      alert("Task cannot be empty");

      return;

    }

    try {

      await API.put(`/tasks/${id}`, {

        title: editTitle,
        description: editDescription,

    category: editCategory,

    priority: editPriority,

    dueDate: editDueDate


      });

      setEditId(null);

      setEditTitle("");
      setEditDescription("");
setEditCategory("Personal");
setEditPriority("Medium");
setEditDueDate("");

      getTasks();
      getStats();

    }

    catch (error) {

      console.log(error);

    }

  };

  // =======================
  // LOGOUT
  // =======================

  const logout = () => {

    if(window.confirm("Are you sure you want to logout?")){

localStorage.removeItem("token");

localStorage.removeItem("user");

navigate("/login");
    }
  };

  // =======================
  // SEARCH
  // =======================

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.description || "")
.toLowerCase()
.includes(search.toLowerCase());

    const matchesCategory =
        filterCategory === "All" ||
        task.category === filterCategory;

    const matchesPriority =
        filterPriority === "All" ||
        task.priority === filterPriority;

    return (
        matchesSearch &&
        matchesCategory &&
        matchesPriority
    );

});

  // =======================
  // STATS
  // =======================

  
return (

<div className="dashboard-layout">

    <aside className="sidebar">

        <div className="brand">
    <FaClipboardList size={28} />
    <h2>TaskFlow</h2>
</div>


        <div className="menu">
<Link to="/dashboard" className="menu-item active">
   <FaTasks />
    <span>Dashboard</span>
</Link>


<Link to="/profile" className="menu-item">
    <FaUser />
    <span>Profile</span>
</Link>

<Link to="/settings" className="menu-item">
    <FaCog />
    <span>Settings</span>
</Link>
</div>
       


        <button className="logout-btn" onClick={logout}>
            <FaSignOutAlt />
            Logout
        </button>

    </aside>


    <main className="dashboard">

    {/* HEADER */}

    <div className="header">

        <div>

             <h1>{greeting}, {user?.name || "User"}!</h1>

        <p>{today}</p>

        </div>

    </div>



    {/* STATS */}

    <div className="stats">

        <div className="card">

            <FaTasks size={35} />

            <h2>{stats.total || 0}</h2>

            <p>Total Tasks</p>

        </div>

        <div className="card">

            <FaCheckCircle size={35} />

            <h2>{stats.completed || 0}</h2>

            <p>Completed</p>

        </div>

        <div className="card">

<FaTasks size={35}/>

<h2>{stats.highPriority}</h2>

<p>High Priority</p>

</div>

    </div>



    {/* SEARCH */}

    {/* SEARCH */}

<div className="searchBox">

    <input
        type="text"
        placeholder="Search your tasks..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
    />

    <select
        value={filterCategory}
        onChange={(e)=>setFilterCategory(e.target.value)}
    >
        <option value="All">All Categories</option>
        <option value="Study">Study</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Shopping">Shopping</option>
    </select>

    <select
        value={filterPriority}
        onChange={(e)=>setFilterPriority(e.target.value)}
    >
        <option value="All">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
    </select>

</div>


    {/* ADD TASK */}

<div className="addTask">

    <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
    />

    <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
    />

    <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
         required
         >
            <option value="">📂 Set Category</option>
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
        <option value="Work">Work</option>
        <option value="Shopping">Shopping</option>
    </select>

    <select
        value={priority}
        onChange={(e)=>setPriority(e.target.value)}
    required
>
    <option value="">🚩 Set Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
    </select>

    <div>
    <label
        style={{
            display: "block",
            marginBottom: "6px",
            fontWeight: "600"
        }}
    >
        📅 Due Date
    </label>

    <input
        type="date"
        value={dueDate}
        onChange={(e)=>setDueDate(e.target.value)}
    />
</div>

   <button
onClick={addTask}
style={{
fontWeight:"bold",
fontSize:"16px"
}}
>
        <FaPlus /> Create Task
    </button>


    </div>

{loading && (
    <div
        style={{
            textAlign: "center",
            padding: "30px",
            fontSize: "18px",
            color: "#555"
        }}
    >
        Loading Tasks...
    </div>
)}

    <h2 style={{ marginBottom: "20px" }}>
  My Tasks ({filteredTasks.length})


    </h2>



    {

        filteredTasks.length===0 ?

        (

            <div
style={{
padding:"40px"
}}
>

<h1 style={{fontSize:"50px"}}>📋</h1>

<h2>No Tasks Yet</h2>

<p>

Create your first task and start being productive.

</p>

</div>

        )

        :

        (

            filteredTasks

.sort((a,b)=>{

if(!a.dueDate) return 1;

if(!b.dueDate) return -1;

return new Date(a.dueDate)-new Date(b.dueDate);

})

.map(((task) => (

                <div

className="task-card"

key={task._id}

style={{

borderLeft:

task.dueDate &&
new Date(task.dueDate) < new Date() &&
!task.completed

?

"6px solid red"

:

"6px solid transparent"

}}

>

                

                {

                    editId===task._id ?

                    (

                        <>

                            <input
                        value={editTitle}
    onChange={(e)=>setEditTitle(e.target.value)}
    placeholder="Task Title"
/>

<select
    value={editCategory}
    onChange={(e)=>setEditCategory(e.target.value)}
>
    <option>Personal</option>
    <option>Study</option>
    <option>Work</option>
    <option>Shopping</option>
</select>

<select
    value={editPriority}
    onChange={(e)=>setPriority(e.target.value)}
                              >
                                <option value="" disabled>
         Set Priority
    </option>
    <option>High</option>
    <option>Medium</option>
    <option>Low</option>
</select>

<select
value={Category}
    onChange={(e)=>setCategory(e.target.value)}
>
    <option value="" disabled>
        📂 Set Category
    </option>
    <option>Personal</option>
    <option>Study</option>
    <option>Work</option>
    <option>Shopping</option>
</select>

<input
    type="date"
    value={editDueDate}
    onChange={(e)=>setEditDueDate(e.target.value)}
/>

<button onClick={()=>updateTask(task._id)}>
    <FaSave />
    Save

                            </button>

                        </>

                    )

                    :

                    (

                        <>

            
    <div>

<h3
style={{
textDecoration:
task.completed
?
"line-through"
:
"none"
}}
>

{task.title}

</h3>

<p
style={{
marginTop:"8px",
color:"#666"
}}
>
{task.description || "No description"}
</p>

<div
style={{
display:"flex",
gap:"10px",
flexWrap:"wrap",
marginTop:"10px"
}}
>

<span
style={{
background:"#EEF2FF",
color:"#4338CA",
padding:"5px 10px",
borderRadius:"20px",
fontSize:"13px"
}}
>
📂 {task.category}
</span>

<span
style={{
background:
task.priority==="High"
?
"#FEE2E2"
:
task.priority==="Medium"
?
"#FEF3C7"
:
"#DCFCE7",

color:
task.priority==="High"
?
"#B91C1C"
:
task.priority==="Medium"
?
"#92400E"
:
"#166534",

padding:"5px 10px",
borderRadius:"20px",
fontSize:"13px"
}}
>
🚩 {task.priority}
</span>

<span
style={{
background:"#F3F4F6",
padding:"5px 10px",
borderRadius:"20px",
fontSize:"13px"
}}
>
📅 {

task.dueDate

?

new Date(task.dueDate).toLocaleDateString()

:

"No Due Date"

}

</span>

</div>

</div>


            <div
    style={{
        display: "flex",
        gap: "10px",
        marginTop: "18px",
        flexWrap: "wrap"
    }}
>

    <button
        className="complete-btn"
        onClick={() => completeTask(task)}
    >
        <FaCheckCircle />

        {task.completed ? " Undo" : " Complete"}

    </button>

    <button
        className="edit-btn"
        onClick={() => startEdit(task)}
    >
        <FaEdit />

        Edit

    </button>

    <button
        className="delete-btn"
        onClick={() => {

            if(window.confirm("Delete this task?")){

                deleteTask(task._id);

            }

        }}
    >
        <FaTrash />

        Delete

    </button>

</div>                
            

                        </>

                    )

                }

                </div>

            ))

        )
    )
}
    <footer
style={{
marginTop:"40px",
textAlign:"center",
color:"#777"
}}
>

Task Manager v2.0 • Built with React, Node.js, Express & MongoDB

</footer>
    </main>

</div>

);

}


export default Dashboard;


