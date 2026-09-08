import { useState } from "react";
import * as service from "../services/categories.service";
import type { CreateCategoryRequest } from "../types/categories.type";

function CategoryForm() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<CreateCategoryRequest>({
    name: "",
  });

  async function onFormSubmit() {
    try {
      await service.createCategory(formValue);
      setShowForm(false);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="ml-auto flex items-center gap-3 px-3 h-9 text-zinc-50 bg-indigo-500 hover:bg-indigo-600 rounded-full shadow-md"
      >
        <span className="icon-[mdi--add]" />
        <span>Add Category</span>
      </button>

      {showForm && (
        <div className="fixed inset-0 grid place-content-center bg-zinc-950/30">
          <div className="flex flex-col gap-4 p-4 bg-zinc-50 rounded-lg">
            <input
              onChange={(e) => setFormValue({ name: e.target.value })}
              type="text"
              placeholder="Enter category name"
              className="px-3 h-10 border border-zinc-400 rounded"
            />
            <hr className="border-zinc-300" />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center gap-3 px-3 h-9 text-zinc-600 bg-zinc-100 hover:bg-zinc-200 rounded-full shadow-md"
              >
                <span>Cancel</span>
              </button>
              <button
                onClick={() => onFormSubmit()}
                className="flex items-center gap-3 px-3 h-9 text-zinc-50 bg-indigo-500 hover:bg-indigo-600 rounded-full shadow-md"
              >
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryForm;
