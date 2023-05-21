import { motion } from "framer-motion";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { BiCheck } from "react-icons/bi";

import { useDeleteTodoMutation, useUpdateTodoMutation } from "../store/";
import styles from "../styles/modules/todoItem.module.css";
import TodoModal from "./TodoModal";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }) {
  const [deleteTodo] = useDeleteTodoMutation();

  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleDelete = () => {
    deleteTodo(todo._id);
    toast.success("Todo Deleted Successfully");
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  let Icon;
  if (todo.status == "completed") {
    Icon = <BiCheck color="green" />;
  }
  if (todo.status == "canceled") {
    Icon = <RxCross2 color="red" />;
  }

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <div className={styles.icon}>
            <span>[{Icon}]</span>
          </div>
          <div className={styles.texts}>
            <p className={styles.todoText}>
              {todo.title + ` (` + todo.priority + `)`}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
    </>
  );
}

export default TodoItem;
