import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import * as React from 'react';
import * as classNames from 'classnames';
import './InstructionList.css';
import LayoutRow from '../layout/LayoutRow/LayoutRow';
import LayoutCol from '../layout/LayoutCol/LayoutCol';

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
      <LayoutRow>
        <LayoutCol
          className={
            classNames(
              'col-sm-12',
              props.className,
              'instruction-list'
            )}
        >
          <LayoutRow>
            <LayoutCol
              className={
                classNames(
                  'instruction-list__title',
                  `${props.className}__title`,
                )}
            >
              {props.title}
            </LayoutCol>
          </LayoutRow>
          <LayoutRow>
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
          </LayoutRow>
        </LayoutCol>
      </LayoutRow>
    )}
  </Droppable>
);
