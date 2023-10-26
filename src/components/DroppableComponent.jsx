import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, DroppableProps } from "react-beautiful-dnd";

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
};

// fake data generator
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});




const INITIAL_STATE = getItems(10);
const DroppableComponent = (reload, e)=>{
    const [markups, setMarkups] = useState(INITIAL_STATE);
    console.log(markups);
    var state = {
        isDragging: false,
        x: 50,
        y: 50,
    };

    const onDragEnd = (result)=> {
        console.log("Called");
        console.log(result);
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            markups,
            result.source.index,
            result.destination.index
        );

        setMarkups(items);
    }


    return (
      <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                {markups.map((item, index) => {
                  // console.log(item.id)
                  return(
                  <Draggable key={item.id} draggableId={item.id} index={index} onClick={()=>{console.log(markups);}}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                  );
                        })}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      );
}

export default DroppableComponent;