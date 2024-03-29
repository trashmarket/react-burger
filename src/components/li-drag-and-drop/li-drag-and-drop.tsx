import { useRef, FC } from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { dragDropLiAction, getDecrementCartAction } from '../../services/actions/cart'

import styles from './li-drag-and-drop.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import {TItems} from '../../services/types/data';

type TLiDragAndDrop = Omit<TItems,
  'type'
  | 'proteins'
  | 'fat'
  | 'carbohydrates'
  | 'calories'
  | 'image_mobile'
  | 'image_large'
  | '__v'> & {
    index: number
  }



const LiDragAndDrop: FC<TLiDragAndDrop> = ({name, price, image, index, _id}) => {
  const ref = useRef<HTMLLIElement>(null)
  const dispatch = useDispatch();

  const [ handlerId , drop] = useDrop<TLiDragAndDrop>({
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
      const hoverClientY = clientOffset && clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if ((dragIndex < hoverIndex) && (hoverClientY && hoverClientY < hoverMiddleY)) {
        return
      }
      // Dragging upwards
      if ((dragIndex > hoverIndex) && (hoverClientY && hoverClientY > hoverMiddleY)) {
        return
      }
      // Time to actually perform the action
      
      dispatch(dragDropLiAction(dragIndex, hoverIndex))
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
          dispatch(getDecrementCartAction(index, price, _id))
        }
      />
    </li>
  );
};

export default LiDragAndDrop

