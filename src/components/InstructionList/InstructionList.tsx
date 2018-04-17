import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import * as React from 'react';
import * as classNames from 'classnames';
import './InstructionList.css';

export interface Props {
  droppabledId: string;
  decorateForDragInProgress: boolean;
  title: string;
  className?: string;
  children: any;
}

export default (props: Props) => (
  <Droppable droppableId={props.droppabledId}>
    {(provided: DroppableProvided, snapshot) => (
      <div
        className={
          classNames(
            'col-sm-12',
            props.className,
            'instruction-list'
          )}
      >
        <h2
          className={
            classNames(
            'row',
            'instruction-list__title',
            `${props.className}__title`,
          )}
        >
          {props.title}
        </h2>
        <div className="row">
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={
              classNames(
                'instruction-list__list',
                `${props.className}__list`,
                {
                  [`${props.className}__list--drag-in-progress`]: props.decorateForDragInProgress,
                  [`${props.className}__list--dragging-over`]: snapshot.isDraggingOver
                }
              )
            }
          >
            {props.children}
            {provided.placeholder}
          </div>
        </div>
      </div>
    )}
  </Droppable>
);
