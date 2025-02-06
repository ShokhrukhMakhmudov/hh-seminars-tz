import { FormEvent, useContext, useState } from "react";
import { SeminarType } from "../../types";
import { Context } from "../../context";

export default function Item({ data }: { data: SeminarType }) {
  const { id, title, description, date, time, photo } = data;
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    title,
    description,
    date: date.split(".").reverse().join("-"),
    time,
    photo,
  });
  const { setLoading, setRefetchState } = useContext(Context);

  //   Delete Item Function
  const handleDelete = async () => {
    setLoading(true);
    try {
      const req = await fetch(`http://localhost:3000/seminars/${id}`, {
        method: "DELETE",
      });

      if (!req.ok) {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      alert("Something went wrong!");
    }

    setLoading(false);
    setDeleteModalOpen(false);
    setRefetchState();
  };

  //   Edit Item Function
  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const req = await fetch(`http://localhost:3000/seminars/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...editData,
          date: editData.date.split("-").reverse().join("."),
        }),
      });

      if (!req.ok) {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      alert("Something went wrong!");
    }

    setLoading(false);
    setEditModalOpen(false);
    setRefetchState();
  };
  return (
    <>
      <div className="card bg-base-100 shadow-sm shadow-white">
        <figure>
          <img src={photo} alt="seminar photo" />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-white">{title}</h2>
          <p>{description}</p>
          <div className="flex justify-between font-semibold">
            <div className="flex gap-2 items-center text-white">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="20px"
                width="20px"
                xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5a2 2 0 0 1-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"></path>
              </svg>
              {date}
            </div>
            <div className="flex gap-2 items-center text-white">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="20px"
                width="20px"
                xmlns="http://www.w3.org/2000/svg">
                <g fillOpacity=".9">
                  <path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path>
                  <path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path>
                </g>
              </svg>
              {time}
            </div>
          </div>
          <div className="card-actions justify-end mt-2">
            <button
              className="btn btn-info btn-sm"
              onClick={() => setEditModalOpen(true)}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 20 20"
                aria-hidden="true"
                height="20px"
                width="20px"
                xmlns="http://www.w3.org/2000/svg">
                <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z"></path>
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z"></path>
              </svg>
              Edit
            </button>
            <button
              className="btn btn-error btn-sm"
              onClick={() => setDeleteModalOpen(true)}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="15px"
                width="15px"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <dialog className="modal backdrop-blur-md" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p>Are you sure you want to delete this seminar?</p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDelete}>
                Yes, Delete
              </button>
              <button className="btn" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <dialog className="modal backdrop-blur-md" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Seminar</h3>
            <form onSubmit={handleEdit}>
              <input
                className="input input-bordered w-full my-2"
                type="text"
                placeholder="Title"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                required
              />
              <textarea
                className="textarea textarea-bordered w-full my-2"
                placeholder="Description"
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                required
              />
              <input
                className="input input-bordered w-full my-2"
                type="date"
                value={editData.date}
                onChange={(e) =>
                  setEditData({ ...editData, date: e.target.value })
                }
                required
              />
              <input
                className="input input-bordered w-full my-2"
                type="time"
                value={editData.time}
                onChange={(e) =>
                  setEditData({ ...editData, time: e.target.value })
                }
                required
              />
              <input
                className="input input-bordered w-full my-2"
                type="url"
                value={editData.photo}
                onChange={(e) =>
                  setEditData({ ...editData, photo: e.target.value })
                }
                required
              />
              <div className="modal-action">
                <button className="btn btn-success" type="submit">
                  Save Changes
                </button>
                <button className="btn" onClick={() => setEditModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
}
