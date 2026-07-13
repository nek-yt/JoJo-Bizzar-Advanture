import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
  setSearchQuery,
  setStatusFilter,
  selectFilteredTodos,
} from "./slice/todo";
import type { Todo, StatusFilter } from "./slice/todo";

export default function Main() {
  const dispatch = useDispatch();

  const filteredTodos = useSelector(selectFilteredTodos);
  const { searchQuery, statusFilter } = useSelector((state: any) => state.todos);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !job.trim()) return;

    if (editingId !== null) {
      dispatch(editTodo({ id: editingId, name, email, job }));
      setEditingId(null);
    } else {
      dispatch(addTodo({ name, email, job }));
    }

    setName("");
    setEmail("");
    setJob("");
  };

  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setName(todo.name);
    setEmail(todo.email);
    setJob(todo.job);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setEmail("");
    setJob("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 via-slate-950 to-indigo-950/40 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased selection:bg-indigo-500/30 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header Block */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-slate-800/60">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Directives Active
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              Workspace Directory
            </h1>
            <p className="text-sm text-slate-400">
              Provision identities, roles, and status levels in real-time.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-1.5 rounded-2xl self-start md:self-auto">
            <div className="text-right px-3">
              <div className="text-xs text-slate-500 font-medium">Active Directory</div>
              <div className="text-sm font-bold text-slate-300">{filteredTodos.length} Profiles</div>
            </div>
          </div>
        </header>

        {/* Dynamic Add / Edit Card */}
        <section className={`relative rounded-3xl border transition-all duration-500 overflow-hidden ${
          editingId !== null 
            ? "border-amber-500/30 bg-gradient-to-b from-amber-950/10 via-slate-900/50 to-slate-900/40 shadow-lg shadow-amber-950/5" 
            : "border-slate-800/80 bg-slate-900/40 backdrop-blur-md hover:border-slate-700/80 shadow-2xl shadow-slate-950/50"
        }`}>
          {editingId !== null && (
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          )}
          
          <div className="border-b border-slate-800/60 px-8 py-5 flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-400 tracking-widest uppercase">
              {editingId !== null ? "⚡ Edit Active Record" : "✏️ Create New Profile"}
            </h2>
            {editingId !== null && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/25">
                ID: {editingId}
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5 group">
                <label className="text-xs font-semibold text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Connor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-3 bg-slate-950/50 rounded-xl border border-slate-800 text-sm w-full outline-none transition-all duration-300 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50"
                  required
                />
              </div>

              <div className="space-y-1.5 group">
                <label className="text-xs font-semibold text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 bg-slate-950/50 rounded-xl border border-slate-800 text-sm w-full outline-none transition-all duration-300 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50"
                  required
                />
              </div>

              <div className="space-y-1.5 group">
                <label className="text-xs font-semibold text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                  Job Designation
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lead Engineer"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  className="px-4 py-3 bg-slate-950/50 rounded-xl border border-slate-800 text-sm w-full outline-none transition-all duration-300 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 items-center justify-end pt-2 border-t border-slate-800/40">
              {editingId !== null && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-sm font-semibold transition-all duration-300 active:scale-95"
                >
                  Cancel Edit
                </button>
              )}
              <button
                type="submit"
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 shadow-lg ${
                  editingId !== null
                    ? "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/10 hover:shadow-amber-500/20"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/10 hover:shadow-indigo-500/20"
                }`}
              >
                {editingId !== null ? "Apply Changes" : "Commit Record"}
              </button>
            </div>
          </form>
        </section>

        {/* Filters and Search Interface */}
        <section className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:flex-[2]">
            <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500 text-sm transition-colors group-focus-within:text-indigo-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Query databases by name, email, or role..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="pl-11 pr-4 py-3 rounded-xl border border-slate-800 text-sm w-full outline-none transition-all duration-300 bg-slate-900/40 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50"
            />
          </div>
          
          <div className="w-full md:flex-1 relative">
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => dispatch(setStatusFilter(e.target.value as StatusFilter))}
              className="px-4 py-3 rounded-xl border border-slate-800 text-sm w-full bg-slate-900/40 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50 text-slate-300 cursor-pointer appearance-none"
            >
              <option value="all" className="bg-slate-950 text-slate-300">All Workspaces</option>
              <option value="completed" className="bg-slate-950 text-slate-300">Completed Projects</option>
              <option value="active" className="bg-slate-950 text-slate-300">Pending Execution</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500 text-xs">
              ▼
            </div>
          </div>
        </section>

        {/* Workspace Listings Table */}
        <section className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-900/20">
                  <th className="px-8 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider w-20 text-center">Done</th>
                  <th className="px-8 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">Identity Details</th>
                  <th className="px-8 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">Contact Path</th>
                  <th className="px-8 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">Department Assignment</th>
                  <th className="px-8 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider text-right w-40">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {filteredTodos.length > 0 ? (
                  filteredTodos.map((todo) => (
                    <tr
                      key={todo.id}
                      className={`group/row transition-all duration-300 ease-out hover:bg-slate-800/25 ${
                        todo.completed ? "bg-slate-950/10 opacity-60" : "bg-transparent"
                      }`}
                    >
                      <td className="px-8 py-5 text-sm text-center">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => dispatch(toggleTodo(todo.id))}
                            className="h-5.5 w-5.5 rounded-lg border-slate-800 bg-slate-950 text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer transition-all duration-300"
                          />
                        </div>
                      </td>
                      
                      <td className="px-8 py-5 text-sm">
                        <span className={`font-semibold tracking-tight transition-all duration-300 text-base ${
                          todo.completed ? "line-through text-slate-500" : "text-white group-hover/row:text-indigo-300"
                        }`}>
                          {todo.name}
                        </span>
                      </td>
                      
                      <td className="px-8 py-5 text-sm">
                        <span className="font-mono text-xs text-slate-400 bg-slate-950/40 px-2.5 py-1.5 rounded-lg border border-slate-800/50">
                          {todo.email}
                        </span>
                      </td>
                      
                      <td className="px-8 py-5 text-sm">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-950 text-slate-300 border border-slate-800">
                          {todo.job}
                        </span>
                      </td>
                      
                      <td className="px-8 py-5 text-sm text-right whitespace-nowrap">
                        <div className="flex justify-end gap-2.5 opacity-100 md:opacity-0 group-hover/row:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => handleStartEdit(todo)}
                            className="px-3.5 py-1.5 bg-slate-800/50 hover:bg-amber-500/10 hover:text-amber-400 text-slate-300 border border-slate-800 rounded-xl cursor-pointer text-xs font-bold transition-all duration-300 active:scale-95 disabled:opacity-40"
                            disabled={editingId === todo.id}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => dispatch(deleteTodo(todo.id))}
                            className="px-3.5 py-1.5 bg-slate-800/50 hover:bg-red-500/10 hover:text-red-400 text-slate-300 border border-slate-800 rounded-xl cursor-pointer text-xs font-bold transition-all duration-300 active:scale-95"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-16 text-center text-slate-500 text-sm">
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-3xl filter saturate-50 brightness-75">📂</span>
                        <p className="font-semibold text-slate-400">Zero active indices match query filter.</p>
                        <p className="text-xs text-slate-600">Consider adjusting parameters or creating a new profile block.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        
      </div>
    </div>
  );
}