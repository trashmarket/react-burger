import { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  GET_DECREMENT_CATR,
  GET_DRAG_DROP_LI
} from "../../services/actions/cart";

import styles from './li-drag-and-drop.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useDrop, useDrag } from "react-dnd";

const LiDragAndDrop = ({name, price, image, index, _id}) => {
  const ref = useRef(null)
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop({
    accept: 'li-card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      
      dispatch({
        type: GET_DRAG_DROP_LI,
        dragIndex: dragIndex + 1,  
        hoverIndex: hoverIndex + 1 
      })
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  
  const [{ isDragging }, drag] = useDrag({
    type: 'li-card',
    item: () => {
      return { _id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <li className={styles.li} ref={ref}  data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() =>
          dispatch({
            type: GET_DECREMENT_CATR,
            index: index,
            cost: price,
            id: _id,
          })
        }
      />
    </li>
  );
};

export default LiDragAndDrop

LiDragAndDrop.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired
} 
