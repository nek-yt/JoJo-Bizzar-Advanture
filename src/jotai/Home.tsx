import React, { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { dataAtom, deleteUI, editUI, addUI, toggleUI} from "./slice/todoSlice";

interface ModalProps {
  title: string;
  formData: { name: string; email: string; job: string };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; email: string; job: string }>>;
  confirmLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}

function ActionModal({ title, formData, setFormData, confirmLabel, onClose, onConfirm }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-6 shadow-xl animate-in zoom-in-95 duration-150">
        <h3 className="text-sm font-semibold text-slate-900 mb-5">
          {title}
        </h3>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Name</label>
            <input
              type="text"
              autoFocus
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Rivera"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. alex@company.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Job Title</label>
            <input
              type="text"
              value={formData.job}
              onChange={(e) => setFormData({ ...formData, job: e.target.value })}
              placeholder="e.g. Frontend Developer"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3.5 py-2 text-xs font-medium bg-slate-900 text-white rounded-xl hover:bg-slate-800 active:scale-95 transition-all shadow-sm"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const data = useAtomValue(dataAtom);
  const deleteFunc = useSetAtom(deleteUI);
  const editFunc = useSetAtom(editUI);
  const addFunc = useSetAtom(addUI);
  const toggleFunc = useSetAtom(toggleUI);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", email: "", job: "" });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", job: "" });

  const total = data.length;
  const completed = data.filter((t) => t.completed).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  const filteredData = data.filter((item) => {
    const term = search.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.job.toLowerCase().includes(term);

    if (filter === "active") return matchesSearch && !item.completed;
    if (filter === "completed") return matchesSearch && item.completed;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-6 antialiased selection:bg-slate-200">
      <div className="w-full max-w-2xl bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">Workspace Directory</h1>
            <p className="text-xs text-slate-400 mt-0.5">Manage system profiles and team routing assignments</p>
          </div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="self-start sm:self-auto px-4 py-2 text-xs font-medium bg-slate-900 text-white rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-sm"
          >
            Add Profile
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 border border-slate-100 rounded-xl">
          <div>
            <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400">Total Directory</span>
            <span className="text-xl font-bold text-slate-800 mt-0.5 block">{total}</span>
          </div>
          <div>
            <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400">Completed assignments</span>
            <span className="text-xl font-bold text-slate-800 mt-0.5 block">{completed}</span>
          </div>
          <div>
            <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400">Execution Rate</span>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-slate-800 transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-xs font-bold text-slate-700">{progress}%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
          <input
            type="text"
            placeholder="Filter by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
          />
          <div className="flex p-0.5 bg-slate-100 border border-slate-200/60 rounded-xl">
            {(["all", "active", "completed"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all ${
                  filter === type
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200/40"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-xl hover:border-slate-200 hover:bg-slate-50/40 transition-all duration-150"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <button
                  onClick={() => toggleFunc(item.id)}
                  className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0 ${
                    item.completed
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "border-slate-300 hover:border-slate-400 bg-white"
                  }`}
                >
                  {item.completed && (
                    <svg className="w-2.5 h-2.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="4">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <div className="min-w-0">
                  <p className={`text-sm font-medium tracking-tight transition-all ${item.completed ? "line-through text-slate-400" : "text-slate-800"}`}>
                    {item.name}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 text-xs text-slate-400">
                    <span className="font-medium text-slate-500">{item.job}</span>
                    <span className="text-slate-300">•</span>
                    <span className="truncate">{item.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-4">
                <button
                  onClick={() => {
                    setEditId(item.id);
                    setEditForm({ name: item.name, email: item.email, job: item.job });
                    setIsEditOpen(true);
                  }}
                  className="px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteFunc(item.id)}
                  className="px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
              <p className="text-xs text-slate-400 font-medium">No results found matching criteria</p>
            </div>
          )}
        </div>
      </div>

      {isAddOpen && (
        <ActionModal
          title="Create New Profile"
          formData={addForm}
          setFormData={setAddForm}
          confirmLabel="Create entry"
          onClose={() => {
            setIsAddOpen(false);
            setAddForm({ name: "", email: "", job: "" });
          }}
          onConfirm={() => {
            if (!addForm.name.trim()) return;
            addFunc({ name: addForm.name.trim(), email: addForm.email.trim() || "N/A", job: addForm.job.trim() || "N/A" });
            setAddForm({ name: "", email: "", job: "" });
            setIsAddOpen(false);
          }}
        />
      )}

      {isEditOpen && editId !== null && (
        <ActionModal
          title="Update Profile Information"
          formData={editForm}
          setFormData={setEditForm}
          confirmLabel="Save modifications"
          onClose={() => {
            setIsEditOpen(false);
            setEditId(null);
          }}
          onConfirm={() => {
            if (!editForm.name.trim()) return;
            editFunc({ id: editId, name: editForm.name.trim(), email: editForm.email.trim(), job: editForm.job.trim() });
            setIsEditOpen(false);
            setEditId(null);
          }}
        />
      )}
    </div>
  );
}