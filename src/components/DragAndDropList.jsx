import React from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import TodoItem from "./TodoItem"
import TodoList from "./TodoList"

const DragAndDropList = ({ list, onDelete, onCompleted, onSaveChange }) => {
  return (
    <TodoList>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((item, index) => {
              const idString =
                typeof item.id === "string" ? item.id : item.id.toString()
              return (
                <Draggable key={item.id} draggableId={idString} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem
                        key={item.id}
                        item={item}
                        onDelete={onDelete}
                        onCompleted={onCompleted}
                        onSaveChange={onSaveChange}
                      />
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </TodoList>
  )
}

export default DragAndDropList
